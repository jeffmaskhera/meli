export function switchCases<T>(expression: string, cases: Record<string, T> | undefined) {
    if (!cases) {
        return undefined;
    }
    return cases[expression] || cases?.['default'];
}

export function formatNumberPrice(number: any) {
    if (typeof number !== 'number' || number < 0) {
        return '';
    }
    const parts = number.toFixed(2).toString().split('.');
    let integerPart = parts[0];
    const decimalPart = parts[1];
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const formattedDecimal = decimalPart.replace(/0+$/, '');
    return formattedDecimal.length > 0 ? `${integerPart},${formattedDecimal}` : integerPart;
}