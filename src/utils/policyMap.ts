import fireInsuranceIcon from '../assets/images/fireInsurance.svg';
import stockInsuranceIcon from '../assets/images/stockInsurance.svg';

export const policyIconMap = new Map<string, any>([
    ['CGL Combined Single Limit of Liability', 'comm_gen.svg'],
    ['CGL Product Liability Only', 'prodLiab.svg'],
    ['CYBER LIABILITY', 'cyberIns.svg'],
    ['D And O Basic Cover And Company securities With EPLI', 'DirOff.svg'],
    ['EMPLOYEE DISHONESTY OR CRIME', 'comCrime.svg'],
    ['Fire Insurance', fireInsuranceIcon],
    ['Stock Insurance', stockInsuranceIcon],
]);

export const policyNameMap = new Map<string, string>([
    ['CGL Combined Single Limit of Liability', 'GENERAL LIABILITY'],
    ['CGL Product Liability Only', 'PRODUCT LIABILITY '],
    ['CYBER LIABILITY', 'CYBER LIABILITY'],
    [
        'D And O Basic Cover And Company securities With EPLI',
        'DIRECTORS AND OFFICERS LIABILITY INSURANCE WITH EPLI',
    ],
    ['EMPLOYEE DISHONESTY OR CRIME', 'EMPLOYEE DISHONESTY OR CRIME'],
    ['Fire Insurance', 'FIRE INSURANCE'],
    ['Stock Insurance','STOCK INSURANCE'],
]);
