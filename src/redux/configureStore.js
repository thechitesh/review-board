import {createStore, combineReducers } from 'redux';
import {Positive} from './Positive';
import {Negative} from './Negative';


export const ConfigureStore =() =>{
    const store = createStore( 
        combineReducers({
            positive: Positive,
            negative: Negative
        })
    );
    return store;
}