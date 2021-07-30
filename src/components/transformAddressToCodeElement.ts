////////////////////////////////////////////////////////////////
///
/// バーコードに必要な文字情報の抜き出し法(1/9)
/// https://www.post.japanpost.jp/zipcode/zipmanual/p17.html
///
////////////////////////////////////////////////////////////////
import { kanji2arabicOnAddress } from "./kanji2arabic";

export const transformAddressToCodeElement = (address: string) => {
    const supplementaryRule_1 = kanji2arabicOnAddress(address);

    const rule_1 = supplementaryRule_1.toUpperCase();
    const rule_2 = rule_1.replace(/[&\/・\.]/g, '');
    const rule_3 = rule_2.replace(/[A-Z]{2,}/g, '');

    const supplementaryRule_2_3 = rule_3.replace(/([0-9])F([^F]+?)/g, "$1-$2").replace(/([0-9])F/g, "$1");

    const rule_4 = supplementaryRule_2_3.replace(/[^0-9A-Z\-]/g, '-');
    const rule_5 = rule_4.replace(/\-{2,}/g, '-');
    const rule_6 = rule_5.replace(/^\-/, '');

    const supplementaryRule_4_5 = rule_6.replace(/\-?([A-Z])\-?/g, "$1");

    return supplementaryRule_4_5;
}