import {
    FETCH_SINGLE_SUCCESS,
    FETCH_SINGLE_FAILURE,
    UPDATE_COMMENT_SECTION,
    SUMBMIT_COMMENT_SUCCESS,
    SUMBMIT_COMMENT_FAILURE,
} from '../actions';

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
        case SUMBMIT_COMMENT_SUCCESS:
            return { ...state, error: null };
        case SUMBMIT_COMMENT_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        case UPDATE_COMMENT_SECTION:
            console.log(state.data);
            return {
                ...state,
                data: {
                    main: state.data.main,
                    location: state.data.location,
                    comment: action.payload,
                },
                error: null,
                loading: false,
            };

        default:
            return state;
    }
}

export default routeSingleReducer;
