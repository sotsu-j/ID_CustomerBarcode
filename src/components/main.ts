import { generateCustomerBarcode } from "./generateCustomerBarcode";

export const main = () => {
    const postcodeFrames = app.activeDocument.layers.item('postcode').pageItems;
    const barcodeFrames = app.activeDocument.layers.item('barcode').pageItems;

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