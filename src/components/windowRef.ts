export const windowRef = `
	orientation: 'column',
	alignChildren: 'fill',
	options: Panel {
		text: '対象レイヤー',
		preferredSize: ['80',''],
		alignChildren: 'left',
		barcord: Group {
			label: StaticText { text: 'バーコード', characters: 8 }
			layer: DropDownList { }
		}
		postcode: Group {
			label: StaticText { text: '郵便番号', characters: 8 }
			layer: DropDownList { }
		}
	},
	execute: Group {
		orientation: 'row',
		alignment: 'right',
		executeBtn: Button { text: '配置' },
		cancelBtn: Button { text: 'キャンセル' },
	},
`;