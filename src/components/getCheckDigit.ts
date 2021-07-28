//============================================
//	check digit 
//============================================
export const getCheckDigit = (codes: CustomBarTypes[]): CustomBarTypes => {
    const sum = codes.reduce((sum, code) => {
        switch (code) {
            default: return sum + Number(code);
            case '-': return sum + 10;
            case 'CC1': return sum + 11;
            case 'CC2': return sum + 12;
            case 'CC3': return sum + 13;
            case 'CC4': return sum + 14;
            case 'CC5': return sum + 15;
            case 'CC6': return sum + 16;
            case 'CC7': return sum + 17;
            case 'CC8': return sum + 18;
            case 'start': return sum;
            case 'stop': return sum;
        }
    }, 0);

    const value = Math.ceil(sum / 19) * 19 - sum;

    switch (value) {
        default: return '-';
        case 0: return '0';
        case 1: return '1';
        case 2: return '2';
        case 3: return '3';
        case 4: return '4';
        case 5: return '5';
        case 6: return '6';
        case 7: return '7';
        case 8: return '8';
        case 9: return '9';
        case 10: return '-';
        case 11: return 'CC1';
        case 12: return 'CC2';
        case 13: return 'CC3';
        case 14: return 'CC4';
        case 15: return 'CC5';
        case 16: return 'CC6';
        case 17: return 'CC7';
        case 18: return 'CC8';
    }
}