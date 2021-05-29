import { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../utils/setAuthToken";

let apiUrl = process.env.API_URL;

// if (process.env.NODE_ENV === "production") {
//   apiUrl = "https://marioskour.cloudns.cl:32500";
// }

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    currentUser: null,
    loading: true,
    error: null,
    users: [],
    applicationSubmission: false,
    single_application: false,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // console.log(state.applicationSubmission, "appl sub authstate");
  // load user
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      try {
        const res = await axios.get(apiUrl + "/login");

        // console.log(res.data, "loaduser authstate");

        dispatch({ type: "USER_LOADED", payload: res.data });
      } catch (error) {
        dispatch({ type: "AUTH_ERROR" });
      }
    }
  };

  // register user
  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(apiUrl + "/register", formData, config);

      // console.log(res, "authstate register success");

      dispatch({
        type: "REGISTER_SUCCESS",
        payload: res.data,
      });

      loadUser();
    } catch (error) {
      console.log(error.response.data.msg, "authstate register fail");

      dispatch({
        type: "REGISTER_FAIL",
        payload: error.response.data.msg,
      });
    }
  };
  // login user
  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(apiUrl + "/login", formData, config);

      // console.log(res, "login resp");

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data,
      });
    } catch (error) {
      // console.log(error.response);
      // console.log(error.response.data);
      // console.log(error.response.data.msg);
      // console.log("test");
      dispatch({
        type: "LOGIN_FAIL",
        payload: error.response.data.msg,
      });
    }
  };
  // logout
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };
  // clear errors
  const clearErrors = () => dispatch({ type: "CLEAR_ERRORS" });

  ////////////////////////////////////
  // application test
  ///////////////////////////////////
  const formApplication = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(apiUrl + "/application", formData, config);
      // console.log(formData);
      // console.log(res);
      dispatch({
        type: "FORM_APPLICATION",
        payload: res.data,
      });

      // loadUser();
    } catch (error) {
      // console.log("error");
      // console.log(error);
      dispatch({
        type: "FORM_APPLICATION_FAIL",
        payload: error.response.data.errors,
      });
    }
  };

  const formEdit = async (formData) => {
    // console.log(formData, "formdata");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(apiUrl + "/application", formData, config);
      // console.log(formData);
      console.log(res, "res formedit");
      dispatch({
        type: "FORM_EDIT",
        payload: res,
      });

      // loadUser();
    } catch (error) {
      // console.log(error, "autherror");
      console.log(error.response.data.errors, "error data msg autherror");
      // console.log("error");
      // console.log(error);
      dispatch({
        type: "FORM_EDIT_FAIL",
        payload: error.response.data.errors,
      });
    }
  };

  ///

  const fetchApplications = async (userId) => {
    const config = {
      params: {
        userId,
      },
    };

    try {
      const res = await axios.get(apiUrl + "/applications", config);

      dispatch({
        type: "FETCH_APPLICATIONS",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "APPLICATIONS_FETCH_FAIL",
        payload: error.response.data.msg,
      });
    }
  };

  ///

  const rejectApplications = async (formData) => {
    // console.log("test", formData);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(apiUrl + "/applications", formData, config);

      dispatch({
        type: "REJECT_APPLICATION",
        payload: res.data,
      });

      // loadUser();
    } catch (error) {
      dispatch({
        type: "APPLICATION_HANDLE_FAIL",
        payload: error.response.data.msg,
      });
    }
  };

  const acceptApplications = async (formData) => {
    // console.log("test", formData);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(apiUrl + "/applications", formData, config);

      // console.log(res, "acceptapplications authstate success");
      dispatch({
        type: "ACCEPT_APPLICATION",
        payload: res.data,
      });

      // loadUser();
    } catch (error) {
      // console.log(error, "acceptapplications authstate fail");
      dispatch({
        type: "APPLICATION_HANDLE_FAIL",
        payload: error.response.data.msg,
      });
    }
  };

  const showSingleApplication = (show) => {
    dispatch({
      type: "SHOW_SINGLE_APPLICATION",
      payload: show,
    });
  };

  ///
  // const notificationFunction = (
  //   list,
  //   setListLen,
  //   muiState,
  //   setMuiState,
  //   SlideTransition
  // ) => {
  //   const interval = setInterval(async () => {
  //     const filterApplications = (list) => {
  //       return list.filter((appl) => appl.application);
  //     };

  //     // console.log(listLen, "list len Home");
  //     // console.log(
  //     //   filterApplications(state.applications).length,
  //     //   "new appl list len Home"
  //     // );

  //     await fetchApplications();

  //     if (filterApplications(state.applications).length > list) {
  //       setMuiState({
  //         open: true,
  //         SlideTransition,
  //       });

  //       setTimeout(() => {
  //         setMuiState({
  //           ...muiState,
  //           open: false,
  //         });
  //       }, 2500);

  //       setListLen(filterApplications(state.applications).length);

  //       // setMessage("νεα αίτηση");
  //     }
  //   }, 3000);
  //   return () => clearInterval(interval);
  // };

  // const listUpdateTest = (listLen, setListLen) => {
  //   const SlideTransition = (props) => {
  //     return <Slide {...props} direction="up" />;
  //   };

  //   if (state.currentUser && state.currentUser.title) {
  //     const interval = setInterval(async () => {
  //       const filterApplications = (list) => {
  //         return list.filter((user) => user.application);
  //       };
  //       // const filteredApplications = state.users.filter(
  //       //   (appl) => appl.application
  //       // );

  //       // oldList = filterApplications(state.users);

  //       // console.log(state, "state home");

  //       // console.log(listLen, "list len Home");
  //       // console.log(
  //       //   filterApplications(state.users).length,
  //       //   "new appl list len Home"
  //       // );

  //       await fetchApplications();

  //       if (filterApplications(state.users).length > listLen) {
  //         try {
  //           dispatch({
  //             type: "MUI_OPEN",
  //             payload: SlideTransition,
  //           });

  //           setTimeout(() => {
  //             dispatch({
  //               type: "MUI_CLOSE",
  //             });
  //           }, 2500);

  //           // loadUser();
  //         } catch (error) {
  //           // dispatch({
  //           //   type: "APPLICATION_HANDLE_FAIL",
  //           //   payload: error.response.data.msg,
  //           // });
  //         }
  //       }

  //       // setMuiState({
  //       //   open: true,
  //       //   SlideTransition,
  //       // });

  //       // setTimeout(() => {
  //       //   setMuiState({
  //       //     ...muiState,
  //       //     open: false,
  //       //   });

  //       //   }, 2500);

  //       setListLen(filterApplications(state.users).length);

  //       // setMessage("νεα αίτηση");
  //     }, 3000);
  //     return () => clearInterval(interval);
  //   }
  // };
  ///////////////////////////////////

  return (
    <AuthContext.Provider
      value={{
        state: state,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        currentUser: state.currentUser,
        error: state.error,
        users: state.users,
        applicationSubmission: state.applicationSubmission,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
        formApplication,
        fetchApplications,
        // handleApplications,
        rejectApplications,
        acceptApplications,
        formEdit,
        showSingleApplication,
        // notificationFunction,
        // listUpdateTest,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
