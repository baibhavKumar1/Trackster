import { CREATE_EVENT_ERROR, CREATE_EVENT_REQUEST, CREATE_EVENT_SUCCESS, ADD_ATTENDEE_ERROR, ADD_ATTENDEE_REQUEST, ADD_ATTENDEE_SUCCESS, GET_EVENT_REQUEST, GET_EVENT_SUCCESS, GET_EVENT_ERROR } from "./actionTypes";
import axios from 'axios';

export const GetEvent= (token)=>async(dispatch)=>{
    dispatch({type:GET_EVENT_REQUEST})
    await axios.get('https://trackster.onrender.com/event',{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then((res)=>{
        dispatch({type:GET_EVENT_SUCCESS,payload:res})
        console.log(res)
    }).catch((err)=>{
        dispatch({type:GET_EVENT_ERROR})
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
            console.log(res)
        })
        .catch((err) => {
            dispatch({ type: CREATE_EVENT_ERROR })
            console.log(err)
        })
}

export const AddAttendee = (data) => async (dispatch) => {
    dispatch({ type: ADD_ATTENDEE_REQUEST })
    await axios.post('https://trackster.onrender.com/event/addAttendee', data,{
        headers:{
            Authorization:`Bearer ${data.token}`
        } 
    })
        .then((res) => {
            dispatch({ type: ADD_ATTENDEE_SUCCESS })
            console.log(res)
        })
        .catch((err) => {
            dispatch({ type: ADD_ATTENDEE_ERROR })
            console.log(err)
        })
}