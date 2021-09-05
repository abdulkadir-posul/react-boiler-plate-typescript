export const types = {
    SET_LOADING: 'SET_LOADING',
  };
  
  export const setLoading = (isLoading:boolean = false) => ({
    type: types.SET_LOADING,
    payload: isLoading,
  });
  