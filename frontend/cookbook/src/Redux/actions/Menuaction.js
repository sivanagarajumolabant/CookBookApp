
const  ActionMenu=(value) =>{
    return dispatch => {
       
         dispatch({
            type: "SELECTED_MENU" , 
            payload :value
         })
    }


 

}

export default {ActionMenu}