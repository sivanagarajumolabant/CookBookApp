// import { DASHBOARD_DRAWER_OPEN } from "../actions/action-type";

const initialState = {
  drawerOpen: false,

   menuitem:''
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECTED_MENU":
      return {
        ...state,
        menuitem: action.payload
      };
    default:
      return state;
  }
};

export default dashboardReducer;