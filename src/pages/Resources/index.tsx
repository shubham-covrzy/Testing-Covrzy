import React, { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import SubBanner from '../../common/SubBanner';
import coverge from '../../assets/images/coverage.png';
import note from '../../assets/images/note.svg';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-scroll';
import MainBanner from '../../common/MainBanner';
import CustomQuoteModal from '../../components/CustomQuoteModal';
import MetaTags from '../../common/MetaTag';

const q1Content = [
    {
        tag: 'types-of-business-insurance-to-purchase',
        detail: 'Which type of business insurance should I purchase?',
        sub_points: [
            {
                tag: 'types-insurance',
                detail: 'Types of Business insurance',
                sub_points: [
                    { tag: 'glp', detail: 'General Liability Policies' },
                    { tag: 'pflp', detail: 'Professional Liability Policies' },
                    { tag: 'eip', detail: 'Employee Insurance Policies' },
                    { tag: 'pplp', detail: 'Property Insurance Policies' },
                ],
            },
        ],
    },
];

const q2Content = [
    {
        tag: 'business-insurance-cost',
        detail: 'Which type of business insurance should I purchase?',
        sub_points: [
            {
                tag: 'cost-affecting',
                detail: 'Cost Affecting General Liability Insurance',
                sub_points: [
                    {
                        tag: 'Location-and-Size',
                        detail: 'Location and Size of your warehouse/office',
                    },
                    {
                        tag: 'annual-turnover',
                        detail: 'Employees cost and annual turnover',
                    },
                    { tag: 'past-claim', detail: 'Past Claims' },
                    { tag: 'Policy-Coverage', detail: 'Policy Coverage' },
                ],
            },
            {
                tag: 'factors-affecting-professional',
                detail: 'Factors Affecting Cost of Professional Liability Policies',
                sub_points: [
                    { tag: 'pal', detail: 'Practice area/location' },
                    { tag: 'Speciality', detail: 'Speciality' },
                    { tag: 'pc', detail: 'Past Claims' },
                    { tag: 'iad', detail: 'Inclusions and Deductibles' },
                ],
            },
            {
                tag: 'factors-affecting-employee',
                detail: 'Factors Affecting Cost of Employee Insurance Policies',
                sub_points: [
                    { tag: 'Employee-Strength', detail: 'Employee Strength' },
                    { tag: 'Plan-Type', detail: 'Plan Type' },
                    {
                        tag: 'inclusion-and-exclusion',
                        detail: 'Coverage inclusion and exclusion',
                    },
                ],
            },
        ],
    },
];

const q3Content = [
    {
        tag: 'broker-vs-covrzy',
        detail: "What's the difference between a broker and Covrzy?",
        sub_points: [
            { tag: 'Broker', detail: 'Who is a Broker' },
            { tag: 'different', detail: 'How are we different' },
            { tag: 'Multiple', detail: 'Multiple Options' },
            { tag: 'Support', detail: 'Support and Guidance' }, 
            { tag: 'Innovation', detail: 'Use of Innovation and technology' },
        ],
    },
];

const Resources = () => {
    const { questionNo }: any = useParams();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    // Function to handle modal close
    const handleClose = () => setShowModal(false);

    // Function to handle modal open
    const handleShow = () => setShowModal(true);

    return (
        <Fragment>
            <div className="resource-top">
                <MainBanner mainTitle="Resource" col="12" />
            </div>

            <MetaTags
                title="Covrzy | Business Insurance Simplified"
                description="We are on a mission to simplify business insurance in India and help companies in comparing quotes from top insurers and complete the purchase online."
                url={`https://covrzy.com/policy-details/${questionNo}`}
                canonical={`https://covrzy.com/policy-details/${questionNo}`}

            />
            
            <section className="business-wrp inbox-resource">
                <Container>
                    <Row>
                        <Col lg={3} md={4}>
                            <div className="index-box">
                                <div className='index-box-head'>Index</div>
                                <ul>
                                    {(questionNo === 'types-of-business-insurance-to-purchase'
                                        ? [...q1Content]
                                        : questionNo === 'business-insurance-cost'
                                          ? [...q2Content]
                                          : questionNo === 'broker-vs-covrzy'
                                            ? [...q3Content]
                                            : []
                                    ).map((data: any, index) => (
                                        <>
                                            <li>
                                                <Link
                                                    activeClass={
                                                        questionNo === data.tag
                                                            ? 'active-manu'
                                                            : ''
                                                    }
                                                    smooth={true}
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                    duration={100}
                                                    offset={-150}
                                                    key={index}
                                                    // onClick={() => setActiveQuestion(data.tag)}
                                                    // className={style.trackRightBar}
                                                    spy
                                                    to={data.tag}
                                                >
                                                    {data.detail}
                                                </Link>
                                            </li>

                                            {data.sub_points && (
                                                <ul className="doubt">
                                                    {data.sub_points.map(
                                                        (
                                                            sub: any,
                                                            i: number,
                                                        ) => (
                                                            <>
                                                                {' '}
                                                                <li>
                                                                    <Link
                                                                        activeClass={
                                                                            'active-manu'
                                                                        }
                                                                        smooth={
                                                                            true
                                                                        }
                                                                        style={{
                                                                            cursor: 'pointer',
                                                                        }}
                                                                        duration={
                                                                            100
                                                                        }
                                                                        offset={
                                                                            -120
                                                                        }
                                                                        key={i}
                                                                        spy
                                                                        to={
                                                                            sub.tag
                                                                        }
                                                                    >
                                                                        {
                                                                            sub.detail
                                                                        }
                                                                    </Link>
                                                                </li>
                                                                {sub.sub_points && (
                                                                    <ul>
                                                                        {sub.sub_points.map(
                                                                            (
                                                                                sub2: any,
                                                                                i2: number,
                                                                            ) => (
                                                                                <li>
                                                                                    <Link
                                                                                        activeClass={
                                                                                            'active-manu'
                                                                                        }
                                                                                        smooth={
                                                                                            true
                                                                                        }
                                                                                        style={{
                                                                                            cursor: 'pointer',
                                                                                        }}
                                                                                        duration={
                                                                                            100
                                                                                        }
                                                                                        offset={
                                                                                            -120
                                                                                        }
                                                                                        key={
                                                                                            i2
                                                                                        }
                                                                                        spy
                                                                                        to={
                                                                                            sub2.tag
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            sub2.detail
                                                                                        }
                                                                                    </Link>
                                                                                </li>
                                                                            ),
                                                                        )}
                                                                    </ul>
                                                                )}
                                                            </>
                                                        ),
                                                    )}
                                                </ul>
                                            )}
                                        </>
                                    ))}
                                </ul>
                            </div>
                        </Col>
                        <Col lg={9} md={8}>
                            <div className="business-content">
                                <div className="container">
                                    {questionNo === 'types-of-business-insurance-to-purchase' && (
                                        <div className="question-first" id="q1">
                                            <h2 className="title-wrp text-align-left">
                                                Which type of{' '}
                                                <span>
                                                    business insurance should I
                                                    purchase?
                                                </span>
                                            </h2>

                                            <p>
                                                When protecting your business,
                                                having the right insurance
                                                coverage is critical. With so
                                                many different types of
                                                insurance available, it can be
                                                overwhelming to determine which
                                                coverage is best for your
                                                business. This article will
                                                discuss vital factors to
                                                consider when choosing the right
                                                type of insurance for your
                                                business.
                                            </p>
                                            <p>
                                                Whether you have a small
                                                business or a big firm, a
                                                general liability insurance is
                                                recommended for all. Apart from
                                                this depending on the type of
                                                business you are in will
                                                determine the specific type of
                                                insurance you should get, for
                                                example if you have an online
                                                business and, or you deal with
                                                sensitive data (eg financial
                                                information and personal data),
                                                you should consider a Cyber Risk
                                                Insurance. Similarly in case you
                                                are into logistics or your
                                                business operations include any
                                                type of transport related
                                                activities you should consider
                                                Marine/Transit insurance. You
                                                can talk to our expert to figure
                                                out what kind of insurances will
                                                help you safeguard your
                                                business’ interests or go
                                                through different types of
                                                liability policies below:
                                            </p>
                                            <div className="type-of-business">
                                                <h2
                                                    id="types-insurance"
                                                    className="title-wrp text-align-left"
                                                >
                                                    Types of{' '}
                                                    <span>
                                                        Business insurance
                                                    </span>
                                                </h2>
                                                <ul className="doubt">
                                                    <li id="glp">
                                                        <strong>
                                                            General Liability
                                                            Policies
                                                        </strong>
                                                        <p>
                                                            General liability
                                                            insurance is a type
                                                            of insurance policy
                                                            that provides
                                                            coverage for
                                                            businesses against
                                                            financial losses
                                                            resulting from
                                                            third-party claims
                                                            of bodily injury or
                                                            property damage.
                                                            This policy protects
                                                            the business from
                                                            lawsuits and
                                                            compensation claims
                                                            arising from
                                                            accidents on their
                                                            property, products
                                                            or services offered,
                                                            and other covered
                                                            events. It helps
                                                            cover the cost of
                                                            legal defense and
                                                            any settlements or
                                                            judgments if the
                                                            business is found to
                                                            be responsible.
                                                        </p>
                                                        <p>
                                                            Examples of
                                                            incidents that may
                                                            trigger a liability
                                                            claim include a
                                                            customer slipping
                                                            and falling on a wet
                                                            floor, damage to a
                                                            third-party property
                                                            during business
                                                            operations, or
                                                            injury caused by a
                                                            defective product.
                                                            General liability
                                                            insurance is a
                                                            crucial coverage for
                                                            small and large
                                                            businesses alike, as
                                                            it helps to protect
                                                            their financial
                                                            assets and ensure
                                                            they can continue
                                                            operating in the
                                                            event of a liability
                                                            claim.
                                                        </p>
                                                    </li>
                                                    <li id="pflp">
                                                        <strong>
                                                            Professional
                                                            Liability Policies
                                                        </strong>
                                                        <p>
                                                            Professional
                                                            liability insurance
                                                            is a type of
                                                            insurance policy
                                                            that provides
                                                            coverage for
                                                            professionals
                                                            against financial
                                                            losses resulting
                                                            from claims of
                                                            negligence,
                                                            mistakes, or
                                                            omissions in the
                                                            performance of their
                                                            professional duties.
                                                            This coverage is
                                                            designed to protect
                                                            professionals, such
                                                            as doctors, lawyers,
                                                            accountants,
                                                            consultants, and
                                                            other service
                                                            providers, against
                                                            claims of
                                                            malpractice or
                                                            breach of contract.
                                                        </p>
                                                        <p>
                                                            Examples of
                                                            incidents that may
                                                            trigger a
                                                            professional
                                                            liability claim
                                                            include a doctor
                                                            misdiagnosing a
                                                            patient, an
                                                            accountant giving
                                                            incorrect tax
                                                            advice, or a
                                                            consultant failing
                                                            to meet the
                                                            expectations of a
                                                            client. Professional
                                                            liability insurance
                                                            helps cover the cost
                                                            of legal defence and
                                                            any settlements or
                                                            judgments if the
                                                            professional is
                                                            found to be
                                                            responsible.
                                                        </p>
                                                        <p>
                                                            Having professional
                                                            liability insurance
                                                            is important for
                                                            professionals, as it
                                                            helps protect their
                                                            reputation and
                                                            financial assets and
                                                            provides peace of
                                                            mind in the event of
                                                            a liability claim.
                                                            Without this
                                                            coverage,
                                                            professionals may
                                                            face significant
                                                            financial losses and
                                                            reputational damage
                                                            if they are sued for
                                                            negligence or
                                                            mistakes made in the
                                                            course of their
                                                            work.
                                                        </p>
                                                    </li>
                                                    <li id="eip">
                                                        <strong>
                                                            Employee Insurance
                                                            Policies
                                                        </strong>
                                                        <p>
                                                            Employee insurance
                                                            policies are a type
                                                            of insurance
                                                            coverage that
                                                            provides financial
                                                            protection for
                                                            employees in the
                                                            event of a covered
                                                            loss. This insurance
                                                            can take several
                                                            forms, including
                                                            health insurance,
                                                            life insurance,
                                                            disability
                                                            insurance, and more.
                                                        </p>
                                                        <p>
                                                            The employer can
                                                            provide employee
                                                            insurance policies
                                                            as a benefit, or
                                                            employees may
                                                            purchase coverage
                                                            individually.
                                                            Providing employee
                                                            insurance can help
                                                            attract and retain
                                                            employees, improve
                                                            employee morale, and
                                                            provide financial
                                                            protection for
                                                            employees and their
                                                            families in the
                                                            event of a covered
                                                            loss.
                                                        </p>
                                                        <p>
                                                            Having employee
                                                            insurance policies
                                                            in place can be an
                                                            important aspect of
                                                            a comprehensive
                                                            benefits program. It
                                                            can help provide
                                                            peace of mind for
                                                            employees, knowing
                                                            that they and their
                                                            families are
                                                            protected in the
                                                            event of an
                                                            unexpected loss.
                                                        </p>
                                                    </li>
                                                    <li id="pplp">
                                                        <strong>
                                                            Property Insurance
                                                            Policies
                                                        </strong>
                                                        <p>
                                                            Property insurance
                                                            policies are a type
                                                            of insurance
                                                            coverage that
                                                            provides financial
                                                            protection for
                                                            property owners
                                                            against losses
                                                            resulting from
                                                            covered events such
                                                            as fire, theft,
                                                            storm damage, and
                                                            more. This insurance
                                                            helps cover the cost
                                                            of repairs or
                                                            replacement of the
                                                            property in case of
                                                            a covered loss. It
                                                            can also provide
                                                            liability coverage
                                                            for incidents that
                                                            occur on the
                                                            property.
                                                        </p>
                                                        <p>
                                                            Examples of property
                                                            that can be insured
                                                            include homes,
                                                            rental properties,
                                                            commercial
                                                            buildings, and
                                                            personal
                                                            possessions.
                                                            Property insurance
                                                            policies can be
                                                            purchased by the
                                                            owner of the
                                                            property or by a
                                                            tenant who rents the
                                                            property.
                                                        </p>
                                                        <p>
                                                            Without this
                                                            coverage, property
                                                            owners may face
                                                            significant
                                                            financial losses in
                                                            the event of damage
                                                            to their property or
                                                            liability claims
                                                            arising from
                                                            incidents on their
                                                            property
                                                        </p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    )}

                                    {questionNo === 'business-insurance-cost' && (
                                        <div className="question-first" id="q2">
                                            <h2 className="title-wrp text-align-left">
                                                How much does{' '}
                                                <span>
                                                    business insurance cost?
                                                </span>
                                            </h2>
                                            <p>
                                                The cost of business insurance
                                                can be a complex and confusing
                                                issue for many entrepreneurs.
                                                With so many factors affecting
                                                the price, knowing precisely
                                                what you should expect to pay
                                                can be challenging. In this blog
                                                post, we'll go over some of the
                                                main factors that influence the
                                                cost of business insurance and
                                                provide examples of what you can
                                                expect to pay for different
                                                types of coverage.
                                            </p>

                                            <div
                                                className="question-second-inner"
                                                id="cost-affecting"
                                            >
                                                <h2 className="title-wrp text-align-left">
                                                    Cost Affecting{' '}
                                                    <span>
                                                        General Liability
                                                        Insurance
                                                    </span>
                                                </h2>
                                                <p>
                                                    There are lot of factors
                                                    that affect cost of general
                                                    liability insurance but here
                                                    are some of the most
                                                    important:
                                                </p>
                                                <ul className="doubt">
                                                    <li id="Location-and-Size">
                                                        <strong>
                                                            Location and Size of
                                                            your
                                                            warehouse/office
                                                        </strong>
                                                        <p>
                                                            Bigger buildings
                                                            invite more
                                                            opportunities for
                                                            accidents to happen.
                                                            So if you operate in
                                                            a larger facility
                                                            with more foot
                                                            traffic, you could
                                                            pay more. Also,
                                                            location of
                                                            office/warehouse is
                                                            equally important.
                                                            If it falls under a
                                                            high risk area, the
                                                            cost can increase
                                                        </p>
                                                    </li>
                                                    <li id="annual-turnover">
                                                        <strong>
                                                            Employees cost and
                                                            annual turnover
                                                        </strong>
                                                        <p>
                                                            The higher your
                                                            expenses or
                                                            operating costs, the
                                                            more you can expect
                                                            to pay for liability
                                                            insurance.
                                                        </p>
                                                    </li>
                                                    <li id="past-claim">
                                                        <strong>
                                                            Past claims
                                                        </strong>
                                                        <p>
                                                            If you’ve filed
                                                            general liability
                                                            claims in the past,
                                                            it could increase
                                                            your premiums.
                                                        </p>
                                                    </li>
                                                    <li id="Policy-Coverage">
                                                        <strong>
                                                            Policy Coverage
                                                        </strong>
                                                        <p>
                                                            Coverage limits,
                                                            deductibles and
                                                            other policy details
                                                            affect your business
                                                            insurance cost.
                                                        </p>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div
                                                className="question-second-inner"
                                                id="factors-affecting-professional"
                                            >
                                                <h2 className="title-wrp text-align-left">
                                                    Factors Affecting{' '}
                                                    <span>
                                                        Cost of Professional
                                                        Liability Policies
                                                    </span>
                                                </h2>
                                                <p>
                                                    Various factors affect
                                                    professional liability cost
                                                    but here are some important
                                                    factors:
                                                </p>
                                                <ul className="doubt">
                                                    <li id="pal">
                                                        <strong>
                                                            Practice
                                                            area/location
                                                        </strong>
                                                        <p>
                                                            Insurance companies
                                                            often adjust rates
                                                            for specific
                                                            territories, in
                                                            response to change
                                                            in litigation costs
                                                            associated with
                                                            different locations
                                                            over time and in
                                                            response to
                                                            particular market
                                                            conditions.
                                                        </p>
                                                    </li>
                                                    <li id="Speciality">
                                                        <strong>
                                                            Speciality
                                                        </strong>
                                                        <p>
                                                            A physician may
                                                            choose to transition
                                                            to a sub-specialty
                                                            or drop a specialty
                                                            category, such as
                                                            surgery, both of
                                                            which will impact
                                                            their premium.
                                                        </p>
                                                    </li>
                                                    <li id="pc">
                                                        <strong>
                                                            Past Claims
                                                        </strong>
                                                        <p>
                                                            Professional
                                                            liability policies
                                                            are have high impact
                                                            on premium in case
                                                            there were any past
                                                            claims. Claims could
                                                            have happened for
                                                            various reason but
                                                            it impacts following
                                                            year premium,
                                                        </p>
                                                    </li>
                                                    <li id="iad">
                                                        <strong>
                                                            Inclusions and
                                                            Deductibles
                                                        </strong>
                                                        <p>
                                                            Insurers may include
                                                            deductibles while
                                                            they issue a
                                                            professional
                                                            liability policy,
                                                            certain insurers may
                                                            allow a professional
                                                            to increase/decrease
                                                            his or her
                                                            deductible as a way
                                                            to lower the annual
                                                            premium. Also, cost
                                                            may vary if you have
                                                            a flexible policy vs
                                                            a policy with less
                                                            coverage options.
                                                        </p>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div
                                                className="question-second-inner"
                                                id="factors-affecting-employee"
                                            >
                                                <h2 className="title-wrp text-align-left">
                                                    Factors Affecting{' '}
                                                    <span>
                                                        Cost of Employee
                                                        Insurance Policies
                                                    </span>
                                                </h2>
                                                <p>
                                                    There are several factors
                                                    affecting cost of employee
                                                    insurance policies like
                                                    health and life. Some of the
                                                    most critical one’s are:
                                                </p>
                                                <ul className="doubt">
                                                    <li id="Employee-Strength">
                                                        <strong>
                                                            Employee Strength
                                                        </strong>
                                                        <p>
                                                            Per head cost is
                                                            exponentially higher
                                                            if the you’re a
                                                            small team vs if you
                                                            have a large team.
                                                        </p>
                                                    </li>
                                                    <li id="Plan-Type">
                                                        <strong>
                                                            Plan Type
                                                        </strong>
                                                        <p>
                                                            Cost is lower if you
                                                            opt for a employee
                                                            only plan vs if you
                                                            opt for a plan which
                                                            covers employee and
                                                            their family
                                                            members. Also, if
                                                            you include the
                                                            dependent parents,
                                                            then cost increases
                                                            by 2x to 3x in some
                                                            cases.
                                                        </p>
                                                    </li>
                                                    <li id="inclusion-and-exclusion">
                                                        <strong>
                                                            Coverage inclusion
                                                            and exclusion
                                                        </strong>
                                                        <p>
                                                            Cost is
                                                            significantly high
                                                            if you opt for PEDs
                                                            coverage from day 1
                                                            vs cooling period of
                                                            PED covered after q
                                                            year. Similarly
                                                            there are other
                                                            clauses which
                                                            impacts the coverage
                                                        </p>
                                                    </li>
                                                </ul>
                                            </div>
                                            <p>
                                                {' '}
                                                In conclusion, the cost of
                                                business insurance can be
                                                affected by several factors,
                                                including the size of the
                                                company, the industry in which
                                                the company operates, the extent
                                                and the number of assets,
                                                people, and entities to be
                                                covered, and the level of
                                                coverage desired. When choosing
                                                your insurance coverage, it's
                                                essential to consider your
                                                budget and the level of risk
                                                your business faces. An
                                                insurance agent with experience
                                                working with businesses like
                                                yours can help you determine the
                                                insurance cost.
                                            </p>
                                            <p>
                                                For a custom quote, it's best to
                                                reach out to an insurance agent
                                                who can help you assess your
                                                needs and recommend the coverage
                                                that best suits your business.
                                            </p>
                                        </div>
                                    )}

                                    {questionNo === 'broker-vs-covrzy' && (
                                        <div className="question-first" id="q3">
                                            <h2 className="title-wrp text-align-left">
                                                What's the difference{' '}
                                                <span>
                                                    between a broker and Covrzy?
                                                </span>
                                            </h2>
                                            <p>
                                                Insurance is an essential aspect
                                                of protecting a business and
                                                assets, but with the many
                                                options available, it can take
                                                time to navigate the market. Two
                                                standard options for obtaining
                                                insurance are a traditional
                                                insurance broker or a modern
                                                platform such as Covrzy. In this
                                                article, we will compare the two
                                                and help you understand their
                                                key differences.
                                            </p>
                                            <ul className="doubt">
                                                <li id="Broker">
                                                    <strong>
                                                        Who is a Broker
                                                    </strong>
                                                    <p>
                                                        Insurance broker is a
                                                        professional who acts as
                                                        an intermediary between
                                                        the consumer and the
                                                        insurance company. The
                                                        broker's role is to help
                                                        clients find the best
                                                        coverage options that
                                                        meet their needs. They
                                                        have access to a wide
                                                        range of insurance
                                                        products from multiple
                                                        companies, and their
                                                        primary function is to
                                                        sell insurance policies.
                                                        Once a client selects a
                                                        policy, the broker
                                                        handles all the details
                                                        of purchasing the policy
                                                        and delivering the
                                                        coverage to the client.
                                                    </p>
                                                </li>
                                                <li id="different">
                                                    <strong>
                                                        How are we different
                                                    </strong>
                                                    <p>
                                                        Covrzy is a new and
                                                        innovative platform that
                                                        provides customers with
                                                        a curated range of
                                                        insurance products. Our
                                                        goal is to simplify
                                                        purchasing insurance by
                                                        offering easy-to-use and
                                                        self-explanatory
                                                        products. Customers
                                                        should have a reliable
                                                        partner who can handle
                                                        the insurance aspect of
                                                        their business, so they
                                                        can focus on what they
                                                        do best.
                                                    </p>
                                                    <p>
                                                        The other stark
                                                        difference between us
                                                        and your traditional
                                                        broker is that we not
                                                        only help you in
                                                        purchase process but in
                                                        servicing and claims
                                                        journey as well.
                                                    </p>
                                                </li>
                                                <li id="Multiple">
                                                    <strong>
                                                        Multiple Options
                                                    </strong>
                                                    <p>
                                                        A traditional insurance
                                                        broker has access to
                                                        multiple products from
                                                        multiple companies. This
                                                        gives clients a range of
                                                        options, but it also
                                                        means that selecting an
                                                        insurance policy can be
                                                        more complex and
                                                        time-consuming, and
                                                        sometimes it comes with
                                                        a brokerage cost. On the
                                                        other hand, Covrzy
                                                        offers a curated content
                                                        of insurance products
                                                        that are specifically
                                                        chosen to meet the needs
                                                        of our customers.
                                                        Customers can make an
                                                        informed decision
                                                        quickly and easily
                                                        without sifting through
                                                        many options.
                                                    </p>
                                                </li>
                                                <li id="Support">
                                                    <strong>
                                                        Support and Guidance
                                                    </strong>
                                                    <p>
                                                        Clients with a
                                                        traditional insurance
                                                        broker are responsible
                                                        for researching and
                                                        making their own
                                                        decisions. This can be
                                                        overwhelming for those
                                                        unfamiliar with the
                                                        insurance market. At
                                                        Covrzy, we provide
                                                        customers with all the
                                                        information they need to
                                                        make an informed
                                                        decision, and our team
                                                        is always on hand to
                                                        answer any questions and
                                                        provide support.
                                                    </p>
                                                </li>
                                                <li id="Innovation">
                                                    <strong>
                                                        Use of Innovation and
                                                        technology
                                                    </strong>
                                                    <p>
                                                        The insurance market has
                                                        slowly adopted new
                                                        technologies, and many
                                                        insurance brokers still
                                                        operate traditionally.
                                                        At Covrzy, we are at the
                                                        forefront of innovation
                                                        and are using technology
                                                        to simplify the
                                                        insurance buying process
                                                        and improve the customer
                                                        experience. Our platform
                                                        is designed to be
                                                        user-friendly and
                                                        intuitive, and we are
                                                        constantly working to
                                                        improve our offerings.
                                                    </p>
                                                </li>
                                                <p>
                                                    In conclusion, there are
                                                    several key differences
                                                    between a traditional
                                                    insurance broker and Covrzy.
                                                    Both options have their own
                                                    advantages and
                                                    disadvantages, and the right
                                                    choice will depend on each
                                                    customer's specific needs.
                                                    However, suppose you are
                                                    looking for a modern and
                                                    innovative solution that
                                                    provides you with a curated
                                                    range of insurance products,
                                                    a simplified purchasing
                                                    process, and excellent
                                                    customer support. In that
                                                    case, Covrzy is the right
                                                    choice for you.
                                                </p>
                                            </ul>
                                        </div>
                                    )}

                                    <SubBanner
                                        bgImage={coverge}
                                        whiteTitle="Find the Best Coverage "
                                        orangeTitle="for your business"
                                        content={`<p>Not sure which insurance you need?<br /> Let us help you.</p>`}
                                        buttonTitle="Get Quote"
                                        image={note}
                                        onClick={() => handleShow()}
                                    />
                                    <CustomQuoteModal
                                        show={showModal}
                                        setShowModal={setShowModal}
                                        source={'Resource'}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Fragment>
    );
};

export default Resources;
