////////////////////////////////////////////////////////////////
///
///	カスタマーバーコード生成 for ID
///	code name : generateCustomerBarcode
///											2021/07/27
///
////////////////////////////////////////////////////////////////
/// @target "indesign"
import "extendscript-es5-shim-ts";

import generateCustomerBarcode from "../components";

app.doScript(generateCustomerBarcode, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT);
////////////////////////////////////////////////////////////////
//
//	更新履歴
//	2021/07/27	開発開始