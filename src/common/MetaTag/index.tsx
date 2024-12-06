import { Helmet } from 'react-helmet-async';

const MetaTags = (props: any) => {
    const { description, title, url,canonical,keywords} = props;
    return (
        <>
            <Helmet prioritizeSeoTags>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="og_title" property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta name="og_url" property="og:url" content={url} />
                <meta
                    name="og_image"
                    property="og:image"
                    content="https://api.covrzy.com/public/images/homepage.png"
                            
                />
                <meta
                    name="og_image_alt"
                    property="og:image:alt"
                    content="covrzy"
                />
                <meta
                    name="og_image_type"
                    property="og:image:type"
                    content="image/png"
                />

                {/* Canonical URL tag  */}
                {canonical && <link rel="canonical" href={canonical} />}

            </Helmet>
        </>
    );
};

export default MetaTags;
