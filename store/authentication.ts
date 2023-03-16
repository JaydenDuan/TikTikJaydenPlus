import { createOrGetUser } from "@/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwt_decode from 'jwt-decode'
type userState = {
    all_users: any[],
    currentUser: object
  };
const initialUserState = {
   all_users:[],
   currentUser: {}

}



const userSlice = createSlice({
    name:"user",
    initialState:initialUserState,
    reducers:{
        createOrGetUser(state, action){
            const decode:{name:string, picture:string, sub:string} = jwt_decode(action.payload.credential)
            const {name, picture, sub} = decode
            const currentUser = {
                _id:sub,
                _type:'user',
                userName:name,
                image: picture   
            }
     
            
            return { ...state, currentUser: currentUser}
        },
        removeUser(state){
            state.currentUser={}
            return state
        },
        addAllUsers(state, action){
            return { ...state, all_users: action.payload}
        }

        
    }
})


export default userSlice