import Styles from "./BlogImage.module.scss";
import goArrowSVG from "../../assets/images/blogs/rightArrow.svg";
interface BlogImageProps {
  image: string;
  isBannerImage?: boolean;
  height?: string | number;
  width?: string | number;
  alttag?: string;
}

const BlogImage = ({
  isBannerImage = false,
  image,
  height,
  width,
  alttag
}: BlogImageProps) => {

  return (
    <div className={Styles.main}>
      <img
        className={isBannerImage ? Styles.bannerImage : Styles.blogImage}
        src={image}
        height={height}
        width={width}
        alt={alttag}
      ></img>
      {/* <img className={isBannerImage ? Styles.goArrowLarge : Styles.goArrow} src={goArrowSVG} alt="goArrow"></img> */}
    </div>
  );
};

export default BlogImage;
