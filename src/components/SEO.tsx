import { Helmet } from "react-helmet-async";

const SITE_URL = "https://tratohecho-properties.lovable.app";
const SITE_NAME = "Grupo Inmobiliario Orquídeas";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
}

const SEO = ({ title, description, path, image, type = "website" }: SEOProps) => {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      {image && <meta property="og:image" content={image} />}
    </Helmet>
  );
};

export default SEO;
