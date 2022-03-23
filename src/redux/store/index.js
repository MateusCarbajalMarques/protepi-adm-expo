import { createStore } from 'redux';

const INITIAL_STATE = {
    usuario: {},
}

function reducer(state = INITIAL_STATE, action) {

    if(action.type === 'SET_USUARIO')
	{
		return { ...state, usuario: action.usuario };
    }


    return state;
}

const store = createStore(reducer);

export default store;