import { GET_USER_ERROR, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_ERROR, LOGOUT_REQUEST, LOGOUT_SUCCESS, REGISTER_ERROR, REGISTER_REQUEST, REGISTER_SUCCESS, RELOGIN_ERROR, RELOGIN_REQUEST, RELOGIN_SUCCESS } from "./actionTypes";

import axios from 'axios';

const userURL = import.meta.env.VITE_BACKEND_URL
export const Register = (userData,toast) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST })
    await axios.post(`${userURL}/user/register`, userData,
    {
        headers:{"Content-Type":"multipart/form-data"}
    })
        .then((res) => {
            dispatch({ type: REGISTER_SUCCESS,payload:res })
            toast({
                title: "User Registered",
                position:"top-right",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
            localStorage.setItem('trackster',(res.data.token))
        })
        .catch((err) => {
            dispatch({ type: REGISTER_ERROR })
            toast({
                title: err.message,
                position:"top-right",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            console.log(err)
        })
}

export const Login=(userData,toast)=>async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST}) 
    await axios.post(`${userURL}/user/login`,userData)
    .then((res)=>{
        dispatch({type:LOGIN_SUCCESS,payload:res})
        toast({
            title: "User Logged In",
            position:"top-right",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        localStorage.setItem('trackster',(res.data.token))
    })
    .catch((err)=>{
        dispatch({type:LOGIN_ERROR})
        toast({
            title: err.message,
            position:"top-right",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        console.log("err",err)
    })
} 

export const Logout=(token,toast,navigate)=>async(dispatch)=>{
    dispatch({type:LOGOUT_REQUEST})
    await axios.get(`${userURL}/user/logout`,
    {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then((res)=>{ 
        dispatch({type:LOGOUT_SUCCESS,payload:res})
        toast({
            title: "User Logged Out",
            position:"top-right",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        localStorage.removeItem('trackster')
        navigate('/')
    }).catch((err)=>{
        dispatch({type:LOGOUT_ERROR})
        toast({
            title: err.message,
            position:"top-right",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        console.log(err)
    })
}

export const Relogin=(token)=>async(dispatch)=>{
    dispatch({type:RELOGIN_REQUEST})
    await axios.get(`${userURL}/user/relogin`,
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
export const GetUser=(token)=>async(dispatch)=>{
   dispatch({type:GET_USER_REQUEST})
   await axios.get(`${userURL}/user/details`,
   {
    headers:{Authorization:`Bearer ${token}`}
   }).then((res)=>{
    dispatch({type:GET_USER_SUCCESS,payload:res})
   
   }).catch((err)=>{
    dispatch({type:GET_USER_ERROR})
    console.log(err) 
   })
}
export const EditProfile=(token)=>async(dispatch)=>{
    dispatch({type:RELOGIN_REQUEST})
    await axios.patch(`${userURL}/user/editprofile`,
    {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then((res)=>{ 
        dispatch({type:RELOGIN_SUCCESS,payload:res})
        dispatch(GetUser(token))
    }).catch((err)=>{
        dispatch({type:RELOGIN_ERROR})
        console.log(err)
    })
}