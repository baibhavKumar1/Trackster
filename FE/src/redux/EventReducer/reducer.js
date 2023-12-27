import { CREATE_EVENT_ERROR, CREATE_EVENT_REQUEST,CREATE_EVENT_SUCCESS,ADD_ATTENDEE_ERROR,ADD_ATTENDEE_REQUEST,ADD_ATTENDEE_SUCCESS, GET_EVENT_REQUEST, GET_EVENT_SUCCESS, GET_EVENT_ERROR } from "./actionTypes";

const init= {
    isLoading:false,
    isError: false,
    events:[],
    message:""
}

export const EventReducer = (state=init, {type,payload})=>{
  switch (type){
    case CREATE_EVENT_REQUEST: return {...state, isLoading:true}
    case CREATE_EVENT_SUCCESS: return {...state,isLoading:false, message:payload}
    case CREATE_EVENT_ERROR: return {...state,isLoading:false, isError:true}
    
    case GET_EVENT_REQUEST: return {...state, isLoading:true}
    case GET_EVENT_SUCCESS: return {...state,isLoading:false, events:payload.data}
    case GET_EVENT_ERROR: return {...state,isLoading:false, isError:true}

    case ADD_ATTENDEE_REQUEST: return {...state, isLoading:true}
    case ADD_ATTENDEE_SUCCESS: return {...state, isLoading:false, message:"Success"};
    case ADD_ATTENDEE_ERROR: return {...state, isLoading:false,isError:true}

    default: return state
  }
}