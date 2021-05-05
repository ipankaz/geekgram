import {combineReducers} from 'redux'
import authReducer from './auth.reducer'
import postReducer from './post.reducer'
import searchedUserReducer from './searchedUser'
import userReducer from './user.reducer'

const rootReducer = combineReducers({
   auth:authReducer,
   user:userReducer,
   post:postReducer,
   searchedUser:searchedUserReducer
})

export default rootReducer