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
            this.w.layer.postcode.target.add('item', app.activeDocument.layers[i].name);
            this.w.layer.barcord.target.add('item', app.activeDocument.layers[i].name);
        }
        if (this.w.layer.postcode.target.find(BARCODE_LAYERS.POSTCODE)) {
            this.w.layer.postcode.target.find(BARCODE_LAYERS.POSTCODE).selected = true;
        }
        if (this.w.layer.barcord.target.find(BARCODE_LAYERS.BARCODE_SHAPE)) {
            this.w.layer.barcord.target.find(BARCODE_LAYERS.BARCODE_SHAPE).selected = true;
        }
    }

    fetch() {
        const postcodeFrames = app.activeDocument.layers.item(this.w.layer.postcode.target.selection.toString()).pageItems;
        const barcodeFrames = app.activeDocument.layers.item(this.w.layer.barcord.target.selection.toString()).pageItems;
        return {
            postcodeFrames,
            barcodeFrames,
            isOnFormat: this.w.options.isOnFormat.value,
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