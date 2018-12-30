import {createStore, combineReducers } from 'redux';
import {Comments} from './Comments';

export const ConfigureStore =() =>{
    const store = createStore( 
        combineReducers({
            comments: Comments
        })
    );
    return store;
}