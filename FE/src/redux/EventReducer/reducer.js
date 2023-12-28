import { CREATE_EVENT_ERROR, CREATE_EVENT_REQUEST,CREATE_EVENT_SUCCESS,ADD_ATTENDEE_ERROR,ADD_ATTENDEE_REQUEST,ADD_ATTENDEE_SUCCESS, GET_EVENT_REQUEST, GET_EVENT_SUCCESS, GET_EVENT_ERROR, REMOVE_ATTENDEE_REQUEST, REMOVE_ATTENDEE_ERROR, REMOVE_ATTENDEE_SUCCESS, GET_ATTENDINGEVENT_REQUEST, GET_ATTENDINGEVENT_SUCCESS, GET_ATTENDINGEVENT_ERROR, GET_HOSTINGEVENT_REQUEST, GET_HOSTINGEVENT_SUCCESS, GET_HOSTINGEVENT_ERROR, GET_SINGLEEVENT_REQUEST, GET_SINGLEEVENT_SUCCESS, GET_SINGLEEVENT_ERROR } from "./actionTypes";

const init= {
    isLoading:false,
    isError: false,
    events:[],
    attendingEvents:[],
    hostingEvents:[],
    message:"",
    singleEvent:{}
}

export const EventReducer = (state=init, {type,payload})=>{
  switch (type){
    case CREATE_EVENT_REQUEST: return {...state, isLoading:true}
    case CREATE_EVENT_SUCCESS: return {...state,isLoading:false, message:payload}
    case CREATE_EVENT_ERROR: return {...state,isLoading:false, isError:true}
    
    case GET_EVENT_REQUEST: return {...state, isLoading:true}
    case GET_EVENT_SUCCESS: return {...state,isLoading:false, events:payload.data}
    case GET_EVENT_ERROR: return {...state,isLoading:false, isError:true}
    case GET_SINGLEEVENT_REQUEST: return {...state, isLoading:true}
    case GET_SINGLEEVENT_SUCCESS: return {...state,isLoading:false, singleEvent:payload.data}
    case GET_SINGLEEVENT_ERROR: return {...state,isLoading:false, isError:true}

    case GET_ATTENDINGEVENT_REQUEST: return {...state, isLoading:true}
    case GET_ATTENDINGEVENT_SUCCESS: return {...state,isLoading:false, attendingEvents:payload.data}
    case GET_ATTENDINGEVENT_ERROR: return {...state,isLoading:false, isError:true}

    case GET_HOSTINGEVENT_REQUEST: return {...state, isLoading:true}
    case GET_HOSTINGEVENT_SUCCESS: return {...state,isLoading:false, hostingEvents:payload.data}
    case GET_HOSTINGEVENT_ERROR: return {...state,isLoading:false, isError:true}

    case ADD_ATTENDEE_REQUEST: return {...state, isLoading:true}
    case ADD_ATTENDEE_SUCCESS: return {...state, isLoading:false, message:"Success"};
    case ADD_ATTENDEE_ERROR: return {...state, isLoading:false,isError:true}

    case REMOVE_ATTENDEE_ERROR: return {...state, isLoading:false,isError:true}
    case REMOVE_ATTENDEE_REQUEST: return {...state, isLoading:true}
    case REMOVE_ATTENDEE_SUCCESS: return {...state, isLoading:false, message:"Success"};
    
    default: return state
  }
}