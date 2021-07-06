import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import { Recipe } from "../types";
import { sanityClient, urlFor } from "../lib/sanity";
import Link from "next/link";

const recipeQuery = `
  *[_type == 'recipe']{
    _id,
    name,
    slug,
    mainImage
  }
`;

export default function Home({
  recipes,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <Head>
        <title>John&apos;s kitchen</title>
        <meta name="description" content="Some recipe" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Welcome to John&apos;s kitchen</h1>

      <ul className="recipes-list">
        {recipes.length > 0 &&
          recipes.map((recipe) => (
            <li key={recipe._id} className="recipe-card">
              <Link href={`/`}>
                <a>
                  <div
                    style={{
                      position: "relative",
                      height: "60vh",
                      minHeight: "500px",
                    }}
                  >
                    <Image
                      src={
                        urlFor(recipe.mainImage.asset._ref).url() ||
                        "placeholder image"
                      }
                      alt={recipe.name}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="left"
                    />
                  </div>

                  <span>{recipe.name}</span>
                </a>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps<{ recipes: Recipe[] }> =
  async () => {
    // Fetch data from Sanity studio
    const recipes: Recipe[] = await sanityClient.fetch(recipeQuery);

    return {
      props: {
        recipes,
      },
    };
  };
