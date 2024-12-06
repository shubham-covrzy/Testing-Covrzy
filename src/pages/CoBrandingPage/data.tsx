// Why Us images
import Whyus1 from '../../assets/images/cobrandingpage/whyus/1.png';
import Whyus2 from '../../assets/images/cobrandingpage/whyus/2.png';
import Whyus3 from '../../assets/images/cobrandingpage/whyus/3.png';
import Whyus4 from '../../assets/images/cobrandingpage/whyus/4.png';

// Insurers We Work With images
import Insurer1 from '../../assets/images/cobrandingpage/insurers/bajaj.svg'
import Insurer2 from '../../assets/images/cobrandingpage/insurers/care.svg'
import Insurer3 from '../../assets/images/cobrandingpage/insurers/digit.svg'
import Insurer4 from '../../assets/images/cobrandingpage/insurers/icicilombard.svg'
import Insurer5 from '../../assets/images/cobrandingpage/insurers/reliance.svg'


export const whyUs = [
    { id: 1, img: Whyus1, alt: "Affordablessss", text: "Affordable" },
    { id: 2, img: Whyus2, alt: "Dedicated relationship manager", text: "Dedicated relationship manager" },
    { id: 3, img: Whyus3, alt: "Customized policies", text: "Customized policies" },
    { id: 4, img: Whyus4, alt: "24x7 Claim assistance", text: "24x7 Claim assistance" },
]




export interface Iinsurance {
    id: number;
    logo: string;
    alt: string;
    ht: number;
};

export const InsurerData: Iinsurance[] = [
    { id: 1, logo: Insurer1, ht: 65, alt: "Bajaj Allianz" },
    { id: 2, logo: Insurer2, ht: 65, alt: "Care" },
    { id: 3, logo: Insurer3, ht: 65, alt: "Digit" },
    { id: 4, logo: Insurer4, ht: 65, alt: "ICICI Lombard" },
    { id: 5, logo: Insurer5, ht: 65, alt: "Reliance General Insurance" },
]


// api fetch type 
export interface Image {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    url: string;
}

export interface Benefit {
    id: number;
    text: string;
    tag: string | null;
    img: Image;
}
export interface Offer {
    id: number;
    list: string;
}


export interface CompanyTrustUs {
    id: number;
    images: Image;
}

export interface CobrandData {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    metatitle: string;
    metadescription: string;
    metakeywords: string;
    mainheading: string;
    mainpara: string;
    mainbenefits: string;
    slug: string;
    offerlistHead: string;
    companylogo: Image;
    benefits: Benefit[];
    companiesthrustus: CompanyTrustUs[];
    offers: Offer[];
}

export interface APIResponse {
    data: CobrandData[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

