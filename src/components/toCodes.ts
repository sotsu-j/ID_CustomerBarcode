////////////////////////////////////////////////////////////////
///
///  バーコードの仕様は郵便局の下記サイトより
///  https://www.post.japanpost.jp/zipcode/zipmanual/index.html
///
////////////////////////////////////////////////////////////////
import { alphabetPatterns, customBars } from './codePatterns';
import { getCheckDigit } from './getCheckDigit';

export const toCodes = (postcode: string) => {
    const codes = (postcode + '_______________').split('').reduce((codes, code) => {
        // A-Zのアルファベットに対する処理
        if (code in alphabetPatterns) {
            codes.push(...alphabetPatterns[code]);
        } else if (code in customBars) {
            codes.push(code as CustomBarTypes);
        } else {
            codes.push('CC4');
        }
        return codes;
    }, [] as CustomBarTypes[]).slice(0, 20); // オーバーフロー分を削除する

    // unshift start digit
    codes.unshift('start');
    
    // push check digit
    const checkDigit = getCheckDigit(codes);
    codes.push(checkDigit);

    // push end digit
    codes.push('stop');

    return codes;
}