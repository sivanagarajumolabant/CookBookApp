
const  ActionMenu=(value) =>{
    return dispatch => {
       
         dispatch({
            type: "SELECTED_MENU" , 
            payload :value
         })
    }


 

}

const  dropdown=(value) =>{
    return dispatch => {
       
         dispatch({
            type: "SELECTED_DROPDOWN" , 
            payload :value
         })
    }


 

}

export default {ActionMenu, dropdown}