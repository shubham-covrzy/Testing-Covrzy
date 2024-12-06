import { Row, Col } from "react-bootstrap";
import Styles from "./BlogBannerCard.module.scss";
import BlogImage from "./BlogImage";
import { useNavigate } from "react-router-dom";

interface BlogBannerCardProps {
  title: string;
  summary: string;
  image: string;
  category: string;
  date: Date;
  slug: string;
  alttag: string;
  author: string;
}

const BlogBannerCard = ({
  title,
  category,
  date,
  image,
  summary,
  slug,
  alttag,
  author
}: BlogBannerCardProps) => {
  const navigate = useNavigate();

  return (
    <div className={Styles.main} onClick={() => navigate(`/blog/${slug}`)}>
      <Row >
        <Col lg={6} md={6} sm={12}>
          {/* <BlogImage isBannerImage image={image} alttag={alttag} /> */}
          <img src={image} alt={alttag} style={{ width: "100%" }} />
        </Col >
        <Col lg={6} md={6} sm={12} className={Styles.textContainer}>
          <div className={Styles.info}>
            <div className={Styles.categoryChip}>{category}</div>
            <div className={Styles.dash} />
            <div>
              {date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
          <div className={Styles.title}>{title}</div>
          <div className={Styles.author}>By: {author}</div>
          <div className={Styles.subtitle}>{summary}</div>
        </Col>
      </Row >
    </div >
  );
};

export default BlogBannerCard;
