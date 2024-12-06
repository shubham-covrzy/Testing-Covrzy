import { Row, Col } from "react-bootstrap";
import Styles from "./BlogCard.module.scss";
import BlogImage from "./BlogImage";
import { useNavigate } from "react-router-dom";

interface BlogCardProps {
  title: string;
  summary: string;
  image: string;
  category: string;
  date: Date;
  slug: string;
  alttag: string;
}

const BlogCard = ({
  title,
  category,
  date,
  image,
  summary,
  slug,
  alttag
}: BlogCardProps) => {
  const navigate = useNavigate();

  return (
    <div className={Styles.main} onClick={() => navigate(`/blog/${slug}`)}>
      <Row>
        <Col>
          {/* <BlogImage image={image} alttag={alttag} /> */}
          <img src={image} alt={alttag} style={{ width: "100%" }} />
        </Col >
      </Row >
      <Row>
        <Col className={Styles.textContainer}>
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
          <div className={Styles.summary}>{summary}</div>
        </Col>
      </Row>
    </div >
  );
};

export default BlogCard;
