type BarShapeTypes = 'full' | 'upper' | 'lower' | 'middle';
type CustomBarTypes = 'start' | 'end' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '-' | 'c1' | 'c2' | 'c3' | 'c4' | 'c5' | 'c6' | 'c7' | 'c8';

const barShapes: { [K in BarShapeTypes]: [boolean, boolean, boolean] } & Object = {
    'full': [true, true, true],
    'upper': [true, true, false],
    'lower': [false, true, true],
    'middle': [false, true, false],
}

const customBars: { [K in CustomBarTypes]: BarShapeTypes[] } & Object = {
    'start': ['full', 'lower'],
    'end': ['lower', 'full'],
    // number
    '0': ['full', 'middle', 'middle'],
    '1': ['full', 'full', 'middle'],
    '2': ['full', 'lower', 'upper'],
    '3': ['lower', 'full', 'upper'],
    '4': ['full', 'upper', 'lower'],
    '5': ['full', 'middle', 'full'],
    '6': ['lower', 'upper', 'full'],
    '7': ['upper', 'full', 'lower'],
    '8': ['upper', 'lower', 'full'],
    '9': ['middle', 'full', 'full'],
    // cc
    '-': ['middle', 'full', 'middle'],
    'c1': ['lower', 'upper', 'middle'],
    'c2': ['lower', 'middle', 'upper'],
    'c3': ['upper', 'lower', 'middle'],
    'c4': ['middle', 'lower', 'upper'],
    'c5': ['upper', 'middle', 'lower'],
    'c6': ['middle', 'upper', 'lower'],
    'c7': ['middle', 'middle', 'full'],
    'c8': ['full', 'full', 'full'],
}

export const generateCustomerBarcode = (postcode: string, frame: PageItem) => {
    const targetPage = frame.parentPage;
    const targetLayer = getTargetLayer();
    const barWidth = (Number(frame.geometricBounds[3]) - Number(frame.geometricBounds[1])) / 133; //(2 * 2 + 3 * 21) * 2 - 1;
    const barHeight = Number(frame.geometricBounds[2]) - Number(frame.geometricBounds[0]);
    const barPitch = barWidth * 2;
    const top = Number(frame.geometricBounds[0]);
    const left = Number(frame.geometricBounds[1]);

    const codes = postcode.split('') as CustomBarTypes[];
    codes.unshift('start');

    const patterns = [] as BarShapeTypes[];
    for (let i = 0; i < 21; i++) {
        const code = codes[i];
        if (code in customBars) {
            patterns.push(...customBars[code]);
        } else {
            patterns.push(...customBars['c4']);
        }
    }
    // push check digit
    const checkDigit = getCheckDigit(codes);
    patterns.push(...customBars[checkDigit])

    // push end digit
    patterns.push(...customBars['end']);

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
            case 'c4': return sum + 14;
        }
    }, 0);

    const value = sum % 19 === 0
        ? 0
        : ((Math.floor(sum / 19) + 1) * 19 - sum);

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
        case 11: return 'c1';
        case 12: return 'c2';
        case 13: return 'c3';
        case 14: return 'c4';
        case 15: return 'c5';
        case 16: return 'c6';
        case 17: return 'c7';
        case 18: return 'c8';
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
