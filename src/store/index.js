import {configureStore} from '@reduxjs/toolkit'
import heroes from '../components/heroesList/heroesSlice'
import filters from '../components/heroesFilters/filterSlice'

const stringMiddleware = ({dispatch,getState}) => (next) => (action) => {
    if(typeof action === 'string'){
        return next({
            type: action
        })
    }else{
        return next(action)
    }
};

const store = configureStore({
    reducer:{
        heroes,
        filters
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools:process.env.NODE_ENV !== 'production',
})
export default store;