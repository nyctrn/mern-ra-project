const authReducer = (state, action) => {
  // console.log(action, "authreducer action");
  // console.log(action.payload, "authreducer action payload");
  switch (action.type) {
    case "USER_LOADED":
      return {
        ...state,
        isAuthenticated: true,
        // loading: true,
        currentUser: action.payload,
      };
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        currentUser: action.payload.user,
        isAuthenticated: true,
        // loading: true,
        applicationSubmission: false,
      };
    case "FORM_APPLICATION":
      return {
        ...state,
        applicationSubmission: true,
      };
    case "FORM_EDIT":
      return {
        ...state,
      };

    case "REGISTER_FAIL":
    case "AUTH_ERROR":
    case "LOGIN_FAIL":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        // loading: true,
        currentUser: null,
        error: action.payload,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };
    case "FETCH_APPLICATIONS": // change to users.applications?
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case "APPLICATIONS_FETCH_FAIL":
      return {
        ...state,
        error: action.payload,
      };
    case "ACCEPT_APPLICATIONS":
      return {
        ...state,
        application_status: "1",
      };
    case "REJECT_APPLICATIONS":
      return {
        ...state,
        application_status: "0",
      };
    case "SHOW_SINGLE_APPLICATION":
      return {
        ...state,
        single_application: action.payload,
      };
    case "MUI_OPEN":
      return {
        ...state,
        mui_open: true,
        SlideTransition: action.payload,
      };
    case "MUI_CLOSE":
      return {
        ...state,
        mui_close: false,
      };
    default:
      return state;
  }
};

export default authReducer;
