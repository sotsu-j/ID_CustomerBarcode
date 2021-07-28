////////////////////////////////////////////////////////////////
///
///  バーコードの仕様は郵便局の下記サイトより
///  https://www.post.japanpost.jp/zipcode/zipmanual/index.html
///
////////////////////////////////////////////////////////////////
import { getCheckDigit } from './getCheckDigit';
import { getTargetLayer } from './getTargetLayer';

const barShapes: { [K in BarShapeTypes]: [boolean, boolean, boolean] } & Object = {
    'full': [true, true, true],     // 1
    'upper': [true, true, false],   // 2
    'lower': [false, true, true],   // 3
    'middle': [false, true, false], // 4
}

const customBars: { [K in CustomBarTypes]: BarShapeTypes[] } & Object = {
    // number
    '1': ['full', 'full', 'middle'],    // 114
    '2': ['full', 'lower', 'upper'],    // 132
    '3': ['lower', 'full', 'upper'],    // 312
    '4': ['full', 'upper', 'lower'],    // 123
    '5': ['full', 'middle', 'full'],    // 141
    '6': ['lower', 'upper', 'full'],    // 321
    '7': ['upper', 'full', 'lower'],    // 213
    '8': ['upper', 'lower', 'full'],    // 231
    '9': ['middle', 'full', 'full'],    // 411
    '0': ['full', 'middle', 'middle'],  // 144
    // cc
    '-': ['middle', 'full', 'middle'],  // 414
    'CC1': ['lower', 'upper', 'middle'],// 324
    'CC2': ['lower', 'middle', 'upper'],// 342
    'CC3': ['upper', 'lower', 'middle'],// 234
    'CC4': ['middle', 'lower', 'upper'],// 432
    'CC5': ['upper', 'middle', 'lower'],// 243
    'CC6': ['middle', 'upper', 'lower'],// 423
    'CC7': ['middle', 'middle', 'full'],// 441
    'CC8': ['full', 'full', 'full'],    // 111
    // start & stop
    'start': ['full', 'lower'],         // 13
    'stop': ['lower', 'full'],          // 31
}

const alphabetBars: { [key: string]: CustomBarTypes[] } = {
    'A': ['CC1', '0'],
}

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