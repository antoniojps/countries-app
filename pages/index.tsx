import classNames from "classnames";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { CountryCard } from "../ui/CountryCard/CountryCard";
import { Country, getCountries } from "../utils/api/country";
import styles from "./index.module.scss";

const PAGE_ITEMS = 8;

const Home: NextPage = () => {
  const [page, setPage] = useState(0);

  const [countries, setCountries] = useState<Country[]>([]);
  const lastPage = Math.ceil(countries.length / PAGE_ITEMS);
  const currentCountries = useMemo(() => {
    const start = page * PAGE_ITEMS;
    const end = start + PAGE_ITEMS;

    const countriesSorted = countries.sort((countryA, countryB) => {
      if (countryA.name.common < countryB.name.common) return -1;
      if (countryA.name.common > countryB.name.common) return 1;
      return 0;
    });

    return countriesSorted.slice(
      start,
      countries.length <= end ? countries.length : end
    );
  }, [page, countries]);

  useEffect(() => {
    getCountries().then((response) => setCountries(response));
  }, []);

  return (
    <div className={classNames(styles.page)}>
      <Head>
        <title>Countries of the world</title>
      </Head>

      <header className={classNames(styles.header, "py-6")}>
        <div className="container">
          <h1 className="title is-1 has-text-light">Countries of the world</h1>
        </div>
      </header>

      <main className="container my-4">
        <div className={styles.countries}>
          {currentCountries.map((c) => (
            <CountryCard key={c.id} country={c} />
          ))}
        </div>
        <button onClick={() => setPage(page - 1)} disabled={page === 0}>
          Previous Page
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === lastPage - 1}
        >
          Next Page
        </button>
      </main>

      <footer className={classNames(styles.footer, "py-6")}>
        <div className="container">
          <small>
            Data sourced from{" "}
            <a
              href="https://restcountries.com/"
              target="_blank"
              rel="noreferrer"
            >
              Rest Countries
            </a>
          </small>
        </div>
      </footer>
    </div>
  );
};

export default Home;
