import { videoSliceAction } from "..";
import axios from 'axios'
import { BASE_URL } from "../../utils";


export const loadVideo = (topic:string) => {
    return async(dispatch: any) => {
        // dispatch(videoSliceAction.load_videos)
        try{
            
            if(topic){
                console.log('searchfor.....................');
                let response = null 
                response = await axios.get(`${BASE_URL}/api/discover/${topic}`)
                dispatch(videoSliceAction.load_video_success(response.data))
            }else{
                
                let response = null 
                response = await axios.get(`${BASE_URL}/api/post`)
                dispatch(videoSliceAction.load_video_success(response.data))
            }
            
            
            
        }catch(error){

        }
    }
}