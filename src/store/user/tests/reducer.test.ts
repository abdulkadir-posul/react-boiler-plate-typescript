import reducer from '../reducers';

describe('user reducer', () => {
    it('returns the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            logged: false,
            token: null,
            refreshToken: null,
            roles: null,
            error: null,
            filters: {
                dateFrom: '',
                dateTo: '',
                id: '',
                pickUpStations: [],
                dropOffStations: []
            }
        });
    });
});