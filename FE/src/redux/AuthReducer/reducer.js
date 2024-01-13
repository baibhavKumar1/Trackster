import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_ERROR, LOGOUT_REQUEST, LOGOUT_SUCCESS, REGISTER_ERROR, REGISTER_REQUEST, REGISTER_SUCCESS, RELOGIN_ERROR, RELOGIN_REQUEST, RELOGIN_SUCCESS } from "./actionTypes";

const init = {
    isLoading: false,
    isError:false,
    isAuth:false,
    token:"",
    name:"",
    data:[]
}

export const reducer = (state=init,{type,payload})=>{
   switch(type){
    case REGISTER_REQUEST : return {...state, isLoading:true}
    case REGISTER_SUCCESS: return {...state, isLoading:false, token:payload.data.token, isAuth:true,name: payload.data.name}
    case REGISTER_ERROR: return {...state,isLoading:false, isError:true}

    case LOGIN_REQUEST: return {...state, isLoading:true}
    case LOGIN_SUCCESS : return {...state, isLoading:false, token:payload.data.token, isAuth:true,name: payload.data.name}
    case LOGIN_ERROR : return {...state, isLoading:false, isError:true}
   
    case RELOGIN_REQUEST: return {...state, isLoading:true}
    case RELOGIN_SUCCESS : return {...state, isLoading:false, token:payload.data.token, isAuth:true,name: payload.data.name}
    case RELOGIN_ERROR : return {...state, isLoading:false, isError:true}

    case LOGOUT_REQUEST: return{...state,isLoading:true}
    case LOGOUT_SUCCESS:return{...state,isLoading:false,isAuth:false,token:""}
    case LOGOUT_ERROR: return{...state,isLoading:false,isError:true,isAuth:false,token:""}
    default: return state
   }
}