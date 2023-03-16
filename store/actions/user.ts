import { userSliceAction } from "..";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { AppThunk } from "..";
import { BASE_URL } from "../../utils";
export const userLoginAndDataBase = (response: any) => {
  return async (dispatch: any) => {
    // dispatch(videoSliceAction.load_videos)

    // const { data } = await axios.get(`http://localhost:3000/api/post`);
    dispatch(userSliceAction.createOrGetUser(response));
    const decode: { name: string; picture: string; sub: string } = jwt_decode(
      response.credential
    );
    const { name, picture, sub } = decode;
    const user = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };
    try {
      const res = await axios.post(`${BASE_URL}/api/auth`, user);

    } catch (error) {
      console.log(error);
    }
    try {

      
      const users = await axios.get(`${BASE_URL}/api/users`)

      
      dispatch(userSliceAction.addAllUsers(users.data))
    } catch (error) {
      console.log(error);
      
      
    }
  };
};
