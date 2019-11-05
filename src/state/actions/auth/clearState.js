import {
    store,
  } from '../../store';
  
  const clearState = () => {
    store.dispatch({
      type: 'MEMBER_SIGN_OUT',
    });
  
    store.dispatch({
      type: 'SPACES_SIGN_OUT',
    });
  
    store.dispatch({
      type: 'MY_DATA_SIGNOUT',
    });
  };
  
  export default clearState;