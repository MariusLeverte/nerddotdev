import Head from "next/head";
import { useRouter } from "next/router";

type MetaProps = {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  keywords?: string;
  robots?: string;
  locale?: {
    current: string;
    alternate?: string[];
  };
  opengraph?: {
    title: string;
    description: string;
    type: string;
    url: string;
    image?: string;
  };
  noIndex?: boolean;
};

const Meta = ({
  title,
  description,
  image,
  canonical,
  keywords,
  robots,
  locale,
  opengraph,
  noIndex,
}: MetaProps) => {
  const router = useRouter();

  return (
    <Head>
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {title && <title>{title}</title>}
      {description && (
        <>
          <meta name="description" content={description} key="description" />
          <meta
            itemProp="description"
            content={description}
            key="itemDescription"
          />
        </>
      )}
      {(image || opengraph?.image) && (
        <meta
          itemProp="image"
          content={image || opengraph?.image}
          key="itemImage"
        />
      )}
      {canonical && (
        <>
          <meta name="canonical" content={canonical} key="canonical" />
          <link rel="canonical" href={canonical} />
        </>
      )}
      {keywords && <meta name="keywords" content={keywords} key="keywords" />}
      {robots && <meta name="robots" content={robots} key="robots" />}

      {opengraph && (
        <>
          <meta
            name="twitter:card"
            content="summary_large_image"
            key="twitter:card"
          />
          <meta
            name="twitter:creator"
            content="@firiapp"
            key="twitter:creator"
          />

          <meta property="og:title" content={opengraph.title} key="og:title" />
          <meta
            name="twitter:title"
            content={opengraph.title}
            key="twitter:title"
          />

          <meta
            property="og:description"
            content={opengraph.description}
            key="og:description"
          />
          <meta
            name="twitter:description"
            content={opengraph.description}
            key="twitter:description"
          />
          <meta property="og:image" content={opengraph.image} key="og:image" />
          <meta
            name="twitter:image"
            content={opengraph.image}
            key="twitter:image"
          />
        </>
      )}

      {opengraph?.type && (
        <meta property="og:type" content={opengraph.type} key="og:type" />
      )}
      {opengraph?.url && (
        <meta property="og:url" content={opengraph.url} key="og:url" />
      )}

      {locale?.current && (
        <meta property="og:locale" content={locale.current} key="og:locale" />
      )}
      {locale?.alternate &&
        locale.alternate.map((alternate) => (
          <meta
            key={alternate}
            property="og:locale:alternate"
            content={alternate}
          />
        ))}
    </Head>
  );
};

export default Meta;
