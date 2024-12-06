import { Fragment, useEffect, useState } from 'react';
import { IReduxState } from '../../utils/types';
import { useSelector } from 'react-redux';
import Header from '../../common/Layouts/Header';
import MetaTags from '../../common/MetaTag';

const TermsConditions = () => {
    const { isLogin } = useSelector((state: IReduxState) => state.Auth);

    return (
        <Fragment>
            {!isLogin && <Header />}
            
            <div className="container">
                <MetaTags
                    title="Covrzy | Business Insurance Simplified"
                    description="We are on a mission to simplify business insurance in India and help companies in comparing quotes from top insurers and complete the purchase online."
                    url={`https://covrzy.com/company/terms`}
                    canonical={`https://covrzy.com/company/terms`}
                />
                <div className="hero-info terms-title text-center">
                    <h1>Terms Of Service Agreement</h1>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <ol type="I">
                            <div className="col-lg-12 mb-3">
                                <p className="term-content">
                                    Please Read This Terms Of Service Agreement
                                    Carefully. By Using This Website Or Ordering
                                    Products From This Website You Agree To Be
                                    Bound By All Of The Terms And Conditions Of
                                    This Agreement
                                </p>
                                <p className="term-content">
                                    This Terms Of Service Agreement (The
                                    "Agreement") Governs Your Use Of This
                                    Website, Www.Covrzy.Com (The "Website"),
                                    Bizcovr Technologies Private Limited ("Brand
                                    Name - Covrzy") Offer Of Products/Services
                                    For Purchase On This Website, Or Your
                                    Purchase Of Products Available On This
                                    Website. This Agreement Includes, And
                                    Incorporates By This Reference, The Policies
                                    And Guidelines Referenced Below. Covrzy
                                    reserves The Right To Change Or Revise The
                                    Terms And Conditions Of This Agreement At
                                    Any Time By Posting Any Changes Or A Revised
                                    Agreement On This Website. Covrzy will Alert
                                    You That Changes Or Revisions Have Been Made
                                    By Indicating On The Top Of This Agreement
                                    The Date It Was Last Revised. The Changed Or
                                    Revised Agreement Will Be Effective
                                    Immediately After It Is Posted On This
                                    Website. Your Use Of The Website Following
                                    The Posting Any Such Changes Or Of A Revised
                                    Agreement Will Constitute Your Acceptance Of
                                    Any Such Changes Or Revisions. Covrzy
                                    Encourages You To Review This Agreement
                                    Whenever You Visit The Website To Make Sure
                                    That You Understand The Terms And Conditions
                                    Governing Use Of The Website. This Agreement
                                    Does Not Alter In Any Way The Terms Or
                                    Conditions Of Any Other Written Agreement
                                    You May Have With Covrzy for Other Products
                                    Or Services. If You Do Not Agree To This
                                    Agreement (Including Any Referenced Policies
                                    Or Guidelines), Please Immediately Terminate
                                    Your Use Of The Website. If You Would Like
                                    To Print This Agreement, Please Click The
                                    Print Button On Your Browser Toolbar.
                                </p>
                            </div>
                            <div className="col-lg-12">
                                <div className="product-title customer-solicitation">
                                    <li>
                                        <h3>Products</h3>
                                    </li>
                                    <ul>
                                        <p>
                                            <li></li>
                                            Terms Of Offer. This Website Offers
                                            For Sale Certain Products (The
                                            "Products"). By Placing An Order For
                                            Products Through This Website, You
                                            Agree To The Terms Set Forth In This
                                            Agreement
                                        </p>
                                        <div className="customer-solicitation">
                                            <p>
                                                <li></li>
                                                <span
                                                    style={{
                                                        maxWidth: '160px',
                                                    }}
                                                >
                                                    Customer Solicitation:{' '}
                                                </span>
                                                unless You Notify Our Third
                                                Party Call Center Reps Or Direct
                                                Covrzy Sales Reps, While They
                                                Are Calling You, Of Your Desire
                                                To Opt Out From Further Direct
                                                Company Communications And
                                                Solicitations, You Are Agreeing
                                                To Continue To Receive Further
                                                Emails And Call Solicitations
                                                Covrzy and Its Designated In
                                                House Or Third Party Call
                                                Team(S).
                                            </p>
                                        </div>
                                        <div className="customer-solicitation">
                                            <p>
                                                <li></li>
                                                <span
                                                    style={{
                                                        maxWidth: '160px',
                                                    }}
                                                >
                                                    Opt Out Procedure:{' '}
                                                </span>
                                                we Provide 3 Easy Ways To Opt
                                                Out Of From Future
                                                Solicitations. 1. You May Use
                                                The Opt Out Link Found In Any
                                                Email Solicitation That You May
                                                Receive. 2. You May Also Choose
                                                To Opt Out, Via Sending Your
                                                Email Address To:
                                                Hello@Covrzy.Com
                                            </p>
                                            <p>
                                                <li></li>
                                                3. You May Send A Written Remove
                                                Request To - Bizcovr
                                                Technologies private limited
                                                13031, Sobha Dream Acres,
                                                Balagere Main Road, Off
                                                Panathur, Bengaluru, Karnataka
                                                560087.{' '}
                                            </p>
                                            <p>
                                                <li></li>
                                                Proprietary Rights. Covrzy has
                                                Proprietary Rights And Trade
                                                Secrets In The Products. You May
                                                Not Copy, Reproduce, Resell Or
                                                Redistribute Any Product
                                                Manufactured And/Or Distributed
                                                By Covrzy. Covrzy also Has
                                                Rights To All Trademarks And
                                                Trade Dress And Specific Layouts
                                                Of This Webpage, Including Calls
                                                To Action, Text Placement,
                                                Images And Other Information.
                                            </p>
                                            <p>
                                                <li></li>
                                                Sales Tax. If You Purchase Any
                                                Products, You Will Be
                                                Responsible For Paying Any
                                                Applicable Sales Tax.
                                            </p>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="product-title customer-solicitation">
                                    <li>
                                        <h3>Website</h3>
                                    </li>
                                    <ul>
                                        <p>
                                            <li></li>
                                            Content; Intellectual Property;
                                            Third Party Links. In Addition To
                                            Making Products Available, This
                                            Website Also Offers Information And
                                            Marketing Materials. This Website
                                            Also Offers Information, Both
                                            Directly And Through Indirect Links
                                            To Third-Party Websites, About
                                            Nutritional And Dietary Supplements.
                                            Covrzy Does Not Always Create The
                                            Information Offered On This Website;
                                            Instead The Information Is Often
                                            Gathered From Other Sources. To The
                                            Extent That Covrzy Does Create The
                                            Content On This Website, Such
                                            Content Is Protected By Intellectual
                                            Property Laws Of The India, Foreign
                                            Nations, And International Bodies.
                                            Unauthorized Use Of The Material May
                                            Violate Copyright, Trademark, And/Or
                                            Other Laws. You Acknowledge That
                                            Your Use Of The Content On This
                                            Website Is For Personal,
                                            Noncommercial Use. Any Links To
                                            Third-Party Websites Are Provided
                                            Solely As A Convenience To You.
                                            Covrzy Does Not Endorse The Contents
                                            On Any Such Third-Party Websites.
                                            Covrzy Is Not Responsible For The
                                            Content Of Or Any Damage That May
                                            Result From Your Access To Or
                                            Reliance On These Third-Party
                                            Websites. If You Link To Third-Party
                                            Websites, You Do So At Your Own
                                            Risk.
                                        </p>

                                        <p>
                                            <li></li>
                                            Use Of Website; Covrzy is Not
                                            Responsible For Any Damages
                                            Resulting From Use Of This Website
                                            By Anyone. You Will Not Use The
                                            Website For Illegal Purposes. You
                                            Will (1) Abide By All Applicable
                                            Local, State, National, And
                                            International Laws And Regulations
                                            In Your Use Of The Website
                                            (Including Laws Regarding
                                            Intellectual Property), (2) Not
                                            Interfere With Or Disrupt The Use
                                            And Enjoyment Of The Website By
                                            Other Users, (3) Not Resell Material
                                            On The Website, (4) Not Engage,
                                            Directly Or Indirectly, In
                                            Transmission Of "Spam", Chain
                                            Letters, Junk Mail Or Any Other Type
                                            Of Unsolicited Communication, And
                                            (5) Not Defame, Harass, Abuse, Or
                                            Disrupt Other Users Of The Website
                                        </p>

                                        <p>
                                            <li></li>
                                            License. By Using This Website, You
                                            Are Granted A Limited,
                                            Non-Exclusive, Non-Transferable
                                            Right To Use The Content And
                                            Materials On The Website In
                                            Connection With Your Normal,
                                            Noncommercial, Use Of The Website.
                                            You May Not Copy, Reproduce,
                                            Transmit, Distribute, Or Create
                                            Derivative Works Of Such Content Or
                                            Information Without Express Written
                                            Authorization From Covrzy or The
                                            Applicable Third Party (If Third
                                            Party Content Is At Issue).
                                        </p>
                                        <p>
                                            <li></li>
                                            Posting. By Posting, Storing, Or
                                            Transmitting Any Content On The
                                            Website, You Hereby Grant Covrzy a
                                            Perpetual, Worldwide, Non-Exclusive,
                                            Royalty-Free, Assignable, Right And
                                            License To Use, Copy, Display,
                                            Perform, Create Derivative Works
                                            From, Distribute, Have Distributed,
                                            Transmit And Assign Such Content In
                                            Any Form, In All Media Now Known Or
                                            Hereinafter Created, Anywhere In The
                                            World. Covrzy does Not Have The
                                            Ability To Control The Nature Of The
                                            User-Generated Content Offered
                                            Through The Website. You Are Solely
                                            Responsible For Your Interactions
                                            With Other Users Of The Website And
                                            Any Content You Post. Covrzy is Not
                                            Liable For Any Damage Or Harm
                                            Resulting From Any Posts By Or
                                            Interactions Between Users. Covrzy
                                            reserves The Right, But Has No
                                            Obligation, To Monitor Interactions
                                            Between And Among Users Of The
                                            Website And To Remove Any Content
                                            Covrzy Deems Objectionable, In
                                            Muscleup Nutrition 's Sole
                                            Discretion.
                                        </p>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="product-title customer-solicitation">
                                    <li>
                                        <h3>Disclaimer Of Warranties</h3>
                                    </li>
                                    <ul>
                                        <p>
                                            <li></li>
                                            Your Use Of This Website And/Or
                                            Products Are At Your Sole Risk. The
                                            Website And Products Are Offered On
                                            An "As Is" And "As Available" Basis.
                                            Covrzy expressly Disclaims All
                                            Warranties Of Any Kind, Whether
                                            Express Or Implied, Including, But
                                            Not Limited To, Implied Warranties
                                            Of Merchantability, Fitness For A
                                            Particular Purpose And
                                            Non-Infringement With Respect To The
                                            Products Or Website Content, Or Any
                                            Reliance Upon Or Use Of The Website
                                            Content Or Products. ("Products"
                                            Include Trial Products.)
                                        </p>

                                        <p>
                                            <li></li>
                                            Without Limiting The Generality Of
                                            The Foregoing, Covrzy Makes No
                                            Warranty:
                                        </p>

                                        <p>
                                            <li></li>
                                            That The Information Provided On
                                            This Website Is Accurate, Reliable,
                                            Complete, Or Timely.
                                        </p>
                                        <p>
                                            <li></li>
                                            That The Links To Third-Party
                                            Websites Are To Information That Is
                                            Accurate, Reliable, Complete, Or
                                            Timely.
                                        </p>
                                        <p>
                                            <li></li>
                                            No Advice Or Information, Whether
                                            Oral Or Written, Obtained By You
                                            From This Website Will Create Any
                                            Warranty Not Expressly Stated
                                            Herein.
                                        </p>
                                        <p>
                                            <li></li>
                                            As To The Results That May Be
                                            Obtained From The Use Of The
                                            Products Or That Defects In Products
                                            Will Be Corrected.
                                        </p>
                                        <p>
                                            <li></li>
                                            Regarding Any Products Purchased Or
                                            Obtained Through The Website.
                                        </p>
                                        <p>
                                            <li></li>
                                            Some Jurisdictions Do Not Allow The
                                            Exclusion Of Certain Warranties, So
                                            Some Of The Above Exclusions May Not
                                            Apply To You.
                                        </p>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="product-title customer-solicitation">
                                    <li>
                                        <h3>Limitation Of Liability</h3>
                                    </li>
                                    <ul>
                                        <p>
                                            <li></li>
                                            Covrzy Will Not Be Liable For Any
                                            Direct, Indirect, Incidental,
                                            Special Or Consequential Damages In
                                            Connection With This Agreement Or
                                            The Products/Services In Any Manner,
                                            Including Liabilities Resulting From
                                            (1) The Use Or The Inability To Use
                                            The Website Content Or Products; (2)
                                            The Cost Of Procuring Substitute
                                            Products Or Service Or Content; (3)
                                            Any Products Purchased Or Obtained
                                            Or Transactions Entered Into Through
                                            The Website; Or (4) Any Lost Profits
                                            You Allege.
                                        </p>

                                        <p>
                                            <li></li>
                                            Some Jurisdictions Do Not Allow The
                                            Limitation Or Exclusion Of Liability
                                            For Incidental Or Consequential
                                            Damages So Some Of The Above
                                            Limitations May Not Apply To You.
                                        </p>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="product-title customer-solicitation">
                                    <li>
                                        <h3>Indemnification</h3>
                                    </li>
                                    <ul>
                                        <p>
                                            <li></li>
                                            You Will Release, Indemnify, Defend
                                            And Hold Harmless Covrzy, And Any Of
                                            Its Contractors, Agents, Employees,
                                            Officers, Directors, Shareholders,
                                            Affiliates And Assigns From All
                                            Liabilities, Claims, Damages, Costs
                                            And Expenses, Including Reasonable
                                            Attorneys' Fees And Expenses, Of
                                            Third Parties Relating To Or Arising
                                            Out Of (1) This Agreement Or The
                                            Breach Of Your Warranties,
                                            Representations And Obligations
                                            Under This Agreement; (2) The
                                            Website Content Or Your Use Of The
                                            Website Content; (3) The Products Or
                                            Your Use Of The Products (Including
                                            Trial Products); (4) Any
                                            Intellectual Property Or Other
                                            Proprietary Right Of Any Person Or
                                            Entity; (5) Your Violation Of Any
                                            Provision Of This Agreement; Or (6)
                                            Any Information Or Data You Supplied
                                            To Covrzy. When Covrzy is Threatened
                                            With Suit Or Sued By A Third Party,
                                            Covrzy may Seek Written Assurances
                                            From You Concerning Your Promise To
                                            Indemnify Covrzy; Your Failure To
                                            Provide Such Assurances May Be
                                            Considered By Covrzy to Be A
                                            Material Breach Of This Agreement.
                                            Covrzy Will Have The Right To
                                            Participate In Any Defense By You Of
                                            A Third-Party Claim Related To Your
                                            Use Of Any Of The Website Content Or
                                            Products, With Counsel Of Covrzy
                                            choice At Its Expense. Covrzy will
                                            Reasonably Cooperate In Any Defense
                                            By You Of A Third-Party Claim At
                                            Your Request And Expense. You Will
                                            Have Sole Responsibility To Defend
                                            Covrzy against Any Claim, But You
                                            Must Receive Covrzy prior Written
                                            Consent Regarding Any Related
                                            Settlement. The Terms Of This
                                            Provision Will Survive Any
                                            Termination Or Cancellation Of This
                                            Agreement Or Your Use Of The Website
                                            Or Products.
                                        </p>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="product-title customer-solicitation">
                                    <li>
                                        <h3>Privacy</h3>
                                    </li>
                                    <ul>
                                        <p>
                                            <li></li>
                                            Covrzy Believes Strongly In
                                            Protecting User Privacy And
                                            Providing You With Notice Of Use Of
                                            Data. Please Refer To Covrzy Privacy
                                            Policy, Incorporated By Reference
                                            Herein, That Is Posted On The
                                            Website.
                                        </p>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="product-title customer-solicitation">
                                    <li>
                                        {' '}
                                        <h3> Agreement To Be Bound</h3>
                                    </li>
                                    <ul>
                                        <p>
                                            <li></li>
                                            By Using This Website Or Ordering
                                            Products, You Acknowledge That You
                                            Have Read And Agree To Be Bound By
                                            This Agreement And All Terms And
                                            Conditions On This Website.
                                        </p>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="product-title customer-solicitation">
                                    <li>
                                        <h3>General</h3>
                                    </li>
                                    <ul>
                                        <p>
                                            <li></li>
                                            <span>Force Majeur -</span> Covrzy
                                            Will Not Be Deemed In Default
                                            Hereunder Or Held Responsible For
                                            Any Cessation, Interruption Or Delay
                                            In The Performance Of Its
                                            Obligations Hereunder Due To
                                            Earthquake, Flood, Fire, Storm,
                                            Natural Disaster, Act Of God, War,
                                            Terrorism, Armed Conflict, Labor
                                            Strike, Lockout, Or Boycott.
                                        </p>
                                        <p>
                                            <li></li>
                                            <span>
                                                Cessation Of Operation -
                                            </span>{' '}
                                            Covrzy may At Any Time, In Its Sole
                                            Discretion And Without Advance
                                            Notice To You, Cease Operation Of
                                            The Website And Distribution Of The
                                            Products.
                                        </p>
                                        <p>
                                            <li></li>
                                            <span>Entire Agreement -</span> This
                                            Agreement Comprises The Entire
                                            Agreement Between You And Covrzy and
                                            Supersedes Any Prior Agreements
                                            Pertaining To The Subject Matter
                                            Contained Herein.
                                        </p>
                                        <p>
                                            <li></li>
                                            <span>Effect Of Waiver -</span> The
                                            Failure Of Covrzy to Exercise Or
                                            Enforce Any Right Or Provision Of
                                            This Agreement Will Not Constitute A
                                            Waiver Of Such Right Or Provision.
                                            If Any Provision Of This Agreement
                                            Is Found By A Court Of Competent
                                            Jurisdiction To Be Invalid, The
                                            Parties Nevertheless Agree That The
                                            Court Should Endeavor To Give Effect
                                            To The Parties' Intentions As
                                            Reflected In The Provision, And The
                                            Other Provisions Of This Agreement
                                            Remain In Full Force And Effect.
                                        </p>
                                        <p>
                                            <li></li>
                                            <span>Effect Of Waiver -</span> The
                                            Failure Of Covrzy to Exercise Or
                                            Enforce Any Right Or Provision Of
                                            This Agreement Will Not Constitute A
                                            Waiver Of Such Right Or Provision.
                                            If Any Provision Of This Agreement
                                            Is Found By A Court Of Competent
                                            Jurisdiction To Be Invalid, The
                                            Parties Nevertheless Agree That The
                                            Court Should Endeavor To Give Effect
                                            To The Parties' Intentions As
                                            Reflected In The Provision, And The
                                            Other Provisions Of This Agreement
                                            Remain In Full Force And Effect.
                                        </p>
                                        <p>
                                            <li></li>
                                            <span>
                                                Governing Law; Jurisdiction -
                                            </span>{' '}
                                            This Website Originates From The
                                            Bengaluru, Karnataka.. This
                                            Agreement Will Be Governed By The
                                            Laws Of The State Of Karnataka,
                                            India Without Regard To Its Conflict
                                            Of Law Principles To The Contrary.
                                            Neither You Nor Covrzy will Commence
                                            Or Prosecute Any Suit, Proceeding Or
                                            Claim To Enforce The Provisions Of
                                            This Agreement, To Recover Damages
                                            For Breach Of Or Default Of This
                                            Agreement, Or Otherwise Arising
                                            Under Or By Reason Of This
                                            Agreement, Other Than In Courts
                                            Located In State Of Karnataka,
                                            India. By Using This Website Or
                                            Ordering Products, You Consent To
                                            The Jurisdiction And Venue Of Such
                                            Courts In Connection With Any
                                            Action, Suit, Proceeding Or Claim
                                            Arising Under Or By Reason Of This
                                            Agreement. You Hereby Waive Any
                                            Right To Trial By Jury Arising Out
                                            Of This Agreement And Any Related
                                            Documents.
                                        </p>
                                        <p>
                                            <li></li>
                                            <span>
                                                Waiver Of Class Action Rights -
                                            </span>{' '}
                                            By Entering Into This Agreement, You
                                            Hereby Irrevocably Waive Any Right
                                            You May Have To Join Claims With
                                            Those Of Other In The Form Of A
                                            Class Action Or Similar Procedural
                                            Device. Any Claims Arising Out Of,
                                            Relating To, Or Connection With This
                                            Agreement Must Be Asserted
                                            Individually.
                                        </p>
                                        <p>
                                            <li></li>
                                            <span>Termination -</span> Covrzy
                                            Reserves The Right To Terminate Your
                                            Access To The Website If It
                                            Reasonably Believes, In Its Sole
                                            Discretion, That You Have Breached
                                            Any Of The Terms And Conditions Of
                                            This Agreement. Following
                                            Termination, You Will Not Be
                                            Permitted To Use The Website And
                                            Covrzy may, In Its Sole Discretion
                                            And Without Advance Notice To You,
                                            Cancel Any Outstanding Orders For
                                            Products. If Your Access To The
                                            Website Is Terminated, Covrzy
                                            reserves The Right To Exercise
                                            Whatever Means It Deems Necessary To
                                            Prevent Unauthorized Access Of The
                                            Website. This Agreement Will Survive
                                            Indefinitely Unless And Until Covrzy
                                            chooses, In Its Sole Discretion And
                                            Without Advance To You, To Terminate
                                            It.
                                        </p>
                                        <p>
                                            <li></li>
                                            <span>Domestic Use -</span> Covrzy
                                            Makes No Representation That The
                                            Website Or Products Are Appropriate
                                            Or Available For Use In Locations
                                            Outside India. Users Who Access The
                                            Website From Outside India Do So At
                                            Their Own Risk And Initiative And
                                            Must Bear All Responsibility For
                                            Compliance With Any Applicable Local
                                            Laws.
                                        </p>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-12 mb-5">
                                <p>
                                    Assignment. You May Not Assign Your Rights
                                    And Obligations Under This Agreement To
                                    Anyone.Covrzy May Assign Its Rights And
                                    Obligations Under This Agreement In Its Sole
                                    Discretion And Without Advance Notice To
                                    You.
                                </p>
                                <p>
                                    By Using This Website Or Ordering Products
                                    From This Website You Agree To Be Bound By
                                    All Of The Terms And Conditions Of This
                                    Agreement.
                                </p>
                            </div>
                        </ol>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default TermsConditions;
