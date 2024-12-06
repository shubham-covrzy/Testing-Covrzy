import moment from 'moment';
import { HttpStatusMessages } from '../constants/main';

export const phonesRegx: any = {
    374: /^(\+?374|0)((10|[9|7][0-9])\d{6}$|[2-4]\d{7}$)/,
    971: /^((\+?971)|0)?5[024568]\d{7}$/,
    973: /^(\+?973)?(3|6)\d{7}$/,
    213: /^(\+?213|0)(5|6|7)\d{8}$/,
    20: /^((\+?20)|0)?1[0125]\d{8}$/,
    964: /^(\+?964|0)?7[0-9]\d{8}$/,
    962: /^(\+?962|0)?7[789]\d{7}$/,
    965: /^(\+?965)[569]\d{7}$/,
    966: /^(!?(\+?966)|0)?5\d{8}$/,
    963: /^(!?(\+?963)|0)?9\d{8}$/,
    216: /^(\+?216)?[2459]\d{7}$/,
    375: /^(\+?375)?(24|25|29|33|44)\d{7}$/,
    359: /^(\+?359|0)?8[789]\d{7}$/,
    880: /^(\+?880|0)1[13456789][0-9]{8}$/,
    420: /^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
    45: /^(\+?45)?\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/,
    49: /^(\+49)?0?1(5[0-25-9]\d|6([23]|0\d?)|7([0-57-9]|6\d))\d{7}$/,
    43: /^(\+43|0)\d{1,4}\d{3,12}$/,
    30: /^(\+?30|0)?(69\d{8})$/,
    61: /^(\+?61|0)4\d{8}$/,
    44: /^(\+?44|0)7\d{9}$/,
    // GG: /^(\+?44|0)1481\d{6}$/,
    233: /^(\+233|0)(20|50|24|54|27|57|26|56|23|28)\d{7}$/,
    852: /^(\+?852[-\s]?)?[456789]\d{3}[-\s]?\d{4}$/,
    853: /^(\+?853[-\s]?)?[6]\d{3}[-\s]?\d{4}$/,
    353: /^(\+?353|0)8[356789]\d{7}$/,
    91: /^(\+?91|0)?[6789]\d{9}$/,
    254: /^(\+?254|0)(7|1)\d{8}$/,
    356: /^(\+?356|0)?(99|79|77|21|27|22|25)[0-9]{6}$/,
    230: /^(\+?230|0)?\d{8}$/,
    234: /^(\+?234|0)?[789]\d{9}$/,
    64: /^(\+?64|0)[28]\d{7,9}$/,
    92: /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/,
    250: /^(\+?250|0)?[7]\d{8}$/,
    65: /^(\+65)?[89]\d{7}$/,
    94: /^(?:0|94|\+94)?(7(0|1|2|5|6|7|8)( |-)?\d)\d{6}$/,
    255: /^(\+?255|0)?[67]\d{8}$/,
    256: /^(\+?256|0)?[7]\d{8}$/,
    1: /^((\+1|1)?( |-)?)?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})( |-)?([2-9][0-9]{2}( |-)?[0-9]{4})$/,
    27: /^(\+?27|0)\d{9}$/,
    26: /^(\+?26)?09[567]\d{7}$/,
    56: /^(\+?56|0)[2-9]\d{1}\d{7}$/,
    593: /^(\+?593|0)([2-7]|9[2-9])\d{7}$/,
    34: /^(\+?34)?(6\d{1}|7[1234])\d{7}$/,
    52: /^(\+?52)?(1|01)?\d{10,11}$/,
    507: /^(\+?507)\d{7,8}$/,
    595: /^(\+?595|0)9[9876]\d{7}$/,
    598: /^(\+598|0)9[1-9][\d]{6}$/,
    372: /^(\+?372)?\s?(5|8[1-4])\s?([0-9]\s?){6,7}$/,
    98: /^(\+?98[\-\s]?|0)9[0-39]\d[\-\s]?\d{3}[\-\s]?\d{4}$/,
    358: /^(\+?358|0)\s?(4(0|1|2|4|5|6)?|50)\s?(\d\s?){4,8}\d$/,
    679: /^(\+?679)?\s?\d{3}\s?\d{4}$/,
    298: /^(\+?298)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
    33: /^(\+?33|0)[67]\d{8}$/,
    594: /^(\+?594|0|00594)[67]\d{8}$/,
    590: /^(\+?590|0|00590)[67]\d{8}$/,
    596: /^(\+?596|0|00596)[67]\d{8}$/,
    262: /^(\+?262|0|00262)[67]\d{8}$/,
    972: /^(\+972|0)([23489]|5[012345689]|77)[1-9]\d{6}$/,
    36: /^(\+?36)(20|30|70)\d{7}$/,
    62: /^(\+?62|0)8(1[123456789]|2[1238]|3[1238]|5[12356789]|7[78]|9[56789]|8[123456789])([\s?|\d]{5,11})$/,
    39: /^(\+?39)?\s?3\d{2} ?\d{6,7}$/,
    81: /^(\+81[ \-]?(\(0\))?|0)[6789]0[ \-]?\d{4}[ \-]?\d{4}$/,
    // 7: /^(\+?7|8)?7\d{9}$/,
    299: /^(\+?299)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
    82: /^((\+?82)[ \-]?)?0?1([0|1|6|7|8|9]{1})[ \-]?\d{3,4}[ \-]?\d{4}$/,
    370: /^(\+370|8)\d{8}$/,
    60: /^(\+?6?01){1}(([0145]{1}(\-|\s)?\d{7,8})|([236789]{1}(\s|\-)?\d{7}))$/,
    47: /^(\+?47)?[49]\d{7}$/,
    977: /^(\+?977)?9[78]\d{8}$/,
    32: /^(\+?32|0)4?\d{8}$/,
    31: /^(\+?31|0)6?\d{8}$/,
    // NO: /^(\+?47)?[49]\d{7}$/,
    48: /^(\+?48)? ?[5-8]\d ?\d{3} ?\d{2} ?\d{2}$/,
    55: /(?=^(\+?5{2}\-?|0)[1-9]{2}\-?\d{4}\-?\d{4}$)(^(\+?5{2}\-?|0)[1-9]{2}\-?[6-9]{1}\d{3}\-?\d{4}$)|(^(\+?5{2}\-?|0)[1-9]{2}\-?9[6-9]{1}\d{3}\-?\d{4}$)/,
    351: /^(\+?351)?9[1236]\d{7}$/,
    40: /^(\+?4?0)\s?7\d{2}(\/|\s|\.|\-)?\d{3}(\s|\.|\-)?\d{3}$/,
    7: /^(\+?7|8)?9\d{9}$/,
    386: /^(\+386\s?|0)(\d{1}\s?\d{3}\s?\d{2}\s?\d{2}|\d{2}\s?\d{3}\s?\d{3})$/,
    421: /^(\+?421)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
    3816: /^(\+3816|06)[- \d]{5,9}$/,
    46: /^(\+?46|0)[\s\-]?7[\s\-]?[02369]([\s\-]?\d){7}$/,
    66: /^(\+66|66|0)\d{9}$/,
    90: /^(\+?90|0)?5\d{9}$/,
    38: /^(\+?38|8)?0\d{9}$/,
    84: /^(\+?84|0)((3([2-9]))|(5([2689]))|(7([0|6-9]))|(8([1-6|89]))|(9([0-9])))([0-9]{7})$/,
    86: /^((\+|00)86)?1([358][0-9]|4[579]|6[67]|7[01235678]|9[189])[0-9]{8}$/,
    886: /^(\+?886\-?|0)?9\d{8}$/,
};

