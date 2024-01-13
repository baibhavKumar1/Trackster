import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_ERROR, LOGOUT_REQUEST, LOGOUT_SUCCESS, REGISTER_ERROR, REGISTER_REQUEST, REGISTER_SUCCESS, RELOGIN_ERROR, RELOGIN_REQUEST, RELOGIN_SUCCESS } from "./actionTypes";
import axios from 'axios';

export const Register = (userData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST })
    await axios.post('https://clean-erin-turtleneck.cyclic.app/user/register', userData)
        .then((res) => {
            dispatch({ type: REGISTER_SUCCESS,payload:res })
            localStorage.setItem('token',(res.data.token))
            console.log(res)
        })
        .catch((err) => {
            dispatch({ type: REGISTER_ERROR })
            console.log(err)
        })
}

export const Login=(userData)=>async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST}) 
    await axios.post('https://clean-erin-turtleneck.cyclic.app/user/login',userData)
    .then((res)=>{
        dispatch({type:LOGIN_SUCCESS,payload:res})
        localStorage.setItem('token',(res.data.token))
        console.log(res.data.token,"1")
    })
    .catch((err)=>{
        dispatch({type:LOGIN_ERROR})
        console.log(err)
    })
} 

export const Logout=(token)=>async(dispatch)=>{
    dispatch({type:LOGOUT_REQUEST})
    await axios.get('https://clean-erin-turtleneck.cyclic.app/user/logout',
    {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then((res)=>{ 
        dispatch({type:LOGOUT_SUCCESS,payload:res})
        localStorage.removeItem('token')
    }).catch((err)=>{
        dispatch({type:LOGOUT_ERROR})
        console.log(err)
    })
}

export const Relogin=(token)=>async(dispatch)=>{
    dispatch({type:RELOGIN_REQUEST})
    await axios.get('https://clean-erin-turtleneck.cyclic.app/user/relogin',
    {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then((res)=>{ 
        dispatch({type:RELOGIN_SUCCESS,payload:res})
    }).catch((err)=>{
        dispatch({type:RELOGIN_ERROR})
        console.log(err)
    })
}