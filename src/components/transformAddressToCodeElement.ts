////////////////////////////////////////////////////////////////
///
/// バーコードに必要な文字情報の抜き出し法(1/9)
/// https://www.post.japanpost.jp/zipcode/zipmanual/p17.html
///
////////////////////////////////////////////////////////////////
import { kanji2arabicOnAddress } from "./kanji2arabic";

export const transformAddressToCodeElement = (address: string) => {
    const supplementaryRules_1 = kanji2arabicOnAddress(address);

    const phase_1 = supplementaryRules_1.toUpperCase();
    const phase_2 = phase_1.replace(/[&\/・\.]/g, '');
    const phase_3 = phase_2.replace(/[A-Z]{2,}/, '');
    const phase_4 = phase_3.replace(/[^0-9A-Z\-]/, '-');
    const phase_5 = phase_4.replace(/\-{2,}/, '-');
    const phase_6 = phase_5.replace(/^\-/, '');
}