import Head from "next/head";

const Seo = ({ title, description, imageUrl }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="og:type" content="website" />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:image" content={imageUrl} />
      <meta name="og:image:alt" content={description} />
      <meta name="og:image:width" content="1200" />
      <meta name="og:site_name" content="japan travel" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Head>
  );
};

export default Seo;
