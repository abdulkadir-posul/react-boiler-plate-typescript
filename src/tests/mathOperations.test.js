import { add } from '../utils/helpers/mathOperations';

describe('add()', () => {
    it('adds two numbers', () => {
        expect(add(2, 3)).toEqual(5);
    });

    it("doesn't add the third number", () => {
        expect(add(2, 3, 5)).toEqual(add(2, 3));
    });
});
