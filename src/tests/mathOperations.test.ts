import { add } from '../utils/helpers/mathOperations';

describe('add()', () => {
    it('adds two numbers', () => {
        expect(add(2, 3)).toEqual(5);
    });
});
