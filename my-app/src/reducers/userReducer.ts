const intitalState = {
  user: null,
  isAuthenticated:false
};

const userReducer = (state = intitalState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "CLEAR_USER":
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

export default userReducer;
