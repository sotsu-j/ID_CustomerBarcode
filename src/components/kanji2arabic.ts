
const units = ["丁目", "丁 ", "番地", "番", "号", "地割", "線", "の", "ノ"];
const k_numbers = "〇一二三四五六七八九零壱弐参肆伍陸質捌玖零壹貳參";
const k_digit_minor = "十百千拾佰仟十陌阡";
const k_digit_major = "万億兆萬";

export const kanji2arabic = (k_number: string) => {
    const numbers = k_number.split('').reverse();
    const result = numbers.reduce(({ sum, digit, ballast, magnification }, str) => {
        const num = k_numbers.split('').indexOf(str) % 10;
        const digit1Index = k_digit_minor.split('').indexOf(str);
        const digit2Index = k_digit_major.split('').indexOf(str);
        if (digit2Index > -1) {
            magnification = [10000, 100000000, 1000000000000][digit2Index % 3];
            digit = magnification;
            sum += digit;
            ballast = true;
        } else if (digit1Index > -1) {
            digit = [10, 100, 1000][digit1Index % 3] * magnification;
            if (ballast && magnification > 1000) {
                sum -= magnification;
            }
            sum += digit;
            ballast = true;
        } else {
            sum += (num > 0 ? (num + (ballast ? -1 : 0)) * digit : 0);
            digit *= 10;
            ballast = false;
        }
        return { sum, digit, ballast, magnification };
    }, { sum: 0, digit: 1, ballast: false, magnification: 1 });
    return String(result.sum);
}

export const kanji2arabicOnAddress = (address: string) => {
    const re = new RegExp(`([${k_numbers}${k_digit_minor}${k_digit_major}]+(${units.join('|')}))`, 'g');
    const targets = address.match(re);
    if (targets) {
        const result = targets.reduce((accumulator, target) => {
            const re = new RegExp(`([${k_numbers}${k_digit_minor}${k_digit_major}]+)(${units.join('|')})`);
            const match = target.match(re);
            if (match && match.length >= 3) {
                const k_number = match[1];
                const word = match[2];
                const arabic = kanji2arabic(k_number);
                return accumulator.replace(`${k_number}${word}`, `${arabic}${word}`);
            }
            return accumulator;
        }, address);
        return result;
    }
    return address;
}