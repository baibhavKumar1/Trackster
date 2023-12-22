import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_ERROR, REGISTER_REQUEST, REGISTER_SUCCESS } from "./actionTypes";

const init = {
    isLoading: false,
    isError:false,
    isAuth:false,
    token:"",
    name:"",
    data:[]
}

export const Reducer = (state=init,{type,payload})=>{
   switch(type){
    case REGISTER_REQUEST : return {...state, isLoading:true}
    case REGISTER_SUCCESS: return {...state}
    case REGISTER_ERROR: return {...state,isLoading:false, isError:true}

    case LOGIN_REQUEST: return {...state, isLoading:true}
    case LOGIN_SUCCESS : return {...state, isLoading:false, token:payload.data.token, isAuth:true,name: payload.data.name}
    case LOGIN_ERROR : return {...state, isLoading:false, isError:true}

    default: return state
   }
}