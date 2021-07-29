import { barShapes, customBars } from './codePatterns';
import { getTargetLayer } from './getTargetLayer';
import { toCodes } from './toCodes';

export const generateCustomerBarcode = (postcode: string, frame: PageItem, isOnFormat: boolean = false) => {
    const targetPage = frame.parentPage;
    const targetLayer = getTargetLayer();
    const top = Number(frame.geometricBounds[0]);
    const left = Number(frame.geometricBounds[1]);
    const { barWidth, barHeight, barPitch } = getFormat(isOnFormat, frame);

    const codes = toCodes(postcode);

    const patterns = [] as BarShapeTypes[];
    for (let i = 0; i < 23; i++) {
        const code = codes[i];
        if (code in customBars) {
            patterns.push(...customBars[code]);
        } else {
            patterns.push(...customBars['CC4']);
        }
    }

    patterns.reduce(([top, left], pattern) => {
        const pathItem = targetPage.rectangles.add(targetLayer);
        pathItem.geometricBounds = [
            barShapes[pattern][0] ? top : top + barHeight / 3,
            left,
            barShapes[pattern][2] ? top + barHeight : top + barHeight - barHeight / 3,
            left + barWidth
        ];

        pathItem.fillColor = app.activeDocument.colors.item('Black');
        pathItem.strokeColor = app.activeDocument.swatches.item('None');
        return [top, left + barPitch];
    }, [top, left]);
}
/***
 * 
 * 
***/
const getFormat = (isOnFormat: boolean = false, frame: PageItem) => {
    const barWidth = new UnitValue(isOnFormat ? `${0.6}mm` : `${(Number(frame.geometricBounds[3]) - Number(frame.geometricBounds[1])) / 133}px`); //(2 * 2 + 3 * 21) * 2 - 1;
    const barHeight = new UnitValue(isOnFormat ? `${3.6}mm` : `${Number(frame.geometricBounds[2]) - Number(frame.geometricBounds[0])}px`);
    const barPitch = new UnitValue(isOnFormat ? `${1.2}mm` : `${barWidth.value * 2}px`);

    return {
        barWidth: barWidth.value,
        barHeight: barHeight.value,
        barPitch: barPitch.value,
    };
}