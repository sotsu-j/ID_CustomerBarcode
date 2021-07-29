import { generateCustomerBarcode } from "./generateCustomerBarcode";
import { SettingDialog } from './SettingDialog'

export const main = () => {
    const w = new SettingDialog();
    const params = w.show();

    if (params) {
        const { postcodeFrames, barcodeFrames, isOnFormat} = params;

        for (let i = 0; i < postcodeFrames.length; i++) {
            const postcodeFrame = postcodeFrames[i] as TextFrame;
            if (postcodeFrame.contentType === ContentType.TEXT_TYPE
                && postcodeFrame.parentPage === barcodeFrames[i].parentPage
            ) {
                generateCustomerBarcode(postcodeFrame.contents.toString(), barcodeFrames[i], isOnFormat);
            } else {
                alert('NG:' + (postcodeFrame instanceof PageItem));
            }
        }
    }
}