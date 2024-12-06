import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// import { ReactComponent as NonCovrzyFile } from '../../assets/images/PoliciesIconBlue.svg';
import CustomLoader from '../../common/Loader/CustomLoader';
import { HOME } from '../../constants/main';
//import { setPageHeaderTitle } from '../../Redux/Actions/HeaderTitleAction';
import {
    GetPackageDetailsAction,
    GetPolicyByIdAction,
} from '../../Redux/Actions/HomepageActions';
import { IReduxState } from '../../utils/types';
import CutWeight from '../../assets/images/CutWeight.svg';
import OutputIcon from '../../assets/images/output.svg';
import Cards from '../StartUp/Cards';

const ProductDetailView = () => {
    const [productData, setProductData] = useState<Object | any>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { planType, id }: any = useParams();
    const { view_single_policy, package_details, loading } = useSelector(
        (state: IReduxState) => state.Homepage,
    );

    useEffect(() => {
        //dispatch(setPageHeaderTitle(HOME))

        if (planType === 'package') dispatch(GetPackageDetailsAction(id));
        else if (planType === 'policy') dispatch(GetPolicyByIdAction(id));
    }, [dispatch, planType, id]);

    useEffect(() => {
        let tempData: Object | any = {};
        if (planType === 'package') tempData = { ...package_details };
        else if (planType === 'policy') tempData = { ...view_single_policy };
        setProductData({ ...tempData });
    }, [view_single_policy, package_details]);

    const BETA_LINK = process.env.REACT_APP_BETA_URL

    const handleNavigate = (route: string) => {
        if (BETA_LINK && window.location.origin === BETA_LINK) {
            window.location.href = BETA_LINK + route
        } else {
            navigate(route)
        }
    }

    return (
        <>
            {loading ? (
                <div className="mt-5">
                    <CustomLoader />
                </div>
            ) : (
                <div className="claim-insurance">
                    <div className="claim-top">
                        <span>
                            <img
                                src={
                                    process.env.REACT_APP_IMAGE_BASE_URL +
                                    productData?.icon
                                }
                                alt="product icon"
                                width="90%"
                            />
                        </span>
                        {/* <span><NonCovrzyFile style={{ fill: '#7743DC' }} /></span> */}
                        <h2>
                            {productData?.policy_name
                                ? productData?.policy_name
                                : productData?.package_name}
                        </h2>
                    </div>
                    <div className="db-line"></div>
                    <div className="use-insurance">
                        {planType === 'policy' && (
                            <div className="business-content">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div
                                            className="business-info  disc-list-order"
                                            id="what-is-it"
                                        >
                                            {/* <h2 className="title-wrp text-align-left">What Is <span>BOP</span> Insurance?</h2> */}
                                            <h2 className="title-wrp text-align-left">
                                                What Is{' '}
                                                <span>
                                                    {
                                                        view_single_policy?.policy_name
                                                    }
                                                    ?
                                                </span>
                                            </h2>
                                            {/* <p>A Business Owners Policy (BOP) is a package of insurance policies that the majority of business owners need to have—which is why insurance carriers bundle these coverages and sell them as one product.</p> */}
                                            {/* <div className='info-img text-center'><img src={whatlsbop} className="img-fluid" alt='' /></div> */}
                                            <p>
                                                {
                                                    view_single_policy?.description
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div
                                            className="business-info disc-list-order"
                                            id="who-is-it-for"
                                        >
                                            <h2 className="title-wrp text-align-left">
                                                Who Is <span>It For?</span>
                                            </h2>
                                            {/* <div className='info-img text-center'><img src={BopInsurance} className="img-fluid" alt='' /></div> */}
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: view_single_policy?.policy_is_for,
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div
                                            className="business-info disc-list-order"
                                            id="why-do-you-need-it"
                                        >
                                            {/* <h2 className="title-wrp text-align-left">Why Do You Need a <span>Business Owners Policy?</span></h2> */}
                                            <h2 className="title-wrp text-align-left">
                                                Why Do{' '}
                                                <span>You Need a It?</span>
                                            </h2>
                                            {/* <div className='info-img text-center'><img src={Owners} className="img-fluid" alt='' /></div> */}
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: view_single_policy?.policy_need_for,
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div
                                            className="business-info  disc-list-order"
                                            id="what-doesnt-it-cover"
                                        >
                                            <h2 className="title-wrp text-align-left">
                                                What’s Not <span>Covered?</span>
                                            </h2>
                                            {/* <div className='info-img text-center'><img src={Covered} className="img-fluid" alt='' /></div> */}
                                            <ul>
                                                {view_single_policy?.policy_cons &&
                                                    Object.keys(
                                                        JSON.parse(
                                                            view_single_policy?.policy_cons,
                                                        )?.[0],
                                                    ).map((key: any) => (
                                                        <li>
                                                            {
                                                                JSON.parse(
                                                                    view_single_policy?.policy_cons,
                                                                )?.[0]?.[key]
                                                            }
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div
                                            className="business-info  disc-list-order"
                                            id="what-does-it-cover"
                                        >
                                            <h2 className="title-wrp text-align-left">
                                                What’s <span>Covered?</span>
                                            </h2>
                                            {/* <div className='info-img text-center'><img src={DueDiligence} className="img-fluid" alt='' /></div> */}
                                            <ul>
                                                {view_single_policy?.policy_prons &&
                                                    Object.keys(
                                                        JSON.parse(
                                                            view_single_policy?.policy_prons,
                                                        )?.[0],
                                                    ).map((key: any) => (
                                                        <li>
                                                            {
                                                                JSON.parse(
                                                                    view_single_policy?.policy_prons,
                                                                )?.[0]?.[key]
                                                            }
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div
                                            className="business-info  disc-list-order"
                                            id="what-does-it-cost"
                                        >
                                            <h2 className="title-wrp text-align-left">
                                                What Does a{' '}
                                                <span>It Cost?</span>
                                            </h2>
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: view_single_policy?.policy_cost_desc,
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {planType === 'package' && (
                            <div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div
                                            className="business-info disc-list-order"
                                            id="what-is-it"
                                        >
                                            {/* <h2 className="title-wrp text-align-left">What Is <span>BOP</span> Insurance?</h2> */}
                                            <h2 className="title-wrp text-align-left">
                                                What Is{' '}
                                                <span>
                                                    {
                                                        package_details?.package_name
                                                    }
                                                    ?
                                                </span>
                                            </h2>
                                            {/* <p>A Business Owners Policy (BOP) is a package of insurance policies that the majority of business owners need to have—which is why insurance carriers bundle these coverages and sell them as one product.</p> */}
                                            {/* <div className='info-img text-center'><img src={whatlsbop} className="img-fluid" alt='' /></div> */}
                                            <p>
                                                {package_details?.package_type}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <section className="startup-card-section">
                                    <Container>
                                        <Row>
                                            {package_details?.packages_policy &&
                                                package_details?.packages_policy.map(
                                                    (
                                                        item: object | any,
                                                        i: number,
                                                    ) => (
                                                        <Cards
                                                            // image={(i % 2) ? CutWeight : OutputIcon}
                                                            image={
                                                                process.env
                                                                    .REACT_APP_IMAGE_BASE_URL +
                                                                item?.policy_id
                                                                    ?.icon
                                                            }
                                                            title={
                                                                item?.policy_id
                                                                    ?.policy_name
                                                            }
                                                            description={
                                                                item?.policy_id
                                                                    ?.policy_defination
                                                            }
                                                            // description={item?.policy_id?.description}
                                                            onClick={() =>
                                                                handleNavigate(
                                                                    `/user/dashboard/product-details/policy/${item?.policy_id?.id}`,
                                                                )
                                                            }
                                                        />
                                                    ),
                                                )}
                                            {/* <Cards image={OutputIcon} title="Lawyers Professional Liability" description="Provides customized protection for lawyers against the many types of malpractice claims that can arise while providing professional services to clients and partners."></Cards> */}
                                        </Row>
                                    </Container>
                                </section>

                                <div className="container">
                                    <div className="business-content">
                                        <div
                                            className="business-info disc-list-order"
                                            id="what-is-it"
                                        >
                                            <h2 className="title-wrp text-align-left">
                                                What does{' '}
                                                <span>
                                                    {
                                                        package_details?.package_name
                                                    }{' '}
                                                    include?
                                                </span>{' '}
                                            </h2>
                                            {/* <div className='info-img text-center'><img src={whatlsbop} className="img-fluid" alt='' /></div> */}
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: package_details?.package_included,
                                                }}
                                            ></div>
                                        </div>
                                        <div
                                            className="business-info disc-list-order"
                                            id="who-is-it-for"
                                        >
                                            <h2 className="title-wrp text-align-left">
                                                Type of companies{' '}
                                                <span>
                                                    {
                                                        package_details?.package_name
                                                    }{' '}
                                                    package intended for?
                                                </span>{' '}
                                            </h2>
                                            {/* <div className='info-img text-center'><img src={BopInsurance} className="img-fluid" alt='' /></div> */}
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: package_details?.package_is_for,
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductDetailView;
