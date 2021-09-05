import reducer from '../reducers';

describe('user reducer', () => {
    it('returns the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            logged: false,
            token: "",
            refreshToken: true,
            roles: [],
            error: "",
            filters: {
                dateFrom: '',
                dateTo: '',
                id: '',
                pickUpStations: [],
                dropOffStations: [],
            },
        });
    });
});