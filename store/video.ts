import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type videoState = {
  loading: boolean;
  error: string | null;
  data: any[];
  detailPage: object;
};

const initialVideoState: videoState = {
  loading: false,
  error: null,
  data: [],
  detailPage: {},
};

const videoSlice = createSlice({
  name: "video",
  initialState: initialVideoState,
  reducers: {
    load_videos(state, action) {
      return { loading: true, error: null, data: [], detailPage: {} };
    },
    load_video_success(state:videoState, action: PayloadAction<any[]>) {
      const tempData = action.payload;
      const nextState = {
        ...state,
        data:action.payload
      }

      
      return nextState
    },
    load_video_error(state, action: PayloadAction<string | null>) {
      return {
        loading: false,
        error: action.payload,
        data: [],
        detailPage: {},
      };
    },
    load_single_video(state: videoState, action: PayloadAction<string>) {


      const temp = state.data.find((video) => video._id === action.payload);
      state.detailPage = temp
    },
  },
});

export default videoSlice;
