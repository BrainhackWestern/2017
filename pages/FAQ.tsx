import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import type { InferGetStaticPropsType } from 'next';
import Head from 'next/head';

import Footer, { getFooterProps } from '../components/footer';
import { NavBar } from '../components/navbar';
import { RegisterButton } from '../components/register-button';
import { readConfig } from '../utils/data';

export const getStaticProps = async () => {
  const config = await readConfig();
  return {
    props: {
      config
    }
  };
};

const FaqPage = ({
  config
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="app">
      <Head>
        <title>FAQ - Brainhack Western {config.event.year}</title>
        <meta
          name="description"
          content="Frequently asked Questions for Brainhack Western"
        />
      </Head>
      <NavBar
        displaySections={config.displaySections}
        registrationButton={
          config.registration.status === 'open' ? (
            <RegisterButton settings={config.registration} />
          ) : null
        }
      />
      <article className="container-lg">
        <h1>FAQ</h1>
        {config.faq?.map((faq) => {
          return (
            <section key={faq.question}>
              <h3>{faq.question}</h3>
              <ReactMarkdown className="console" remarkPlugins={[remarkGfm]}>
                {faq.answer}
              </ReactMarkdown>
            </section>
          );
        })}
      </article>
      <Footer {...getFooterProps(config)} />
    </div>
  );
};

export default FaqPage;
