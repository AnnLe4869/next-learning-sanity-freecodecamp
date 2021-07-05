import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Recipe } from "../types";

export default function Home({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { recipes } = data;
  return (
    <div className={styles.container}>
      <Head>
        <title>Intro to NextJS</title>
        <meta name="description" content="Some recipe" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}

export const getStaticProps: GetStaticProps<{ data: { recipes: Recipe[] } }> =
  async () => {
    return {
      props: {
        data: {
          recipes: [{ title: "Pineapple Smoothies", id: "hello" }],
        },
      },
    };
  };
