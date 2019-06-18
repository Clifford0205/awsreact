import {
    SET_LOGIN_STATUS
} from '../actions';

// function userStatus (state = {loginUser:'', isLogined:false, user_id:'', session_name:'', session_photo:''}, action){console.log('in userStatus Reducer')
// console.log(action.payload)
//     switch (action.type){
//         case SET_LOGIN_STATUS:
//             return {
//                ...action.payload
//                 // loginUser: action.payload.loginUser,
//                 // isLogined: action.payload.isLogined,
//                 // user_id: action.payload.user_id,
//                 // session_name: action.payload.session_name,
//                 // session_photo: action.payload.session_photo,
//             }
//         default:
//             return state;
//     }

// }

function userStatus(state = {loginUser:'', isLogined:false, user_id:'', session_name:'', session_photo:''}, action) {console.log('in userStatus Reducer')
console.log(action.payload)
    switch (action.type) {
        case SET_LOGIN_STATUS:
            return {
                ...state,
                loginUser: action.payload.loginUser,
                isLogined: action.payload.isLogined,
                user_id: action.payload.user_id,
                session_name: action.payload.session_name,
                session_photo: action.payload.session_photo,
            };
    
        default:
            return state;
    }
}

export default userStatus; 