////////////////////////////////////////////////////////////////
///
///  バーコードの仕様は郵便局の下記サイトより
///  https://www.post.japanpost.jp/zipcode/zipmanual/index.html
///
////////////////////////////////////////////////////////////////
import { alphabetBars, barShapes, customBars } from './codePatterns';
import { getCheckDigit } from './getCheckDigit';
import { getTargetLayer } from './getTargetLayer';

export const generateCustomerBarcode = (postcode: string, frame: PageItem) => {
    const targetPage = frame.parentPage;
    const targetLayer = getTargetLayer();
    const barWidth = (Number(frame.geometricBounds[3]) - Number(frame.geometricBounds[1])) / 133; //(2 * 2 + 3 * 21) * 2 - 1;
    const barHeight = Number(frame.geometricBounds[2]) - Number(frame.geometricBounds[0]);
    const barPitch = barWidth * 2;
    const top = Number(frame.geometricBounds[0]);
    const left = Number(frame.geometricBounds[1]);

    const codes = (postcode + '_______________').split('').reduce((codes, code) => {
        // A-Zのアルファベットに対する処理
        if (code in alphabetBars) {
            codes.push(...alphabetBars[code]);
        } else if (code in customBars) {
            codes.push(code as CustomBarTypes);
        } else {
            codes.push('CC4');
        }
        return codes;
    }, [] as CustomBarTypes[]).slice(0, 20); // オーバーフロー分を削除する

    codes.unshift('start');

    const patterns = [] as BarShapeTypes[];
    for (let i = 0; i < 21; i++) {
        const code = codes[i];
        if (code in customBars) {
            patterns.push(...customBars[code]);
        } else {
            patterns.push(...customBars['CC4']);
        }
    }
    // push check digit
    const checkDigit = getCheckDigit(codes);
    patterns.push(...customBars[checkDigit])

    // push end digit
    patterns.push(...customBars['stop']);

    patterns.reduce(([top, left], pattern) => {
        const pathItem = targetPage.rectangles.add(targetLayer);
        pathItem.geometricBounds = [
            barShapes[pattern][0] ? top : top + barHeight / 3,
            left,
            barShapes[pattern][2] ? top + barHeight : top + barHeight - barHeight / 3,
            left + barWidth
        ];
        
        const fillColor = app.activeDocument.colors.item('Black');
        pathItem.fillColor = fillColor;
        return [top, left + barPitch];
    }, [top, left]);
}