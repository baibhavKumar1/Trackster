import { EDIT_USER_ERROR, EDIT_USER_REQUEST,EDIT_USER_SUCCESS, GET_USER_ERROR, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_ERROR, LOGOUT_REQUEST, LOGOUT_SUCCESS, REGISTER_ERROR, REGISTER_REQUEST, REGISTER_SUCCESS, RELOGIN_ERROR, RELOGIN_REQUEST, RELOGIN_SUCCESS } from "./actionTypes";

const init = {
    isLoading: false,
    isError:false,
    isAuth:false,
    token:"",
    name:"",
    avatar:"",
    data:[],
    profile:{}
}

export const reducer = (state=init,{type,payload})=>{
   switch(type){
    case REGISTER_REQUEST : return {...state, isLoading:true}
    case REGISTER_SUCCESS: return {...state, isLoading:false, token:payload.data.token, isAuth:true,name: payload.data.name,avatar:payload.data.avatar}
    case REGISTER_ERROR: return {...state,isLoading:false, isError:true}

    case LOGIN_REQUEST: return {...state, isLoading:true}
    case LOGIN_SUCCESS : return {...state, isLoading:false, token:payload.data.token, isAuth:true,name: payload.data.name,avatar:payload.data.avatar}
    case LOGIN_ERROR : return {...state, isLoading:false, isError:true}
   
    case RELOGIN_REQUEST: return {...state, isLoading:true}
    case RELOGIN_SUCCESS : return {...state, isLoading:false, token:payload.data.token, isAuth:true,name: payload.data.name,avatar:payload.data.avatar}
    case RELOGIN_ERROR : return {...state, isLoading:false, isError:true}

    case LOGOUT_REQUEST: return{...state,isLoading:true}
    case LOGOUT_SUCCESS:return{...state,isLoading:false,isAuth:false,token:""}
    case LOGOUT_ERROR: return{...state,isLoading:false,isError:true,isAuth:false,token:""}

    case GET_USER_REQUEST:return{...state,isLoading:true}
    case GET_USER_SUCCESS:return {...state,isLoading:false,profile:payload.data}
    case GET_USER_ERROR: return{...state,isLoading:false,isError:true}
   
    case EDIT_USER_REQUEST:return{...state,isLoading:true}
    case EDIT_USER_SUCCESS:return {...state,isLoading:false,profile:payload.data}
    case EDIT_USER_ERROR: return{...state,isLoading:false,isError:true}

    default: return state
   }
}