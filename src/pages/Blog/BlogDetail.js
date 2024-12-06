import Business from '../../assets/images/Business.png';
import article from '../../assets/images/article.png';
import MainBanner from '../../common/MainBanner';
import { Col, Container, Row } from 'react-bootstrap';
import { blogData } from './Data';
import { useParams } from 'react-router-dom';

export const BlogDetail = () => {
    const { id } = useParams();
    return (
        <>
            {blogData?.map((item) => {
                return item?.id === Number(id) &&
                    <div className='blog-detail'>
                        <MainBanner mainTitle={item?.title} image={Business} />
                        <div className='blog-detail-list'>
                            <Container>
                                <div className='blog-detail-list-item'>

                                    <Row>
                                        <Col md={4}>
                                            <img src={article} />
                                        </Col>
                                        <Col md={8}>
                                            <h3><span>Q{item?.id}. </span>{item?.title}</h3>
                                            <p>{item?.content}</p>
                                        </Col>
                                    </Row>

                                </div>
                            </Container>
                        </div>
                    </div>
            })}
        </>
    )
}