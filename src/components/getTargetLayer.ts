//============================================
//	target layer
//============================================
export const getTargetLayer = () => {
    const layerName = 'output barcode';
    const layer = app.activeDocument.layers.item(layerName);
    return layer ?? app.activeDocument.layers.add({ name: layerName });
}
