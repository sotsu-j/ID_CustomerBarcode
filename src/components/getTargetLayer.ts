//============================================
//	target layer
//============================================
import { BARCODE_LAYERS } from ".";

export const getTargetLayer = () => {
    const layer = app.activeDocument.layers.item(BARCODE_LAYERS.OUTPUT);

    return layer ?? app.activeDocument.layers.add({ name: BARCODE_LAYERS.OUTPUT });
}
