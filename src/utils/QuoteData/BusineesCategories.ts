import InvestorIcon from '../../assets/images/investor-icon.svg';
import EdTechIcon from '../../assets/images/edtech.svg';
import FinTechPurple from '../../assets/images/fintechPurple.svg';
import ECommerceIcon from '../../assets/images/Ecom purple.svg';
import SaasIcon from '../../assets/images/SaaSPurple.svg';
import ConsumerTechIcon from '../../assets/images/ConsumerTech.svg';
import D2CIcon from '../../assets/images/D2C.svg';
import OtherStartUp from '../../assets/images/other-startups-icon.svg';

import RealEstateIcon from '../../assets/images/RealEstate.svg';
import AgricultureIcon from '../../assets/images/agriculture-icon.svg';
import BankingIcon from '../../assets/images/banking-icon.svg';
import EducationalServicesIcon from '../../assets/images/educational-service-icon.svg';
import WarehouseIcon from '../../assets/images/Warehousing.svg';
import HospitalCareIcon from '../../assets/images/HealthCare.svg';
import ManufacturingIcon from '../../assets/images/manufacture.svg';
import ProfessionalScientificIcon from '../../assets/images/Scientific-Technic.svg';
import UtilitiesIcon from '../../assets/images/Utilities.svg';
import MiningConstructionIcon from '../../assets/images/Mining-construction.svg';
import OtherSmeIcon from '../../assets/images/other-sme-icon.svg';

export const oldStartupCategories = [
    'Investor',
    'EdTech',
    'FinTech',
    'E-Commerce',
    'SaaS',
    'Consumer Tech',
    'D2C',
    'Other startup',
];

export const businessCategories = [
    {
        id: 1,
        icon: InvestorIcon,
        name: 'Investor',
        businessType: 'startup',
    },
    {
        id: 2,
        icon: EdTechIcon,
        name: 'EdTech',
        businessType: 'startup',
    },
    {
        id: 3,
        icon: FinTechPurple,
        name: 'FinTech',
        businessType: 'startup',
    },
    {
        id: 4,
        icon: ECommerceIcon,
        name: 'E-Commerce',
        businessType: 'startup',
    },
    {
        id: 5,
        icon: SaasIcon,
        name: 'SaaS',
        businessType: 'startup',
    },
    {
        id: 6,
        icon: ConsumerTechIcon,
        name: 'Consumer Tech',
        businessType: 'startup',
    },
    {
        id: 7,
        icon: D2CIcon,
        name: 'D2C',
        businessType: 'startup',
    },

    {
        id: 1,
        name: 'Agriculture, Forestry, Fishing & Hunting',
        icon: AgricultureIcon,
        businessType: 'sme',
    },
    {
        id: 2,
        name: 'Mining and Construction',
        icon: MiningConstructionIcon,
        businessType: 'sme',
    },
    {
        id: 3,
        name: 'Utilities',
        icon: UtilitiesIcon,
        businessType: 'sme',
    },
    {
        id: 4,
        name: 'Manufacturing (incl Retailers and Brokers)',
        icon: ManufacturingIcon,
        businessType: 'sme',
    },
    {
        id: 5,
        name: 'Real Estate, Rental and Leasing',
        icon: RealEstateIcon,
        businessType: 'sme',
    },
    {
        id: 6,
        name: 'Professional, Scientific and Technical Services',
        icon: ProfessionalScientificIcon,
        businessType: 'sme',
    },
    {
        id: 7,
        name: 'Banking, Finance and Insurance',
        icon: BankingIcon,
        businessType: 'sme',
    },
    {
        id: 8,
        name: 'Educational Services',
        icon: EducationalServicesIcon,
        businessType: 'sme',
    },
    {
        id: 9,
        name: 'Transportation and Warehousing',
        icon: WarehouseIcon,
        businessType: 'sme',
    },
    {
        id: 10,
        name: 'Health Care and Social Assistance',
        icon: HospitalCareIcon,
        businessType: 'sme',
    },
    {
        id: 11,
        name: 'Other SME',
        icon: OtherSmeIcon,
        businessType: 'sme',
    },
    {
        id: 8,
        icon: OtherStartUp,
        name: 'Other startup',
        businessType: 'startup',
    },
];

// export const smeCategories = [
//   "Agriculture, Forestry, Fishing & Hunting",
//   "Mining and Construction",
//   "Utilities",
//   "Manufacturing (incl Retailers and Brokers)",
//   "Real Estate, Rental and Leasing",
//   "Professional, Scientific and Technical Services",
//   "Banking, Finance and Insurance",
//   "Educational Services",
//   "Transportation and Warehousing",
//   "Health Care and Social Assistance",
//   "Other SME",
// ];

// const startupOptions = startupCategories.map((category, index) => ({
//   id: index + 1,
//   option: category,
//   category: "startup",
// }));

// const smeOptions = smeCategories.map((category, index) => ({
//   id: startupCategories.length + index + 1,
//   option: category,
//   category: "sme",
// }));

// const options = [...startupOptions, ...smeOptions];

// export default options;
