export const windowRef = `
	orientation: 'column',
	alignChildren: 'fill',
	layer: Panel {
		text: '対象レイヤー',
		alignChildren: 'left',
		barcord: Group {
			label: StaticText { text: 'バーコード', characters: 8 },
			target: DropDownList { },
		},
		postcode: Group {
			label: StaticText { text: '郵便番号', characters: 8 },
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