export const barShapes: { [K in BarShapeTypes]: [boolean, boolean, boolean] } & Object = {
    'full': [true, true, true],     // 1
    'upper': [true, true, false],   // 2
    'lower': [false, true, true],   // 3
    'middle': [false, true, false], // 4
}

export const customBars: { [K in CustomBarTypes]: BarShapeTypes[] } & Object = {
    // number
    '1': ['full', 'full', 'middle'],    // 114
    '2': ['full', 'lower', 'upper'],    // 132
    '3': ['lower', 'full', 'upper'],    // 312
    '4': ['full', 'upper', 'lower'],    // 123
    '5': ['full', 'middle', 'full'],    // 141
    '6': ['lower', 'upper', 'full'],    // 321
    '7': ['upper', 'full', 'lower'],    // 213
    '8': ['upper', 'lower', 'full'],    // 231
    '9': ['middle', 'full', 'full'],    // 411
    '0': ['full', 'middle', 'middle'],  // 144
    // cc
    '-': ['middle', 'full', 'middle'],  // 414
    'CC1': ['lower', 'upper', 'middle'],// 324
    'CC2': ['lower', 'middle', 'upper'],// 342
    'CC3': ['upper', 'lower', 'middle'],// 234
    'CC4': ['middle', 'lower', 'upper'],// 432
    'CC5': ['upper', 'middle', 'lower'],// 243
    'CC6': ['middle', 'upper', 'lower'],// 423
    'CC7': ['middle', 'middle', 'full'],// 441
    'CC8': ['full', 'full', 'full'],    // 111
    // start & stop
    'start': ['full', 'lower'],         // 13
    'stop': ['lower', 'full'],          // 31
}

export const alphabetPatterns: { [key: string]: CustomBarTypes[] } = {
    'A': ['CC1', '0'],
    'B': ['CC1', '1'],
    'C': ['CC1', '2'],
    'D': ['CC1', '3'],
    'E': ['CC1', '4'],
    'F': ['CC1', '5'],
    'G': ['CC1', '6'],
    'H': ['CC1', '7'],
    'I': ['CC1', '8'],
    'J': ['CC1', '9'],

    'K': ['CC2', '0'],
    'L': ['CC2', '1'],
    'M': ['CC2', '2'],
    'N': ['CC2', '3'],
    'O': ['CC2', '4'],
    'P': ['CC2', '5'],
    'Q': ['CC2', '6'],
    'R': ['CC2', '7'],
    'S': ['CC2', '8'],
    'T': ['CC2', '9'],

    'U': ['CC3', '0'],
    'V': ['CC3', '1'],
    'W': ['CC3', '2'],
    'X': ['CC3', '3'],
    'Y': ['CC3', '4'],
    'Z': ['CC3', '5'],
}
