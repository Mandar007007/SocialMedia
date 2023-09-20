const intitalState = {
  user: null,
  isAuthenticated:false,
  proUser:null
};

const userReducer = (state = intitalState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated : true
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
