export const windowRef = `
	orientation: 'column',
	alignChildren: 'fill',
	layer: Panel {
		text: '対象レイヤー',
		alignChildren: 'left',
		postcode: Group {
			label: StaticText { text: '元データ', characters: 8 },
			target: DropDownList { },
		},
		barcord: Group {
			label: StaticText { text: '出力レイヤー', characters: 8 },
			target: DropDownList { },
		},
	},
	options: Panel {
		text: 'オプション',
		alignChildren: 'fill',
		isOnFormat: Checkbox { text: 'バーコードを10ポ相当で作成する', value: true },
	},
	execute: Group {
		orientation: 'row',
		alignment: 'right',
		executeBtn: Button { text: '配置' },
		cancelBtn: Button { text: 'キャンセル' },
	},
`;