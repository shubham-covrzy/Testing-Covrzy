import CyberInsPurple from '../../assets/images/CyberInsPurple.svg';
import CyberInsOrnge from '../../assets/images/CyberInsOrnge.svg';
import DireOffPurple from '../../assets/images/DirOffPurple.svg';
import DireOffOrnge from '../../assets/images/DirOffOrnge.svg';
import EmpCrime from '../../assets/images/employeeCrime.svg';
import EmpCrimeOrnge from '../../assets/images/EmployeeCrimeOrnge.svg';

import ProductLia from '../../assets/images/prodLiab.svg';
import ProductOrnge from '../../assets/images/productLiabOrng.svg';

import CommGen from '../../assets/images/cgl-p.svg';
import Commorng from '../../assets/images/cgl-o.svg';
import ProfessionalIndem from '../../assets/images/ProfessionalInd.svg';
import ProfessionalIndOrnge from '../../assets/images/ProfessInOrng.svg';

export const data = [
    {
        category: 'Startup',
        cards: [
            {
                id: 2,
                redirect: '/policy-details/6',
                name: 'Cyber Insurance',
                icon: CyberInsPurple,
                selectedIcon: CyberInsOrnge,
                premium: 50000,
                CoverSI: 50000000,
                policyId: 6,
                desc: 'Cyber Risk Insurance is a sort of insurance protection that aids in preventing financial losses brought on by cyber assaults, data breaches, and other cyber-related occurrences.',
                isPackage: false,
                covered: [
                    {
                        '1': 'Data breaches: Coverage for costs associated with responding to a data breach, such as forensic investigations, credit monitoring for affected customers, and public relations efforts.',
                        '2': 'Business interruption: Coverage for lost income or extra expenses incurred as a result of a cyber- attack or data breach.',
                        '3': 'Cyber extortion: Coverage for costs associated with responding to cyber extortion threats.',
                        '4': 'Third-party liability: Coverage for costs associated with third-party claims, such as lawsuits or regulatory fines, arising from a data breach or cyber attack.',
                        '5': 'Network security liability: Coverage for costs associated with network security breaches, such as unauthorized access or theft of data.',
                        '6': "Media liability: Coverage for costs associated with third-party claims arising from content on a company's website or social media platforms.",
                        '7': 'Cybercrime coverage: Coverage for costs associated with cybercrime, such as identity theft or fraud.',
                        '8': 'Employee training: Coverage for employee training programs to help reduce cyber risk.',
                    },
                ],
                notCovered: [
                    {
                        '1': 'Intentional acts: Cyber risk insurance does not cover losses or damages caused by intentional acts such as fraud, embezzlement, or theft.',
                        '2': 'War or nuclear incidents: Losses or damages resulting from war, nuclear incidents, or acts of terrorism are generally not covered by cyber risk insurance.',
                        '3': 'Loss of data: Many policies do not cover the loss of data or the costs associated with restoring data that is lost or destroyed.',
                        '4': 'Compliance penalties: Cyber risk insurance policies typically do not cover penalties or fines imposed by regulatory bodies for non-compliance with laws or regulations.',
                        '5': 'Business interruption: Some policies do not cover the loss of income or business interruption caused by a cyber attack.',
                        '6': "Reputation damage: Many policies do not cover the costs of repairing damage to a company's reputation following a cyber attack.",
                        '7': 'Third-party claims: Some policies do not cover third-party claims, such as lawsuits brought by customers or clients who may have been affected by a cyber attack.',
                        '8': 'Hardware or software failure: Some policies do not cover losses or damages caused by hardware or software failure, rather than a cyber attack.',
                    },
                ],

                risks: [
                    {
                        riskName: 'CYBER LIABILITY',
                        coverName: 'CYBER LIABILITY',
                    },
                ],
            },
            {
                id: 3,
                redirect: '/policy-details/2',
                name: 'Commercial General Liability Insurance',
                desc: 'General liability insurance is a type of insurance that offers defense against a variety of claims, including claims for bodily harm, property damage, personal injury, and advertising injury.',
                isPackage: false,
                premium: 5000,
                CoverSI: 50000000,

                icon: CommGen,
                covered: [
                    {
                        '1': "Bodily injury: This covers claims arising from injuries to people, such as slip and fall accidents on the business's premises.",
                        '2': 'Property damage: This covers claims arising from damage to third-party property, such as vandalism or fire.',
                        '3': 'Personal injury: This covers claims arising from non-physical injuries, such as defamation or libel.',
                        '4': "Advertising injury: This covers claims arising from the business's advertising activities, such as copyright infringement or false advertising.",
                        '5': 'Legal costs: General liability insurance can cover the costs associated with defending against a liability claim, including legal fees and settlement costs.',
                    },
                ],
                notCovered: [
                    {
                        '1': 'Losses or injuries you cause through your own negligence.',
                        '2': 'Your personal or commercial property.',
                        '3': 'Your personal vehicles or boats',
                        '4': 'Breach of your confidential personal information.',
                        '5': 'Professional services provided to a client.',
                        '6': 'Injuries or disabilities among your own employees.',
                        '7': 'Damage or injuries you intentionally cause.',
                    },
                ],
                selectedIcon: Commorng,
                policyId: 2,
                risks: [
                    {
                        riskName: 'COMPREHENSIVE GENERAL LIABILITY',
                        coverName: 'CGL Combined Single Limit of Liability',
                    },
                ],
            },
            {
                id: 4,
                redirect: '/policy-details/1',
                name: '  Directors and Officers Liability Insurance with EPLI   ',
                icon: DireOffPurple,
                selectedIcon: DireOffOrnge,
                policyId: 1,
                premium: 7000,
                CoverSI: 50000000,

                covered: [
                    {
                        '1': 'Personal Asset Protection: Safeguards personal assets of directors/officers if sued for alleged wrongful acts in their duties.',
                        '2': 'Claims Against the Company: Extends coverage to the organization, indemnifying losses from covered claims against the company.',
                        '3': 'Coverage for Various Claims: Includes mismanagement, breaches of duty, errors, misleading statements, and wrongful termination.',
                        '4': 'Employment Practices Coverage: Some policies protect against claims related to employment issues like discrimination or wrongful termination.',
                        '5': 'Legal Costs: Covers defense expenses, attorney fees, court costs, settlements, and judgments resulting from lawsuits against directors and officers.',
                    },
                ],
                notCovered: [
                    {
                        '1': 'Illegal acts: D&O insurance does not cover illegal acts, such as fraud or embezzlement, that are committed by directors or officers.',
                        '2': 'Prior acts: D&O insurance   generally does not cover legal actions that arise from events or actions that occurred before the policy was in place.',
                        '3': 'Personal profit: D&O insurance  does not cover legal action taken against directors or officers for personal profit or gain.',
                        '4': 'War and terrorism: Many D&O insurance policies exclude coverage for war or terrorism-related events.',
                        '5': 'Physical damage or injury: D&O insurance  generally does not cover physical damage to property or injury to people.',
                    },
                ],
                desc: 'Directors and officers (D&O) liability insurance  with EPLI   is a form of insurance designed to shield people from financial harm in the event that they are sued for their roles as directors or officers of a company or other organization.',
                risks: [
                    {
                        riskName: 'DIRECTORS AND OFFICERS LIABILITY',
                        coverName:
                            'D And O Basic Cover And Company securities With EPLI',
                    },
                ],
            },
        ],
    },
    {
        category: 'Edtech',
        cards: [
            {
                id: 6,
                redirect: '/policy-details/6',
                name: 'Cyber Insurance',
                desc: 'Cyber Risk Insurance is a sort of insurance protection that aids in preventing financial losses brought on by cyber assaults, data breaches, and other cyber-related occurrences.',
                covered: [
                    {
                        '1': 'Data breaches: Coverage for costs associated with responding to a data breach, such as forensic investigations, credit monitoring for affected customers, and public relations efforts.',
                        '2': 'Business interruption: Coverage for lost income or extra expenses incurred as a result of a cyber- attack or data breach.',
                        '3': 'Cyber extortion: Coverage for costs associated with responding to cyber extortion threats.',
                        '4': 'Third-party liability: Coverage for costs associated with third-party claims, such as lawsuits or regulatory fines, arising from a data breach or cyber attack.',
                        '5': 'Network security liability: Coverage for costs associated with network security breaches, such as unauthorized access or theft of data.',
                        '6': "Media liability: Coverage for costs associated with third-party claims arising from content on a company's website or social media platforms.",
                        '7': 'Cybercrime coverage: Coverage for costs associated with cybercrime, such as identity theft or fraud.',
                        '8': 'Employee training: Coverage for employee training programs to help reduce cyber risk.',
                    },
                ],
                notCovered: [
                    {
                        '1': 'Intentional acts: Cyber risk insurance does not cover losses or damages caused by intentional acts such as fraud, embezzlement, or theft.',
                        '2': 'War or nuclear incidents: Losses or damages resulting from war, nuclear incidents, or acts of terrorism are generally not covered by cyber risk insurance.',
                        '3': 'Loss of data: Many policies do not cover the loss of data or the costs associated with restoring data that is lost or destroyed.',
                        '4': 'Compliance penalties: Cyber risk insurance policies typically do not cover penalties or fines imposed by regulatory bodies for non-compliance with laws or regulations.',
                        '5': 'Business interruption: Some policies do not cover the loss of income or business interruption caused by a cyber attack.',
                        '6': "Reputation damage: Many policies do not cover the costs of repairing damage to a company's reputation following a cyber attack.",
                        '7': 'Third-party claims: Some policies do not cover third-party claims, such as lawsuits brought by customers or clients who may have been affected by a cyber attack.',
                        '8': 'Hardware or software failure: Some policies do not cover losses or damages caused by hardware or software failure, rather than a cyber attack.',
                    },
                ],
                isPackage: false,
                icon: CyberInsPurple,
                selectedIcon: CyberInsOrnge,
                premium: 50000,
                CoverSI: 50000000,

                policyId: 6,
                risks: [
                    {
                        riskName: 'CYBER LIABILITY',
                        coverName: 'CYBER LIABILITY',
                    },
                ],
            },
            {
                id: 7,
                redirect: '/policy-details/1',
                name: 'Directors and Officers Liability Insurance with EPLI',
                icon: DireOffPurple,
                selectedIcon: DireOffOrnge,
                policyId: 1,
                premium: 7000,
                CoverSI: 50000000,

                covered: [
                    {
                        '1': 'Personal Asset Protection: Safeguards personal assets of directors/officers if sued for alleged wrongful acts in their duties.',
                        '2': 'Claims Against the Company: Extends coverage to the organization, indemnifying losses from covered claims against the company.',
                        '3': 'Coverage for Various Claims: Includes mismanagement, breaches of duty, errors, misleading statements, and wrongful termination.',
                        '4': 'Employment Practices Coverage: Some policies protect against claims related to employment issues like discrimination or wrongful termination.',
                        '5': 'Legal Costs: Covers defense expenses, attorney fees, court costs, settlements, and judgments resulting from lawsuits against directors and officers.',
                    },
                ],
                notCovered: [
                    {
                        '1': 'Illegal acts: D&O insurance  does not cover illegal acts, such as fraud or embezzlement, that are committed by directors or officers.',
                        '2': 'Prior acts: D&O insurance   generally does not cover legal actions that arise from events or actions that occurred before the policy was in place.',
                        '3': 'Personal profit: D&O insurance   does not cover legal action taken against directors or officers for personal profit or gain.',
                        '4': 'War and terrorism: Many D&O insurance   policies exclude coverage for war or terrorism-related events.',
                        '5': 'Physical damage or injury: D&O insurance  generally does not cover physical damage to property or injury to people.',
                    },
                ],
                desc: 'Directors and officers (D&O) liability insurance  with EPLI   is a form of insurance designed to shield people from financial harm in the event that they are sued for their roles as directors or officers of a company or other organization.',
                risks: [
                    {
                        riskName: 'DIRECTORS AND OFFICERS LIABILITY',
                        coverName:
                            'D And O Basic Cover And Company securities With EPLI',
                    },
                ],
            },
        ],
    },
    {
        category: 'Fintech',
        cards: [
            {
                id: 9,
                redirect: '/policy-details/6',
                name: 'Cyber Insurance',
                desc: 'Cyber Risk Insurance is a sort of insurance protection that aids in preventing financial losses brought on by cyber assaults, data breaches, and other cyber-related occurrences.',
                isPackage: false,
                icon: CyberInsPurple,
                selectedIcon: CyberInsOrnge,
                premium: 50000,
                CoverSI: 50000000,

                policyId: 6,
                covered: [
                    {
                        '1': 'Data breaches: Coverage for costs associated with responding to a data breach, such as forensic investigations, credit monitoring for affected customers, and public relations efforts.',
                        '2': 'Business interruption: Coverage for lost income or extra expenses incurred as a result of a cyber- attack or data breach.',
                        '3': 'Cyber extortion: Coverage for costs associated with responding to cyber extortion threats.',
                        '4': 'Third-party liability: Coverage for costs associated with third-party claims, such as lawsuits or regulatory fines, arising from a data breach or cyber attack.',
                        '5': 'Network security liability: Coverage for costs associated with network security breaches, such as unauthorized access or theft of data.',
                        '6': "Media liability: Coverage for costs associated with third-party claims arising from content on a company's website or social media platforms.",
                        '7': 'Cybercrime coverage: Coverage for costs associated with cybercrime, such as identity theft or fraud.',
                        '8': 'Employee training: Coverage for employee training programs to help reduce cyber risk.',
                    },
                ],
                notCovered: [
                    {
                        '1': 'Intentional acts: Cyber risk insurance does not cover losses or damages caused by intentional acts such as fraud, embezzlement, or theft.',
                        '2': 'War or nuclear incidents: Losses or damages resulting from war, nuclear incidents, or acts of terrorism are generally not covered by cyber risk insurance.',
                        '3': 'Loss of data: Many policies do not cover the loss of data or the costs associated with restoring data that is lost or destroyed.',
                        '4': 'Compliance penalties: Cyber risk insurance policies typically do not cover penalties or fines imposed by regulatory bodies for non-compliance with laws or regulations.',
                        '5': 'Business interruption: Some policies do not cover the loss of income or business interruption caused by a cyber attack.',
                        '6': "Reputation damage: Many policies do not cover the costs of repairing damage to a company's reputation following a cyber attack.",
                        '7': 'Third-party claims: Some policies do not cover third-party claims, such as lawsuits brought by customers or clients who may have been affected by a cyber attack.',
                        '8': 'Hardware or software failure: Some policies do not cover losses or damages caused by hardware or software failure, rather than a cyber attack.',
                    },
                ],
                risks: [
                    {
                        riskName: 'CYBER LIABILITY',
                        coverName: 'CYBER LIABILITY',
                    },
                ],
            },
            {
                id: 10,
                redirect: '/policy-details/1',
                name: 'Directors and Officers Liability Insurance with EPLI',
                icon: DireOffPurple,
                selectedIcon: DireOffOrnge,
                policyId: 1,
                premium: 7000,
                CoverSI: 50000000,

                covered: [
                    {
                        '1': 'Personal Asset Protection: Safeguards personal assets of directors/officers if sued for alleged wrongful acts in their duties.',
                        '2': 'Claims Against the Company: Extends coverage to the organization, indemnifying losses from covered claims against the company.',
                        '3': 'Coverage for Various Claims: Includes mismanagement, breaches of duty, errors, misleading statements, and wrongful termination.',
                        '4': 'Employment Practices Coverage: Some policies protect against claims related to employment issues like discrimination or wrongful termination.',
                        '5': 'Legal Costs: Covers defense expenses, attorney fees, court costs, settlements, and judgments resulting from lawsuits against directors and officers.',
                    },
                ],
                notCovered: [
                    {
                        '1': 'Illegal acts: D&O insurance  does not cover illegal acts, such as fraud or embezzlement, that are committed by directors or officers.',
                        '2': 'Prior acts: D&O insurance generally does not cover legal actions that arise from events or actions that occurred before the policy was in place.',
                        '3': 'Personal profit: D&O insurance   does not cover legal action taken against directors or officers for personal profit or gain.',
                        '4': 'War and terrorism: Many D&O insurance   policies exclude coverage for war or terrorism-related events.',
                        '5': 'Physical damage or injury: D&O insurance   generally does not cover physical damage to property or injury to people.',
                    },
                ],

                desc: 'Directors and officers (D&O) liability insurance  with EPLI   is a form of insurance designed to shield people from financial harm in the event that they are sued for their roles as directors or officers of a company or other organization.',
                risks: [
                    {
                        riskName: 'DIRECTORS AND OFFICERS LIABILITY',
                        coverName:
                            'D And O Basic Cover And Company securities With EPLI',
                    },
                ],
            },
        ],
    },
    {
        category: 'SaaS',
        cards: [
            {
                id: 12,
                redirect: '/policy-details/6',
                name: 'Cyber Insurance',
                icon: CyberInsPurple,
                selectedIcon: CyberInsOrnge,
                premium: 50000,
                CoverSI: 50000000,

                policyId: 6,
                covered: [
                    {
                        '1': 'Data breaches: Coverage for costs associated with responding to a data breach, such as forensic investigations, credit monitoring for affected customers, and public relations efforts.',
                        '2': 'Business interruption: Coverage for lost income or extra expenses incurred as a result of a cyber- attack or data breach.',
                        '3': 'Cyber extortion: Coverage for costs associated with responding to cyber extortion threats.',
                        '4': 'Third-party liability: Coverage for costs associated with third-party claims, such as lawsuits or regulatory fines, arising from a data breach or cyber attack.',
                        '5': 'Network security liability: Coverage for costs associated with network security breaches, such as unauthorized access or theft of data.',
                        '6': "Media liability: Coverage for costs associated with third-party claims arising from content on a company's website or social media platforms.",
                        '7': 'Cybercrime coverage: Coverage for costs associated with cybercrime, such as identity theft or fraud.',
                        '8': 'Employee training: Coverage for employee training programs to help reduce cyber risk.',
                    },
                ],
                notCovered: [
                    {
                        '1': 'Intentional acts: Cyber risk insurance does not cover losses or damages caused by intentional acts such as fraud, embezzlement, or theft.',
                        '2': 'War or nuclear incidents: Losses or damages resulting from war, nuclear incidents, or acts of terrorism are generally not covered by cyber risk insurance.',
                        '3': 'Loss of data: Many policies do not cover the loss of data or the costs associated with restoring data that is lost or destroyed.',
                        '4': 'Compliance penalties: Cyber risk insurance policies typically do not cover penalties or fines imposed by regulatory bodies for non-compliance with laws or regulations.',
                        '5': 'Business interruption: Some policies do not cover the loss of income or business interruption caused by a cyber attack.',
                        '6': "Reputation damage: Many policies do not cover the costs of repairing damage to a company's reputation following a cyber attack.",
                        '7': 'Third-party claims: Some policies do not cover third-party claims, such as lawsuits brought by customers or clients who may have been affected by a cyber attack.',
                        '8': 'Hardware or software failure: Some policies do not cover losses or damages caused by hardware or software failure, rather than a cyber attack.',
                    },
                ],

                desc: 'Cyber Risk Insurance is a sort of insurance protection that aids in preventing financial losses brought on by cyber assaults, data breaches, and other cyber-related occurrences.',
                isPackage: false,
                risks: [
                    {
                        riskName: 'CYBER LIABILITY',
                        coverName: 'CYBER LIABILITY',
                    },
                ],
            },
            {
                id: 13,
                icon: DireOffPurple,
                selectedIcon: DireOffOrnge,
                policyId: 1,
                premium: 7000,
                CoverSI: 50000000,
                redirect: '/policy-details/1',

                covered: [
                    {
                        '1': 'Personal Asset Protection: Safeguards personal assets of directors/officers if sued for alleged wrongful acts in their duties.',
                        '2': 'Claims Against the Company: Extends coverage to the organization, indemnifying losses from covered claims against the company.',
                        '3': 'Coverage for Various Claims: Includes mismanagement, breaches of duty, errors, misleading statements, and wrongful termination.',
                        '4': 'Employment Practices Coverage: Some policies protect against claims related to employment issues like discrimination or wrongful termination.',
                        '5': 'Legal Costs: Covers defense expenses, attorney fees, court costs, settlements, and judgments resulting from lawsuits against directors and officers.',
                    },
                ],
                notCovered: [
                    {
                        '1': 'Illegal acts: D&O insurance   does not cover illegal acts, such as fraud or embezzlement, that are committed by directors or officers.',
                        '2': 'Prior acts: D&O insurance   generally does not cover legal actions that arise from events or actions that occurred before the policy was in place.',
                        '3': 'Personal profit: D&O insurance   does not cover legal action taken against directors or officers for personal profit or gain.',
                        '4': 'War and terrorism: Many D&O insurance  policies exclude coverage for war or terrorism-related events.',
                        '5': 'Physical damage or injury: D&O insurance   generally does not cover physical damage to property or injury to people.',
                    },
                ],
                name: 'Directors and Officers Liability Insurance with EPLI',
                desc: 'Directors and officers (D&O) liability insurance  with EPLI   is a form of insurance designed to shield people from financial harm in the event that they are sued for their roles as directors or officers of a company or other organization.',
                isPackage: false,
                risks: [
                    {
                        riskName: 'DIRECTORS AND OFFICERS LIABILITY',
                        coverName:
                            'D And O Basic Cover And Company securities With EPLI',
                    },
                ],
            },
        ],
    },
    {
        category: 'E-Commerce',
        cards: [
            {
                id: 15,
                redirect: '/policy-details/6',
                name: 'Cyber Insurance',
                icon: CyberInsPurple,
                selectedIcon: CyberInsOrnge,
                premium: 50000,
                CoverSI: 50000000,

                policyId: 6,
                desc: 'Cyber Risk Insurance is a sort of insurance protection that aids in preventing financial losses brought on by cyber assaults, data breaches, and other cyber-related occurrences.',
                isPackage: false,
                covered: [
                    {
                        '1': 'Data breaches: Coverage for costs associated with responding to a data breach, such as forensic investigations, credit monitoring for affected customers, and public relations efforts.',
                        '2': 'Business interruption: Coverage for lost income or extra expenses incurred as a result of a cyber- attack or data breach.',
                        '3': 'Cyber extortion: Coverage for costs associated with responding to cyber extortion threats.',
                        '4': 'Third-party liability: Coverage for costs associated with third-party claims, such as lawsuits or regulatory fines, arising from a data breach or cyber attack.',
                        '5': 'Network security liability: Coverage for costs associated with network security breaches, such as unauthorized access or theft of data.',
                        '6': "Media liability: Coverage for costs associated with third-party claims arising from content on a company's website or social media platforms.",
                        '7': 'Cybercrime coverage: Coverage for costs associated with cybercrime, such as identity theft or fraud.',
                        '8': 'Employee training: Coverage for employee training programs to help reduce cyber risk.',
                    },
                ],
                notCovered: [
                    {
                        '1': 'Intentional acts: Cyber risk insurance does not cover losses or damages caused by intentional acts such as fraud, embezzlement, or theft.',
                        '2': 'War or nuclear incidents: Losses or damages resulting from war, nuclear incidents, or acts of terrorism are generally not covered by cyber risk insurance.',
                        '3': 'Loss of data: Many policies do not cover the loss of data or the costs associated with restoring data that is lost or destroyed.',
                        '4': 'Compliance penalties: Cyber risk insurance policies typically do not cover penalties or fines imposed by regulatory bodies for non-compliance with laws or regulations.',
                        '5': 'Business interruption: Some policies do not cover the loss of income or business interruption caused by a cyber attack.',
                        '6': "Reputation damage: Many policies do not cover the costs of repairing damage to a company's reputation following a cyber attack.",
                        '7': 'Third-party claims: Some policies do not cover third-party claims, such as lawsuits brought by customers or clients who may have been affected by a cyber attack.',
                        '8': 'Hardware or software failure: Some policies do not cover losses or damages caused by hardware or software failure, rather than a cyber attack.',
                    },
                ],
                risks: [
                    {
                        riskName: 'CYBER LIABILITY',
                        coverName: 'CYBER LIABILITY',
                    },
                ],
            },
            {
                id: 16,
                redirect: '/policy-details/2',
                name: 'Commercial General Liability Insurance',
                desc: 'General liability insurance is a type of insurance that offers defense against a variety of claims, including claims for bodily harm, property damage, personal injury, and advertising injury.',
                isPackage: false,
                icon: CommGen,
                selectedIcon: Commorng,
                premium: 5000,
                CoverSI: 50000000,

                policyId: 2,
                covered: [
                    {
                        '1': "Bodily injury: This covers claims arising from injuries to people, such as slip and fall accidents on the business's premises.",
                        '2': 'Property damage: This covers claims arising from damage to third-party property, such as vandalism or fire.',
                        '3': 'Personal injury: This covers claims arising from non-physical injuries, such as defamation or libel.',
                        '4': "Advertising injury: This covers claims arising from the business's advertising activities, such as copyright infringement or false advertising.",
                        '5': 'Legal costs: General liability insurance can cover the costs associated with defending against a liability claim, including legal fees and settlement costs.',
                    },
                ],
                notCovered: [
                    {
                        '1': 'Losses or injuries you cause through your own negligence.',
                        '2': 'Your personal or commercial property.',
                        '3': 'Your personal vehicles or boats',
                        '4': 'Breach of your confidential personal information.',
                        '5': 'Professional services provided to a client.',
                        '6': 'Injuries or disabilities among your own employees.',
                        '7': 'Damage or injuries you intentionally cause.',
                    },
                ],

                risks: [
                    {
                        riskName: 'COMPREHENSIVE GENERAL LIABILITY',
                        coverName: 'CGL Combined Single Limit of Liability',
                    },
                ],
            },
        ],
    },
    {
        category: 'IT Companies',
        cards: [
            {
                id: 18,
                redirect: '/policy-details/6',
                name: 'Cyber Insurance',
                icon: CyberInsPurple,
                selectedIcon: CyberInsOrnge,
                premium: 50000,
                CoverSI: 50000000,

                policyId: 6,
                covered: [
                    {
                        '1': 'Data breaches: Coverage for costs associated with responding to a data breach, such as forensic investigations, credit monitoring for affected customers, and public relations efforts.',
                        '2': 'Business interruption: Coverage for lost income or extra expenses incurred as a result of a cyber- attack or data breach.',
                        '3': 'Cyber extortion: Coverage for costs associated with responding to cyber extortion threats.',
                        '4': 'Third-party liability: Coverage for costs associated with third-party claims, such as lawsuits or regulatory fines, arising from a data breach or cyber attack.',
                        '5': 'Network security liability: Coverage for costs associated with network security breaches, such as unauthorized access or theft of data.',
                        '6': "Media liability: Coverage for costs associated with third-party claims arising from content on a company's website or social media platforms.",
                        '7': 'Cybercrime coverage: Coverage for costs associated with cybercrime, such as identity theft or fraud.',
                        '8': 'Employee training: Coverage for employee training programs to help reduce cyber risk.',
                    },
                ],
                notCovered: [
                    {
                        '1': 'Intentional acts: Cyber risk insurance does not cover losses or damages caused by intentional acts such as fraud, embezzlement, or theft.',
                        '2': 'War or nuclear incidents: Losses or damages resulting from war, nuclear incidents, or acts of terrorism are generally not covered by cyber risk insurance.',
                        '3': 'Loss of data: Many policies do not cover the loss of data or the costs associated with restoring data that is lost or destroyed.',
                        '4': 'Compliance penalties: Cyber risk insurance policies typically do not cover penalties or fines imposed by regulatory bodies for non-compliance with laws or regulations.',
                        '5': 'Business interruption: Some policies do not cover the loss of income or business interruption caused by a cyber attack.',
                        '6': "Reputation damage: Many policies do not cover the costs of repairing damage to a company's reputation following a cyber attack.",
                        '7': 'Third-party claims: Some policies do not cover third-party claims, such as lawsuits brought by customers or clients who may have been affected by a cyber attack.',
                        '8': 'Hardware or software failure: Some policies do not cover losses or damages caused by hardware or software failure, rather than a cyber attack.',
                    },
                ],
                desc: 'Cyber Risk Insurance is a sort of insurance protection that aids in preventing financial losses brought on by cyber assaults, data breaches, and other cyber-related occurrences.',
                isPackage: false,
                risks: [
                    {
                        riskName: 'CYBER LIABILITY',
                        coverName: 'CYBER LIABILITY',
                    },
                ],
            },
            {
                id: 19,
                redirect: '/policy-details/1',
                name: 'Directors and Officers Liability Insurance with EPLI',
                icon: DireOffPurple,
                selectedIcon: DireOffOrnge,
                policyId: 1,
                premium: 7000,
                CoverSI: 50000000,

                covered: [
                    {
                        '1': 'Personal Asset Protection: Safeguards personal assets of directors/officers if sued for alleged wrongful acts in their duties.',
                        '2': 'Claims Against the Company: Extends coverage to the organization, indemnifying losses from covered claims against the company.',
                        '3': 'Coverage for Various Claims: Includes mismanagement, breaches of duty, errors, misleading statements, and wrongful termination.',
                        '4': 'Employment Practices Coverage: Some policies protect against claims related to employment issues like discrimination or wrongful termination.',
                        '5': 'Legal Costs: Covers defense expenses, attorney fees, court costs, settlements, and judgments resulting from lawsuits against directors and officers.',
                    },
                ],
                notCovered: [
                    {
                        '1': 'Illegal acts: D&O insurance   does not cover illegal acts, such as fraud or embezzlement, that are committed by directors or officers.',
                        '2': 'Prior acts: D&O insurance   generally does not cover legal actions that arise from events or actions that occurred before the policy was in place.',
                        '3': 'Personal profit: D&O insurance   does not cover legal action taken against directors or officers for personal profit or gain.',
                        '4': 'War and terrorism: Many D&O insurance   policies exclude coverage for war or terrorism-related events.',
                        '5': 'Physical damage or injury: D&O insurance   generally does not cover physical damage to property or injury to people.',
                    },
                ],
                desc: 'Directors and officers (D&O) liability insurance  with EPLI   is a form of insurance designed to shield people from financial harm in the event that they are sued for their roles as directors or officers of a company or other organization.',
                isPackage: false,
                risks: [
                    {
                        riskName: 'DIRECTORS AND OFFICERS LIABILITY',
                        coverName:
                            'D And O Basic Cover And Company securities With EPLI',
                    },
                ],
            },
        ],
    },
    {
        category: 'Others',
        cards: [
            {
                id: 20,
                redirect: '/policy-details/9',
                name: 'CGL Product Liability Only',
                icon: ProductLia,
                premium: 5000,
                CoverSI: 50000000,
                selectedIcon: ProductOrnge,

                desc: 'It is a type of insurance that protects companies from the financial loss that could occur if a product they sell causes harm to a consumer or property damage. ',
                isPackage: false,

                policyId: 9,
                covered: [
                    {
                        '1': 'Legal defense costs: If a lawsuit is filed against the company for damages caused by its product, the insurance covers the cost of legal defense.',
                        '2': 'Damages or settlements: If the company is found liable for damages caused by its product, the insurance pays for any damages or settlements up to the policy limits.',
                        '3': 'Reputation protection: In case of negative publicity from a product-related incident, the insurance can help mitigate reputation damage.',
                    },
                ],
                notCovered: [
                    {
                        '1': 'Intentional or criminal acts: If a company knowingly sells a defective product or engages in illegal activity, the insurance will not cover the resulting damages.',
                        '2': 'Damages outside policy limits: If the damages caused by a product exceed the policy limits, the insurance will not cover the excess amount.',
                        '3': 'Products not covered by the policy: Some products may not be covered by the policy, such as products that are illegal or outside the scope of the policy.',
                        '4': 'False advertising or misrepresentation: If a company makes false or misleading claims about a product, the insurance will not cover any damages that result from these actions.',
                    },
                ],

                risks: [
                    {
                        riskName: 'COMPREHENSIVE GENERAL LIABILITY',
                        coverName: 'CGL Product Liability Only',
                    },
                ],
            },
            {
                id: 21,
                redirect: '/policy-details/5',
                name: ' Employee  Dishonesty Or Crime',
                desc: 'It is an insurance policy that protects a business from direct financial losses resulting from criminal acts such as theft, embezzlement, forgery, or fraud done by an employee alone or in collision by a third-party.',
                icon: EmpCrime,
                policyId: 5,
                selectedIcon: EmpCrimeOrnge,
                isPackage: false,
                covered: [
                    {
                        '1': 'Internal Crime (committed by employee) covers loss of securities, money by theft or forgery by the employee of the company acting alone or in collusion with others.',
                        '2': "External Crime (committed by a third party) includes acts of Theft: losses of money, securities whether from the insured's premises or during transit.",
                        '3': "External Crime (committed by a third party) includes acts of Forgery like signing of another natural person's name or the endorsing or amending without authority, of any cheque, draft, promissory note or bill of exchange or other Financial Instrument given or received by an Insured with the intent to deceive.",
                    },
                ],
                notCovered: [
                    {
                        '1': "The policy does not cover loss involving any person who, at the time of committing an act, owns or controls more than 20% of the Insured's issued share capital.",
                        '2': 'Any loss arising due to an employee with a history of performing fraudulent acts and is still employed.',
                        '3': 'Losses caused by civil war or rebellions.',
                    },
                ],
                risks: [
                    {
                        riskName: 'EMPLOYEE DISHONESTY OR CRIME',
                        coverName: 'EMPLOYEE DISHONESTY OR CRIME',
                    },
                ],
            },
            {
                id: 22,
                redirect: '/policy-details/4',
                name: 'Professional Indemnity Insurance',
                desc: 'Professional Indemnity (PI) insurance is a type of liability insurance that helps protect professionals from financial losses resulting from claims of negligence, errors, or omissions in the performance of their professional services. ',
                icon: ProfessionalIndem,
                policyId: 4,
                selectedIcon: ProfessionalIndOrnge,
                isPackage: false,
                covered: [
                    {
                        '1': 'Legal defense costs: If a claim is made against the insured professional.',
                        '2': 'Settlement or judgment costs: If the claim results in a settlement or judgment against the insured professional.',
                        '3': 'Damages: The insurance can also cover damages that the insured professional is liable for, such as compensation for loss or injury.',
                        '4': 'Costs of rectifying the mistake: If the professional is found liable for a mistake that can be rectified.',
                        '5': "Loss of documents or data: If a client's documents or data are lost or damaged during the course of the professional's work, the insurance can help cover the costs of replacing or restoring them.",
                        '6': "Loss of client's money or securities: If the professional is found liable for losing or mismanaging the client's money or securities.",
                    },
                ],
                notCovered: [
                    {
                        '1': 'Criminal or fraudulent acts: If the insured professional is found guilty of a criminal or fraudulent act, the insurance may not cover the costs associated with that act.',
                        '2': 'Bodily injury or property damage: While some policies may provide limited coverage for bodily injury or property damage, most Professional Indemnity insurance policies do not.',
                        '3': 'Loss of profits or revenue: The insurance typically does not cover loss of profits or revenue resulting from a claim.',
                        '4': 'Punitive or exemplary damages: Punitive or exemplary damages are not covered by insurance.',
                        '5': 'Claims arising from work done prior to the inception of the policy.',
                        '6': "Claims arising from work done outside of the policy's geographical limits",
                        '7': "Claims arising from work done outside of the policy's specified industries or services.",
                    },
                ],
                risks: [
                    {
                        riskName: 'PROFESSIONAL INDEMNITY',
                        coverName: 'PROFESSIONAL INDEMNITY',
                    },
                ],
            },
        ],
    },
];

