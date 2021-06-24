import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
}

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...INITIAL_STATE, isSignedIn: true, userId: action.payload};
    case SIGN_OUT:
      return { ...INITIAL_STATE, isSignedIn: false, userId: null };
    default:
      return state;
  }
}

export default authReducer;
