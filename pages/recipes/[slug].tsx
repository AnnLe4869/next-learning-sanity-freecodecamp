import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  sanityClient,
  urlFor,
  usePreviewSubscription,
  PortableText,
} from "../../lib/sanity";
import { Recipe, RecipeDetail } from "../../types";
import Image from "next/image";

// Fetch one specific recipe
const recipeQuery = `
    *[_type == "recipe" && slug.current == $slug][0]{
        _id,
        name,
        slug,
        mainImage,
        ingredient[]{
            unit,
            wholeNumber,
            fraction,
            ingredient -> {
                name
            }
        },
        instruction,
        likes
    }
`;

export default function SpecificRecipe({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [likes, setLikes] = useState(data?.recipe?.likes);

  const router = useRouter();

  const { recipe } = data;

  const addLikes = async () => {
    try {
      const res = await fetch("/api/handle-like", {
        method: "POST",
        body: JSON.stringify({ _id: recipe._id }),
      });

      const data = await res.json();

      setLikes(data.likes);
    } catch (err) {
      console.error(err);
    }
  };

  if (router.isFallback) {
    return <h1>The recipe you found does not exist</h1>;
  }

  return (
    <article className="recipe">
      <h1>{recipe.name}</h1>

      <button onClick={addLikes} className="like-button">
        {likes} Likes
      </button>

      <main className="content">
        {/* <Image /> */}
        <div
          style={{ height: "80vh", minHeight: "500px", position: "relative" }}
        >
          <Image
            src={
              urlFor(recipe.mainImage.asset._ref).url() || "placeholder image"
            }
            alt={recipe.name}
            layout="fill"
            objectFit="cover"
            objectPosition="left"
          />
        </div>

        <div className="breakdown">
          <ul className="ingredients">
            {recipe.ingredient?.map((ingredient) => (
              <li key={ingredient._key} className="ingredient">
                {ingredient.wholeNumber} {ingredient.fraction} {ingredient.unit}
                <br />
                {ingredient.ingredient.name}
              </li>
            ))}
          </ul>
          <PortableText blocks={recipe.instruction} className="instruction" />
        </div>
      </main>
    </article>
  );
}

export const getStaticProps: GetStaticProps<
  { data: { recipe: RecipeDetail } },
  { slug: string }
> = async (context) => {
  if (!context.params)
    throw new Error("Missing parameters. Something is wrong");

  const recipe: RecipeDetail = await sanityClient.fetch(recipeQuery, {
    slug: context.params.slug,
  });

  return {
    props: { data: { recipe } },
  };
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const paths: { params: { slug: string } }[] = await sanityClient.fetch(`
        *[_type == "recipe" && defined(slug.current)]{
            "params": {
                "slug": slug.current
            }
        }
    `);

  return { paths, fallback: true };
};
