import React from 'react';
import Markdown from 'react-markdown';
import blogContent from '../../data/blogContents';
import MainBanner from '../../common/MainBanner';
import { Container } from 'react-bootstrap';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import Styles from './BlogDetails.module.scss';
import { useParams } from 'react-router';
import blogs from '../../data/blogs';

const BlogDetailsStatic = () => {
    const { slug } = useParams();

    const markdown = blogContent[slug];
    const blogData = blogs.find((blog) => blog.slug === slug);

    if (!blogData) return <></>;

    return (
        <div className={Styles.main}>
            <MainBanner
                mainTitle="Covrzy Blog"
                titleStyle={{ textAlign: 'center' }}
                col={12}
            />
            <Container fluid="sm">
                <Markdown
                    className={Styles.markdownTitle}
                    rehypePlugins={[rehypeRaw]}
                >
                    {blogData.titleMD}
                </Markdown>
                <img
                    className={Styles.blogImage}
                    src={blogData.bannerImage}
                    alt="blogImage"
                />
                <Markdown
                    className={Styles.markdown}
                    rehypePlugins={[rehypeRaw, remarkGfm]}
                >
                    {markdown}
                </Markdown>
            </Container>
        </div>
    );
};

export default BlogDetailsStatic;
