import {
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE,
    CLEAR_POSTS_BEFORE,
    HANDLE_CURRENT_PAGE,
    FETCH_POPULAR_SUCCESS,
    FETCH_POPULAR_FAILURE,
    CHANGE_HEART_NUMBER,
} from '../actions';

const INITIAL_STATE = {
    postsList: { posts: [], error: null, loading: false },
    currentState: 'newest',
};

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
        case FETCH_POPULAR_SUCCESS:
            return {
                ...state,
                postsList: {
                    posts: [...state.postsList.posts, ...action.payload],
                    error: null,
                    loading: false,
                    page: action.page,
                },
            };
        case FETCH_POPULAR_FAILURE:
            error = action.payload || { message: action.payload.message };
            return {
                ...state,
                postsList: { posts: [], error: error, loading: false },
            };
        case CLEAR_POSTS_BEFORE:
            return {
                ...state,
                postsList: { posts: [], error: null, loading: false },
            };
        case HANDLE_CURRENT_PAGE:
            return {
                ...state,
                currentState: action.payload,
                postsList: { posts: [], error: error, loading: false },
            };
        case CHANGE_HEART_NUMBER:
            let index = state.postsList.posts.findIndex(
                element => element.r_sid === action.rsid
            );
            let postsarr = state.postsList.posts;
            postsarr[index] = {
                ...state.postsList.posts[index],
                r_collect_num: action.number,
            };
            return {
                ...state,
                postsList: { posts: postsarr, error: error, loading: false },
            };
        default:
            return state;
    }
}
export default routeReducer;
