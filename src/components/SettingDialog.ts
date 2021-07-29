import { BARCODE_LAYERS } from ".";
import { windowRef } from './windowRef';

const initialParams = {
    postcode: new Dropdown(),
    barcode: new Dropdown(),
}

export class SettingDialog {
    private isExcute = false;
    private params = initialParams;
    private w: MyWindow;
    private name = `郵便番号・バーコード`;

    constructor() {
        //this.w = app.dialogs.add(this.windowRef);
        this.w = new Window(`dialog { 
			text: '${this.name}',
			${windowRef}
		}`) as MyWindow;

        this.initialize();
    }

    initialize = () => {
        /// Submit, Cancel
        this.w.execute.executeBtn.onClick = () => {
            this.isExcute = true;
            this.close();
        }
        this.w.execute.cancelBtn.onClick = () => {
            this.close();
        }
        //this.w.defaultElement = this.w.execute.executeBtn;
        //this.w.cancelElement = this.w.execute.cancelBtn;

        /// init data
        for (let i = 0; i < app.activeDocument.layers.length; i++) {
            this.w.options.postcode.layer.add('item', app.activeDocument.layers[i].name);
            this.w.options.barcord.layer.add('item', app.activeDocument.layers[i].name);
        }
        if (this.w.options.postcode.layer.find(BARCODE_LAYERS.POSTCODE)) {
            this.w.options.postcode.layer.find(BARCODE_LAYERS.POSTCODE).selected = true;
        }
        if (this.w.options.barcord.layer.find(BARCODE_LAYERS.BARCODE_SHAPE)) {
            this.w.options.barcord.layer.find(BARCODE_LAYERS.BARCODE_SHAPE).selected = true;
        }
    }

    fetch() {
        const postcodeFrames = app.activeDocument.layers.item(this.w.options.postcode.layer.selection.toString()).pageItems;
        const barcodeFrames = app.activeDocument.layers.item(this.w.options.barcord.layer.selection.toString()).pageItems;
        return {
            postcodeFrames,
            barcodeFrames,
        };
    }

    show() {
        this.w.show();
        return this.isExcute && this.fetch();
    }

    close() {
        this.w.close();
     }
}