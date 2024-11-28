import {formatNumberPrice, getDecimalCount, switchCases} from '../helpers';

describe('Test de funciones utilitarias', () => {

    // switchCases.test.ts
    describe('switchCases', () => {
        it.each([
            ['case1', { 'case1': 'value1', 'case2': 'value2', default: 'defaultValue' }, 'value1'],
            ['nonexistent', { 'case1': 'value1', 'case2': 'value2', default: 'defaultValue' }, 'defaultValue'],
            ['nonexistent', { 'case1': 'value1', 'case2': 'value2' }, undefined],
            ['case1', undefined, undefined],
            ['nonexistent', { 'case1': 'value1', default: 'defaultValue' }, 'defaultValue'],
            ['case1', {}, undefined],
            ['case1', { 'case1': 'value1', default: 'defaultValue' }, 'value1']
        ])(
            'should return correct result for expression %s',
            (expression, cases, expectedResult) => {
                expect(switchCases(expression, cases)).toBe(expectedResult);
            }
        );
    });

    describe('formatNumberPrice', () => {
        it.each([
            [1234567.89, '1.234.567,89'],
            [1234567.00, '1.234.567'],
            [-1234567, ''],
            ['abc', '']
        ])(
            'should format number %p correctly',
            (input, expectedResult) => {
                expect(formatNumberPrice(input)).toBe(expectedResult);
            }
        );
    });

    describe('getDecimalCount', () => {
        it.each([
            [123.45, 2],
            [123, 0],
            ['', 0],
            ['invalid', 0],
            [123.4, 1]
        ])(
            'should return correct decimal count for %p',
            (input, expectedResult) => {
                expect(getDecimalCount(input)).toBe(expectedResult);
            }
        );
    });
});
