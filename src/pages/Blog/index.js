import { Col, Container, Row } from "react-bootstrap"
import CustomCards from "../../common/CustomCards"
import ArrowBtn from '../../assets/images/ArrowBtn.png';
import { blogData } from "./Data";
import { useNavigate } from "react-router-dom";
import article from '../../assets/images/article.png';

export const Blog =()=>{
    const navigate=useNavigate();
    return (
        <section className="article-section blog-wrp">
                <Container>
                    <h2 className="title-wrp">Your <span>Blog</span></h2>
                    <Row>
                        {
                            blogData?.map((item)=>{
                                return (
                                    <CustomCards image={article} content={item?.title} buttonImage={ArrowBtn} click={()=> navigate(`/blog/${item?.id}`)} />
                                )
                            })
                        }
                    </Row>
                </Container>
            </section>
    )
}