import { combineReducers } from 'redux';
import {
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE,
    FETCH_SINGLE_SUCCESS,
    FETCH_SINGLE_FAILURE,
    HANDLE_COUNTRY_CHANGE,
    HANDLE_ADD_NEW_LOCATION,
    HANDLE_ADD_NEW_LOCATION_DELETE,
    HANDLE_ADD_NEW_LOCATION_COUNTRY_CHANGE,
    HANDLE_ADD_NEW_LOCATION_UP,
    HANDLE_ADD_NEW_LOCATION_DOWN,
    ADD_NEW_SUCCESS,
    ADD_NEW_FAILURE,
    SET_LOGIN_STATUS
} from '../actions';

function userStatus (state = {loginUser:'', isLogined:false, user_id:'', session_name:'', session_photo:''}, action){
    switch (action.type){
        case SET_LOGIN_STATUS:
            return {
                loginUser: action.payload.loginUser,
                isLogined: action.payload.isLogined,
                user_id: action.payload.user_id,
                session_name: action.payload.session_name,
                session_photo: action.payload.session_photo,
            }
        default:
            return state;
    }

}

const INITIAL_STATE = { postsList: { posts: [], error: null, loading: false } };

function routeReducer(state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                postsList: {
                    posts: [...state.postsList.posts, ...action.payload],
                    error: null,
                    loading: false,
                    page: action.page,
                },
            };
        case FETCH_POSTS_FAILURE:
            error = action.payload || { message: action.payload.message };
            return {
                ...state,
                postsList: { posts: [], error: error, loading: false },
            };
        default:
            return state;
    }
}

function routeSingleReducer(
    state = { data: [], error: null, loading: false },
    action
) {
    let error;
    switch (action.type) {
        case FETCH_SINGLE_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
                loading: false,
            };
        case FETCH_SINGLE_FAILURE:
            error = action.payload || { message: action.payload.message };
            return {
                ...state,
                data: [],
                error: error,
                loading: false,
            };
        default:
            return state;
    }
}

function routeCountryChange(state = { areas: [] }, action) {
    switch (action.type) {
        case HANDLE_COUNTRY_CHANGE:
            return {
                ...state,
                areas: action.payload,
            };
        default:
            return state;
    }
}

function arraymove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
}

function routeAddNewLocation(state = { locationList: [] }, action) {
    switch (action.type) {
        case HANDLE_ADD_NEW_LOCATION:
            return {
                ...state,
                locationList: [
                    ...state.locationList,
                    { num: +new Date(), areas: [] },
                ],
            };
        case HANDLE_ADD_NEW_LOCATION_DELETE:
            let b = [...state.locationList].filter(
                i => i.num !== action.payload
            );

            return {
                ...state,
                locationList: b,
            };
        case HANDLE_ADD_NEW_LOCATION_COUNTRY_CHANGE:
            let c = [...state.locationList].findIndex(
                i => i.num === action.num
            );

            let d = [...state.locationList];
            d[c].areas = action.payload;
            return {
                ...state,
                locationList: d,
            };
        case HANDLE_ADD_NEW_LOCATION_UP:
            console.log('reducer up');
            let e = [...state.locationList];
            let f = e.findIndex(i => i.num === action.num);
            // arrayMove(e, f, f - 1);
            arraymove(e, f, f - 1);

            return {
                ...state,
                locationList: e,
            };
        case HANDLE_ADD_NEW_LOCATION_DOWN:
            console.log('reducer down');
            let g = [...state.locationList];
            let h = g.findIndex(i => i.num === action.num);
            arraymove(g, h, h + 1);

            return {
                ...state,
                locationList: g,
            };
        case ADD_NEW_SUCCESS:
            return {
                locationList: [...state.locationList],
                success: true,
            };
        case ADD_NEW_FAILURE:
            return {
                ...state,
                locationList: [...state.locationList],
                success: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export default combineReducers({
    routeReducer,
    routeSingleReducer,
    routeCountryChange,
    routeAddNewLocation,
});
