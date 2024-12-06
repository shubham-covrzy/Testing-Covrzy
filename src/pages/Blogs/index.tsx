import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
// import Slider from "react-slick"; // Ensure Slider settings are imported if needed
import MainBanner from "../../common/MainBanner";
import BlogBannerCard from "./BlogBannerCard";
import BlogCard from "./BlogCard";
import Styles from "./index.module.scss";
// import { display } from "html2canvas/dist/types/css/property-descriptors/display";
import MetaTags from "../../common/MetaTag";
import { SkeletonBlogBannerCard, SkeletonBlogCard } from "./Shimmer";
// import CustomLoader from "../../common/Loader/CustomLoader";

interface ImageData {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  url: string;
}

interface ContentChild {
  text: string;
  type: string;
}

interface ContentSection {
  type: string;
  level?: number;
  children: ContentChild[];
}

interface FAQSection {
  type: string;
  level?: number;
  children: ContentChild[];
}

interface BlogData {
  id: number;
  title: string;
  slug: string;
  metatitle: string;
  metadescription: string;
  summary: string;
  content: ContentSection[];
  faqs: FAQSection[];
  date: string;
  imgThumbnail: ImageData;
  imgFeatured: ImageData;
  category: string;
  author: string;
}

interface APIResponse {
  data: BlogData[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const Blogs = () => {
  const [fetchedBlogs, setFetchedBlogs] = useState<BlogData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const apiToken = process.env.REACT_APP_BLOG_TOKEN_KEY;


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // console.log(`${process.env.REACT_APP_BLOG_BASE_URL}/api/blogpages?populate=*`)
      try {
        const response = await fetch(`${process.env.REACT_APP_BLOG_BASE_URL}/api/blogpages?populate=*&sort[0]=date:desc`, {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data: APIResponse = await response.json();
        setFetchedBlogs(data.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  if (error) {
    return <div>Error: {error}</div>;
  }
  const blogBanner = fetchedBlogs[0];//for featured blog 
  var restData = fetchedBlogs.slice(1);//for rest of the blogs data

  return (
    <div className={Styles.main}>
      <MetaTags
        title="Covrzy | Business Insurance Simplified"
        description="We are on a mission to simplify business insurance in India and help companies in comparing quotes from top insurers and complete the purchase online."
        url={window.location.href}
        canonical={window.location.href}
      />
      <MainBanner
        mainTitle="Covrzy Blog"
        titleStyle={{ textAlign: "center" }}
        col={12}
      />
      {
        loading ? (<div>
          {/* <Container>
            <Row>
              <Col lg={12}>
                <CustomLoader />
              </Col>
            </Row>
          </Container> */}
          <Container fluid="sm">
            <div className={Styles.recentText}>Recents</div>

            <Row>
              <Col lg={6} md={6} sm={12}>
                <SkeletonBlogCard />
              </Col>
              <Col lg={6} md={6} sm={12}>
                <SkeletonBlogCard />
              </Col>
            </Row>

            <div className={Styles.divider} />
            <div className={Styles.title}>Past Blogs</div>
            <Row>
              {[1, 2, 3, 4, 5, 6].map((_, idx) => {
                return (
                  <Col key={idx} lg={4} md={6} sm={12}  >
                    <SkeletonBlogBannerCard />
                  </Col>
                )
              })}
            </Row>
          </Container>
        </div >) : (
          <Container fluid="sm">
            <div className={Styles.recentText}>Recents</div>
            {blogBanner && (
              <Row>
                <BlogBannerCard
                  key={blogBanner.slug}
                  title={blogBanner.title}
                  image={`${process.env.REACT_APP_BLOG_BASE_URL}${blogBanner.imgThumbnail.url}`}
                  alttag={`${blogBanner.imgThumbnail.alternativeText}`}
                  category={blogBanner.category}
                  date={new Date(blogBanner.date)}
                  slug={blogBanner.slug}
                  summary={blogBanner.summary}
                  author={blogBanner.author}

                />
              </Row>
            )}
            <div className={Styles.divider} />
            <div className={Styles.title}>Past Blogs</div>
            <Row>
              {restData.map((blog) => {
                return (
                  <Col key={blog.slug} lg={4} md={6} sm={12}  >
                    <BlogCard
                      title={blog.title}
                      image={`${process.env.REACT_APP_BLOG_BASE_URL}${blog.imgThumbnail.url}`}
                      category={blog.category}
                      date={new Date(blog.date)}
                      slug={blog.slug}
                      alttag={`${blog.imgThumbnail.alternativeText}`}
                      summary={`${blog.summary.substring(0, 100)}...`}
                    />

                  </Col>
                )
              })}
            </Row>
          </Container>)
      }

    </div >
  );
};

export default Blogs;
