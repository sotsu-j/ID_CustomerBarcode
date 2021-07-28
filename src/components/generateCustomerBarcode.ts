////////////////////////////////////////////////////////////////
///
///  バーコードの仕様は郵便局の下記サイトより
///  https://www.post.japanpost.jp/zipcode/zipmanual/index.html
///
////////////////////////////////////////////////////////////////
type BarShapeTypes = 'full' | 'upper' | 'lower' | 'middle';
type CustomBarTypes = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0' | '-' | 'CC1' | 'CC2' | 'CC3' | 'CC4' | 'CC5' | 'CC6' | 'CC7' | 'CC8' | 'start' | 'stop';

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

const alphabetBars = {
    'A': [...customBars['CC1'], ...customBars['0']],
}

export const generateCustomerBarcode = (postcode: string, frame: PageItem) => {
    const targetPage = frame.parentPage;
    const targetLayer = getTargetLayer();
    const barWidth = (Number(frame.geometricBounds[3]) - Number(frame.geometricBounds[1])) / 133; //(2 * 2 + 3 * 21) * 2 - 1;
    const barHeight = Number(frame.geometricBounds[2]) - Number(frame.geometricBounds[0]);
    const barPitch = barWidth * 2;
    const top = Number(frame.geometricBounds[0]);
    const left = Number(frame.geometricBounds[1]);

    const codes = postcode.split('').reduce((codes, code) => {
        // A-Zのアルファベットに対する処理を挿入
        codes.push(code);
        return codes;
    }, [] as string[]) as CustomBarTypes[];
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
    patterns.splice(62); // オーバーフロー分を削除する
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

//============================================
//	check digit 
//============================================
const getCheckDigit = (codes: CustomBarTypes[]): CustomBarTypes => {
    const sum = codes.reduce((sum, code) => {
        switch (code) {
            default: return sum + Number(code);
            case '-': return sum + 10;
            case 'CC1': return sum + 11;
            case 'CC2': return sum + 12;
            case 'CC3': return sum + 13;
            case 'CC4': return sum + 14;
            case 'CC5': return sum + 15;
            case 'CC6': return sum + 16;
            case 'CC7': return sum + 17;
            case 'CC8': return sum + 18;
            case 'start': return sum;
            case 'stop': return sum;
        }
    }, 0);

    const value = Math.ceil(sum / 19) * 19 - sum;

    switch (value) {
        default: return '-';
        case 0: return '0';
        case 1: return '1';
        case 2: return '2';
        case 3: return '3';
        case 4: return '4';
        case 5: return '5';
        case 6: return '6';
        case 7: return '7';
        case 8: return '8';
        case 9: return '9';
        case 10: return '-';
        case 11: return 'CC1';
        case 12: return 'CC2';
        case 13: return 'CC3';
        case 14: return 'CC4';
        case 15: return 'CC5';
        case 16: return 'CC6';
        case 17: return 'CC7';
        case 18: return 'CC8';
    }
}

//============================================
//	target layer
//============================================
const getTargetLayer = () => {
    const layerName = 'output barcode';
    const layer = app.activeDocument.layers.item(layerName);
    return layer ?? app.activeDocument.layers.add({ name: layerName });
}
