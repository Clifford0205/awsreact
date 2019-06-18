import {
    HANDLE_COUNTRY_CHANGE,
} from '../actions';

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
export default routeCountryChange;