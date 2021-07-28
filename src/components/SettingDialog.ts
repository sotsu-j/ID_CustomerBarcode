import { BARCODE_LAYERS } from ".";

const initialParams = {
    postcode: new Dropdown(),
    barcode: new Dropdown(),
}

export class SettingDialog {
    private params = initialParams;
    private w: Dialog;
    private windowRef = {
        name: `郵便番号・バーコード`,
    };

    constructor() {
        this.w = app.dialogs.add(this.windowRef);

        this.initialize();
    }

    initialize = () => {
        const isOver8 = Number(app.version.split('.')[0]) >= 8;
        const col = this.w.dialogColumns.add({});
        if (col) {
            col.dialogRows.add({}).staticTexts.add({ staticLabel: "文字枠を作成します" })
            const row_1 = col.dialogRows.add({});
            if (row_1) {
                row_1.staticTexts.add({ staticLabel: "バーコード:", minWidth: 160, staticAlignment: isOver8 ? StaticAlignmentOptions.LEFT_ALIGN : null });
                const stringList = [];
                let selectedIndex = 0;
                for (let i = 0; i < app.activeDocument.layers.length; i++) {
                    const name = app.activeDocument.layers[i].name;
                    stringList.push(name);
                    if (name === BARCODE_LAYERS.BARCODE_SHAPE) {
                        selectedIndex = i;
                    }
                }
                this.params.barcode = row_1.dropdowns.add({ stringList, selectedIndex });
            }
            const row_2 = col.dialogRows.add({});
            if (row_2) {
                row_2.staticTexts.add({ staticLabel: "郵便番号:", minWidth: 160, staticAlignment: isOver8 ? StaticAlignmentOptions.LEFT_ALIGN : null });
                const stringList = [];
                let selectedIndex = 0;
                for (let i = 0; i < app.activeDocument.layers.length; i++) {
                    const name = app.activeDocument.layers[i].name;
                    stringList.push(name);
                    if (name === BARCODE_LAYERS.POSTCODE) {
                        selectedIndex = i;
                    }
                }
                this.params.postcode = row_2.dropdowns.add({ stringList, selectedIndex });
            }
        }
    }

    fetch() {
        const postcodeFrames = app.activeDocument.layers.item(this.params.postcode.stringList[this.params.postcode.selectedIndex]).pageItems;
        const barcodeFrames = app.activeDocument.layers.item(this.params.barcode.stringList[this.params.barcode.selectedIndex]).pageItems;
        return {
            postcodeFrames,
            barcodeFrames,
        };
    }

    show() {
        return this.w.show()
            ? this.fetch()
            : false;
    }

    close() { }
}