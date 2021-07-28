// 数値とハイフン、大文字アルファベット以外が使用されていないかをチェック
export const verifyCode = (code: string): boolean => {
    const match = code.match(/[^0-9\-A-Z]/);
    return Boolean(match) === false;
}