export const dataMap: any = {
    'CYBER LIABILITY': {
        id: 2,
        redirect: '/policy-details/6',
        name: 'Cyber Insurance',
        riskName: 'CYBER LIABILITY',
        icon: CyberInsPurple,
        selectedIcon: CyberInsOrnge,
        premium: 50000,
        CoverSI: 50000000,
        policyId: 6,
        desc: 'Cyber Risk Insurance is a sort of insurance protection that aids in preventing financial losses brought on by cyber assaults, data breaches, and other cyber-related occurrences.',
        isPackage: false,
        covered: [
            {
                '1': 'Data breaches: Coverage for costs associated with responding to a data breach, such as forensic investigations, credit monitoring for affected customers, and public relations efforts.',
                '2': 'Business interruption: Coverage for lost income or extra expenses incurred as a result of a cyber- attack or data breach.',
                '3': 'Cyber extortion: Coverage for costs associated with responding to cyber extortion threats.',
                '4': 'Third-party liability: Coverage for costs associated with third-party claims, such as lawsuits or regulatory fines, arising from a data breach or cyber attack.',
                '5': 'Network security liability: Coverage for costs associated with network security breaches, such as unauthorized access or theft of data.',
                '6': "Media liability: Coverage for costs associated with third-party claims arising from content on a company's website or social media platforms.",
                '7': 'Cybercrime coverage: Coverage for costs associated with cybercrime, such as identity theft or fraud.',
                '8': 'Employee training: Coverage for employee training programs to help reduce cyber risk.',
            },
        ],
        notCovered: [
            {
                '1': 'Intentional acts: Cyber risk insurance does not cover losses or damages caused by intentional acts such as fraud, embezzlement, or theft.',
                '2': 'War or nuclear incidents: Losses or damages resulting from war, nuclear incidents, or acts of terrorism are generally not covered by cyber risk insurance.',
                '3': 'Loss of data: Many policies do not cover the loss of data or the costs associated with restoring data that is lost or destroyed.',
                '4': 'Compliance penalties: Cyber risk insurance policies typically do not cover penalties or fines imposed by regulatory bodies for non-compliance with laws or regulations.',
                '5': 'Business interruption: Some policies do not cover the loss of income or business interruption caused by a cyber attack.',
                '6': "Reputation damage: Many policies do not cover the costs of repairing damage to a company's reputation following a cyber attack.",
                '7': 'Third-party claims: Some policies do not cover third-party claims, such as lawsuits brought by customers or clients who may have been affected by a cyber attack.',
                '8': 'Hardware or software failure: Some policies do not cover losses or damages caused by hardware or software failure, rather than a cyber attack.',
            },
        ],
        risks: [
            {
                riskName: 'CYBER LIABILITY',
                coverName: 'CYBER LIABILITY',
            },
        ],
    },
    'CGL Combined Single Limit of Liability': {
        id: 3,
        redirect: '/policy-details/2',
        name: 'Commercial General Liability Insurance',
        riskName: 'COMPREHENSIVE GENERAL LIABILITY',
        desc: 'General liability insurance is a type of insurance that offers defense against a variety of claims, including claims for bodily harm, property damage, personal injury, and advertising injury.',
        isPackage: false,
        icon: CommGen,
        covered: [
            {
                '1': "Bodily injury: This covers claims arising from injuries to people, such as slip and fall accidents on the business's premises.",
                '2': 'Property damage: This covers claims arising from damage to third-party property, such as vandalism or fire.',
                '3': 'Personal injury: This covers claims arising from non-physical injuries, such as defamation or libel.',
                '4': "Advertising injury: This covers claims arising from the business's advertising activities, such as copyright infringement or false advertising.",
                '5': 'Legal costs: General liability insurance can cover the costs associated with defending against a liability claim, including legal fees and settlement costs.',
            },
        ],
        notCovered: [
            {
                '1': 'Losses or injuries you cause through your own negligence.',
                '2': 'Your personal or commercial property.',
                '3': 'Your personal vehicles or boats',
                '4': 'Breach of your confidential personal information.',
                '5': 'Professional services provided to a client.',
                '6': 'Injuries or disabilities among your own employees.',
                '7': 'Damage or injuries you intentionally cause.',
            },
        ],
        selectedIcon: Commorng,
        policyId: 2,
        premium: 5000,
        CoverSI: 50000000,

        risks: [
            {
                riskName: 'COMPREHENSIVE GENERAL LIABILITY',
                coverName: 'CGL Combined Single Limit of Liability',
            },
        ],
    },
    'D And O Basic Cover And Company securities With EPLI': {
        id: 4,
        redirect: '/policy-details/1',
        name: 'Directors and Officers Liability Insurance with EPLI',
        riskName: 'DIRECTORS AND OFFICERS LIABILITY',
        icon: DireOffPurple,
        selectedIcon: DireOffOrnge,
        policyId: 1,
        covered: [
            {
                '1': 'Personal Asset Protection: Safeguards personal assets of directors/officers if sued for alleged wrongful acts in their duties.',
                '2': 'Claims Against the Company: Extends coverage to the organization, indemnifying losses from covered claims against the company.',
                '3': 'Coverage for Various Claims: Includes mismanagement, breaches of duty, errors, misleading statements, and wrongful termination.',
                '4': 'Employment Practices Coverage: Some policies protect against claims related to employment issues like discrimination or wrongful termination.',
                '5': 'Legal Costs: Covers defense expenses, attorney fees, court costs, settlements, and judgments resulting from lawsuits against directors and officers.',
            },
        ],
        notCovered: [
            {
                '1': 'Illegal acts: D&O insurance   does not cover illegal acts, such as fraud or embezzlement, that are committed by directors or officers.',
                '2': 'Prior acts: D&O insurance   generally does not cover legal actions that arise from events or actions that occurred before the policy was in place.',
                '3': 'Personal profit: D&O insurance   does not cover legal action taken against directors or officers for personal profit or gain.',
                '4': 'War and terrorism: Many D&O insurance  policies exclude coverage for war or terrorism-related events.',
                '5': 'Physical damage or injury: D&O insurance   generally does not cover physical damage to property or injury to people.',
            },
        ],
        desc: 'Directors and officers (D&O) liability insurance  with EPLI   is a form of insurance designed to shield people from financial harm in the event that they are sued for their roles as directors or officers of a company or other organization.',
        risks: [
            {
                riskName: 'DIRECTORS AND OFFICERS LIABILITY',
                coverName:
                    'D And O Basic Cover And Company securities With EPLI',
            },
        ],
    },
    'CGL Product Liability Only': {
        id: 20,
        redirect: '/policy-details/9',
        name: 'CGL Product Liability Only',
        riskName: 'COMPREHENSIVE GENERAL LIABILITY',
        icon: ProductLia,
        desc: 'It is a type of insurance that protects companies from the financial loss that could occur if a product they sell causes harm to a consumer or property damage. ',
        isPackage: false,
        selectedIcon: ProductOrnge,
        premium: 5000,
        CoverSI: 50000000,

        policyId: 9,
        covered: [
            {
                '1': 'Legal defense costs: If a lawsuit is filed against the company for damages caused by its product, the insurance covers the cost of legal defense.',
                '2': 'Damages or settlements: If the company is found liable for damages caused by its product, the insurance pays for any damages or settlements up to the policy limits.',
                '3': 'Reputation protection: In case of negative publicity from a product-related incident, the insurance can help mitigate reputation damage.',
            },
        ],
        notCovered: [
            {
                '1': 'Intentional or criminal acts: If a company knowingly sells a defective product or engages in illegal activity, the insurance will not cover the resulting damages.',
                '2': 'Damages outside policy limits: If the damages caused by a product exceed the policy limits, the insurance will not cover the excess amount.',
                '3': 'Products not covered by the policy: Some products may not be covered by the policy, such as products that are illegal or outside the scope of the policy.',
                '4': 'False advertising or misrepresentation: If a company makes false or misleading claims about a product, the insurance will not cover any damages that result from these actions.',
            },
        ],

        risks: [
            {
                riskName: 'COMPREHENSIVE GENERAL LIABILITY',
                coverName: 'CGL Product Liability',
            },
        ],
    },
    'EMPLOYEE DISHONESTY OR CRIME': {
        id: 21,
        redirect: '/policy-details/5',
        name: 'Employee  Dishonesty Or Crime',
        riskName: 'EMPLOYEE DISHONESTY OR CRIME',
        desc: 'It is an insurance policy that protects a business from direct financial losses resulting from criminal acts such as theft, embezzlement, forgery, or fraud done by an employee alone or in collision by a third-party.',
        icon: EmpCrime,
        policyId: 5,
        selectedIcon: EmpCrimeOrnge,
        CoverSI: 50000000,

        isPackage: false,
        covered: [
            {
                '1': 'Internal Crime (committed by employee) covers loss of securities, money by theft or forgery by the employee of the company acting alone or in collusion with others.',
                '2': "External Crime (committed by a third party) includes acts of Theft: losses of money, securities whether from the insured's premises or during transit.",
                '3': "External Crime (committed by a third party) includes acts of Forgery like signing of another natural person's name or the endorsing or amending without authority, of any cheque, draft, promissory note or bill of exchange or other Financial Instrument given or received by an Insured with the intent to deceive.",
            },
        ],
        notCovered: [
            {
                '1': "The policy does not cover loss involving any person who, at the time of committing an act, owns or controls more than 20% of the Insured's issued share capital.",
                '2': 'Any loss arising due to an employee with a history of performing fraudulent acts and is still employed.',
                '3': 'Losses caused by civil war or rebellions.',
            },
        ],
        risks: [
            {
                riskName: 'EMPLOYEE DISHONESTY OR CRIME',
                coverName: 'EMPLOYEE DISHONESTY OR CRIME',
            },
        ],
    },
    'PROFESSIONAL INDEMNITY': {
        id: 22,
        redirect: '/policy-details/4',
        riskName: 'PROFESSIONAL INDEMNITY',
        name: 'Professional Indemnity Insurance',
        desc: 'Professional Indemnity (PI) insurance is a type of liability insurance that helps protect professionals from financial losses resulting from claims of negligence, errors, or omissions in the performance of their professional services. ',
        icon: ProfessionalIndem,
        policyId: 4,
        selectedIcon: ProfessionalIndOrnge,
        CoverSI: 50000000,

        isPackage: false,
        covered: [
            {
                '1': 'Legal defense costs: If a claim is made against the insured professional.',
                '2': 'Settlement or judgment costs: If the claim results in a settlement or judgment against the insured professional.',
                '3': 'Damages: The insurance can also cover damages that the insured professional is liable for, such as compensation for loss or injury.',
                '4': 'Costs of rectifying the mistake: If the professional is found liable for a mistake that can be rectified.',
                '5': "Loss of documents or data: If a client's documents or data are lost or damaged during the course of the professional's work, the insurance can help cover the costs of replacing or restoring them.",
                '6': "Loss of client's money or securities: If the professional is found liable for losing or mismanaging the client's money or securities.",
            },
        ],
        notCovered: [
            {
                '1': 'Criminal or fraudulent acts: If the insured professional is found guilty of a criminal or fraudulent act, the insurance may not cover the costs associated with that act.',
                '2': 'Bodily injury or property damage: While some policies may provide limited coverage for bodily injury or property damage, most Professional Indemnity insurance policies do not.',
                '3': 'Loss of profits or revenue: The insurance typically does not cover loss of profits or revenue resulting from a claim.',
                '4': 'Punitive or exemplary damages: Punitive or exemplary damages are not covered by insurance.',
                '5': 'Claims arising from work done prior to the inception of the policy.',
                '6': "Claims arising from work done outside of the policy's geographical limits",
                '7': "Claims arising from work done outside of the policy's specified industries or services.",
            },
        ],
        risks: [
            {
                riskName: 'PROFESSIONAL INDEMNITY',
                coverName: 'PROFESSIONAL INDEMNITY',
            },
        ],
    },
};
