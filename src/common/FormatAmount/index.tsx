export function formatAmount(amount: any) {
    if (amount === undefined || amount === null) {
        return ''; // or any default value you prefer
    }

    const crore = 10000000; // 1 crore
    const lakh = 100000; // 1 lakh
    const thousand = 1000; // 1 thousand

    if (amount >= crore) {
        const crorePart = Math.floor(amount / crore);
        const remaining = amount % crore;
        const lakhPart = Math.floor(remaining / lakh);
        const thousandPart = Math.floor((remaining % lakh) / thousand);
        return `₹  ${crorePart} Crore${
            lakhPart > 0 ? `₹  ${lakhPart} lakh` : ''
        }${thousandPart > 0 ? `₹ ${thousandPart} thousand` : ''}`;
    } else if (amount >= lakh) {
        const lakhPart = Math.floor(amount / lakh);
        const thousandPart = Math.floor((amount % lakh) / thousand);
        return `₹ ${lakhPart} lakh${
            thousandPart > 0 ? `₹ ${thousandPart} thousand` : ''
        }`;
    } else if (amount >= thousand) {
        const thousandPart = Math.floor(amount / thousand);
        return `₹  ${thousandPart} thousand`;
    } else {
        return amount.toString();
    }
}
