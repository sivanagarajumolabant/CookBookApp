// import { DASHBOARD_DRAWER_OPEN } from "../actions/action-type";

const initialState = {
  drawerOpen: false,

   menuitem:'',
   headerValue: {title: "Oracle To Postgres"}
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECTED_MENU":
      return {
        ...state,
        menuitem: action.payload
      };
      case "SELECTED_DROPDOWN":
        return {
          ...state,
          headerValue: action.payload
        };


      
    default:
      return state;
  }
};

export default dashboardReducer;