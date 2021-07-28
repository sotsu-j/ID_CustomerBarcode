import { BARCODE_LAYERS } from ".";
import { generateCustomerBarcode } from "./generateCustomerBarcode";

export const main = () => {
    const postcodeFrames = app.activeDocument.layers.item(BARCODE_LAYERS.POSTCODE).pageItems;
    const barcodeFrames = app.activeDocument.layers.item(BARCODE_LAYERS.BARCODE_SHAPE).pageItems;

    for (let i = 0; i < postcodeFrames.length; i++) {
        const postcodeFrame = postcodeFrames[i] as TextFrame;
        if (postcodeFrame.contentType === ContentType.TEXT_TYPE 
            && postcodeFrame.parentPage === barcodeFrames[i].parentPage
        ) {
            generateCustomerBarcode(postcodeFrame.contents.toString(), barcodeFrames[i]);
        } else {
            alert('NG:' + (postcodeFrame instanceof PageItem));
        }
    }
}