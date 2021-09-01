export const types = {
    SET_LOADING: 'SET_LOADING',
  };
  
  export const setLoading = (isLoading = false) => ({
    type: types.SET_LOADING,
    payload: isLoading,
  });
  