export const ValidatePhoneNumber = (value: string, country: object | any) => {
    // const valid = value.slice(country?.dialCode?.length).match(phonesRegx[country?.iso2?.toUpperCase()])
    const valid = value
        .slice(country?.dialCode?.length)
        .match(phonesRegx[country?.dialCode]);
    if (valid) return true;
    else return false;
};

export const dateConverter = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
    });
};

export const MinDate = (startDate: string) => {
    return moment(
        new Date(
            new Date(startDate).setFullYear(
                new Date(startDate).getFullYear() + 1,
            ),
        ),
    )
        .subtract(1, 'day')
        .format('YYYY-MM-DD');
};

export function CompareFunction(a: Object | any, b: Object | any, key: string) {
    if (a?.[key] < b?.[key]) return -1;
    if (a?.[key] > b?.[key]) return 1;
    return 0;
}



export const isObjectEmpty = (obj: any) => {
    return obj == null || Object.keys(obj).length === 0;
};

// export const getErrorMessage = (response: any): string => {
//     const defaultMessage = 'An unexpected error occurred. Please try again.';
//     return HttpStatusMessages[response] || defaultMessage;
// };

export const getErrorMessage = (response: any): string => {
    const defaultMessage = 'An unexpected error occurred. Please try again.';

    // Check  validation error
    const validationErrorMessage = response?.data?.errors?.Error?.message;

    const validation =
        response?.data?.errors?.Error?.type === 'ValidationError';

    if (validation) {
        return validationErrorMessage;
    } else {
        // Handle other status codes
        return HttpStatusMessages[response.status] || defaultMessage;
    }
};


export const lunchBotHandler = () => {
    const botEle = document.getElementById('BotPenguin-messenger');
    if (botEle) {
        botEle.style.display = 'block';
    }
};

export const useBotPenguin = (widgetId: string, scriptId: string) => {
    const loadBotPenguin = () => {
        const script = document.createElement('script');
        script.defer = true;
        script.async = true; 
        script.src = `https://cdn.botpenguin.com/website-bot.js`;
        script.id = scriptId;
        script.text = widgetId;
        document.body.appendChild(script);

        // You can add additional functionality here if needed
    };

    return { loadBotPenguin };
};