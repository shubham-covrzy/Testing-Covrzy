import React, { useState, useEffect } from "react";
import MainBanner from "../../common/MainBanner";
import { Col, Container, Row } from "react-bootstrap";
import Styles from "./BlogDetails.module.scss";
import { useParams } from "react-router";
import "./BlogDetails.custom.scss";
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';
import MetaTags from "../../common/MetaTag";
import FAQAccordion from "./BlogFAQAccordion";
import CustomLoader from "../../common/Loader/CustomLoader";
import { couldStartTrivia } from "typescript";
// for adding table these imp
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
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
  metakeywords: string;
  summary: string;
  content: string;
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

const BlogDetails: React.FC = () => {
  const { slug } = useParams();
  const [fetchedBlogs, setFetchedBlogs] = useState<BlogData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const apiToken = process.env.REACT_APP_BLOG_TOKEN_KEY;
  // console.log(`${process.env.REACT_APP_BLOG_BASE_URL}/api/blogpages?populate=*&filters[slug][$eq]=${slug}`);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BLOG_BASE_URL}/api/blogpages?populate=*&filters[slug][$eq]=${slug}`,
          {
            headers: {
              Authorization: `Bearer ${apiToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data: APIResponse = await response.json();
        setFetchedBlogs(data.data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Something Went Wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);
  if (loading) {
    return (<div>
      <Container>
        <Row>
          <Col lg={12}>
            <CustomLoader />
          </Col>
        </Row>
      </Container>
    </div>)
  }


  if (error) {
    return <div>Error: {error}</div>;
  }

  const blogData = fetchedBlogs[0];
  console.log(blogData)
  console.log(typeof blogData.content)
  // const content: BlocksContent = blogData.content as BlocksContent;
  // const content = blogData.content;
  // Convert content sections to markdown string
  // const markdownContent = blogData.content
  //   .map(section => section.children.map(child => child.text).join("\n"))
  //   .join("\n");
  return (
    <div className={Styles.main}>
      <MetaTags
        title={blogData.metatitle}
        description={blogData.metadescription}
        url={window.location.href}
        canonical={window.location.href}
        keywords={blogData.metakeywords}
      />
      <MainBanner mainTitle={blogData.title} titleStyle={{ textAlign: "center" }} col={12} author={blogData.author} blogdate={blogData.date} />
      <Container fluid="sm" className="blogdetails">
        <img className={Styles.blogImage} src={`${process.env.REACT_APP_BLOG_BASE_URL}${blogData.imgFeatured.url}`} alt={`${blogData.imgFeatured.alternativeText}`} />
        {/* <BlocksRenderer content={content} /> */}
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]} // Enables raw HTML rendering for tables
        >
          {blogData.content}
        </ReactMarkdown>
        <FAQAccordion faqdata={blogData.faqs} />
      </Container>
    </div>
  );
};

export default BlogDetails;
