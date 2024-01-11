/* eslint-disable no-unused-vars */
import { CREATE_EVENT_ERROR, CREATE_EVENT_REQUEST, CREATE_EVENT_SUCCESS, ADD_ATTENDEE_ERROR, ADD_ATTENDEE_REQUEST, ADD_ATTENDEE_SUCCESS, GET_EVENT_REQUEST, GET_EVENT_SUCCESS, GET_EVENT_ERROR, DELETE_EVENT_REQUEST, DELETE_EVENT_SUCCESS, DELETE_EVENT_ERROR, REMOVE_ATTENDEE_REQUEST, REMOVE_ATTENDEE_SUCCESS, REMOVE_ATTENDEE_ERROR, GET_ATTENDINGEVENT_REQUEST, GET_ATTENDINGEVENT_SUCCESS, GET_ATTENDINGEVENT_ERROR, GET_HOSTINGEVENT_REQUEST, GET_HOSTINGEVENT_ERROR, GET_HOSTINGEVENT_SUCCESS, GET_SINGLEEVENT_REQUEST, GET_SINGLEEVENT_SUCCESS, GET_SINGLEEVENT_ERROR } from "./actionTypes"; 
import axios from 'axios';

export const GetEvent= (token)=>(dispatch)=>{ 
    dispatch({type:GET_EVENT_REQUEST})
    axios.get('https://trackster.onrender.com/event',{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then((res)=>{ 
        dispatch({type:GET_EVENT_SUCCESS,payload:res})
        ////console.log(res)
    }).catch((err)=>{
        dispatch({type:GET_EVENT_ERROR})
        //console.log(err)
    })
}
export const GetSingleEvent= ({id,token})=>(dispatch)=>{  
    dispatch({type:GET_SINGLEEVENT_REQUEST}) 
    console.log(id)
    axios.get(`https://trackster.onrender.com/event/singleEvent/${id}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then((res)=>{  
        dispatch({type:GET_SINGLEEVENT_SUCCESS,payload:res})
        console.log(res)
    }).catch((err)=>{
        dispatch({type:GET_SINGLEEVENT_ERROR})
        console.log(err)
    })
}
export const GetHostingEvent= (token)=>(dispatch)=>{ 
    dispatch({type:GET_HOSTINGEVENT_REQUEST})
    axios.get('https://trackster.onrender.com/event/hostingEvent',{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then((res)=>{ 
        dispatch({type:GET_HOSTINGEVENT_SUCCESS,payload:res})
        ////console.log(res)
    }).catch((err)=>{
        dispatch({type:GET_HOSTINGEVENT_ERROR})
        //console.log(err)
    })
}
export const GetAttendingEvent= (token)=>(dispatch)=>{ 
    dispatch({type:GET_ATTENDINGEVENT_REQUEST})
    axios.get('https://trackster.onrender.com/event/attendingEvent',{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then((res)=>{ 
        dispatch({type:GET_ATTENDINGEVENT_SUCCESS,payload:res})
        console.log(res)
    }).catch((err)=>{
        dispatch({type:GET_ATTENDINGEVENT_ERROR})
        console.log(err)
    })
}
export const CreateEvent = (data) => async (dispatch) => {
    dispatch({ type: CREATE_EVENT_REQUEST })
    await axios.post('https://trackster.onrender.com/event/create', data,{
        headers:{
            Authorization:`Bearer ${data.token}`
        }
    })
        .then((res) => {
            dispatch({ type: CREATE_EVENT_SUCCESS })
            dispatch(GetEvent(data.token))
            //console.log(res)
        })
        .catch((err) => {
            dispatch({ type: CREATE_EVENT_ERROR })
            //console.log(err)
        })
}
export const EditEvent = (data) => async (dispatch) => {
    dispatch({ type: CREATE_EVENT_REQUEST })
    await axios.patch(`https://trackster.onrender.com/event/edit/${data.id}`, data,{
        headers:{
            Authorization:`Bearer ${data.token}`
        }
    })
        .then((res) => {
            dispatch({ type: CREATE_EVENT_SUCCESS })
            dispatch(GetHostingEvent(data.token))
            console.log(res)
        })
        .catch((err) => {
            dispatch({ type: CREATE_EVENT_ERROR })
            //console.log(err)
        })
}
export const DeleteEvent = (data) => async (dispatch) => {
    dispatch({ type: DELETE_EVENT_REQUEST })
    await axios.delete(`https://trackster.onrender.com/event/delete/${data.id}`, {
        headers:{
            Authorization:`Bearer ${data.token}`
        }
    })
        .then((res) => {
            dispatch({ type: DELETE_EVENT_SUCCESS })
            dispatch(GetHostingEvent(data.token))
            //console.log(res) 
        })
        .catch((err) => {
            dispatch({ type: DELETE_EVENT_ERROR })
            //console.log(err)
        })
} 

export const AddAttendee = ({id,token}) => async (dispatch) => {
    dispatch({ type: ADD_ATTENDEE_REQUEST })
    console.log(id,token)
    await axios.post('https://trackster.onrender.com/event/addAttendee', {id},{
        headers:{
            Authorization:`Bearer ${token}`
        } 
    })
        .then((res) => {
            dispatch({ type: ADD_ATTENDEE_SUCCESS })
            dispatch(GetSingleEvent({id,token}))
            console.log(res)
        })
        .catch((err) => {
            dispatch({ type: ADD_ATTENDEE_ERROR })
            //console.log(err)
        })
}
export const RemoveAttendee = (data) => async (dispatch) => {
    dispatch({ type: REMOVE_ATTENDEE_REQUEST })
    await axios.post('https://trackster.onrender.com/event/removeAttendee', data,{
        headers:{
            Authorization:`Bearer ${data.token}`
        } 
    })
        .then((res) => {
            dispatch({ type: REMOVE_ATTENDEE_SUCCESS })
            //console.log(res)
        })
        .catch((err) => {
            dispatch({ type: REMOVE_ATTENDEE_ERROR })
            //console.log(err)
        })
}