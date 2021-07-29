type BarShapeTypes = 'full' | 'upper' | 'lower' | 'middle';
type CustomBarTypes = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0' | '-' | 'CC1' | 'CC2' | 'CC3' | 'CC4' | 'CC5' | 'CC6' | 'CC7' | 'CC8' | 'start' | 'stop';

interface MyWindow extends Window {
    layer: Panel & {
        barcord: Group & {
            target: DropDownList
        };
        postcode: Group & {
            target: DropDownList
        };
    }
    options: Panel & {
        isOnFormat: _Control & { value: boolean };
    }
    execute: {
        executeBtn: Button;
        cancelBtn: Button,
    }
}