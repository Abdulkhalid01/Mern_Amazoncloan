import {getProductsreduser} from './Productreduser'
import {combineReducers} from "redux"


const rootreducers = combineReducers({
    getProductsdata:getProductsreduser
})

export default rootreducers;