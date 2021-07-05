import "../styles/globals.css";
import Link from "next/link";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <nav className="header">
        <div>
          <Link href="/">
            <a>John&apos;s Kitchen 🍍</a>
          </Link>
        </div>
      </nav>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}
export default MyApp;
