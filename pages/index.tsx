import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { loadVideo } from "../store/actions/video";
import { videoSliceAction } from "../store";
import { useEffect } from "react";
import { wrapper } from "../store";
import { Video } from "../types";
import VideoCard from "../components/VideoCard";
import NoResults from "../components/NoResults";

export default function Home({ data }: any) {
  // const { data, error, loading } = useSelector(
  //   (state: RootState) => state.video
  // );

  const videos = data;
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos.map((video: any) => <VideoCard post={video} key={video.id} />)
      ) : (
        <NoResults text={"No Videos"}></NoResults>
      )}
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store: any): any => {
    return async ({query: {topic}}: {query:{topic:string}}) => {
      await store.dispatch(loadVideo(topic));
      const res = store.getState();

      return {
        props: {
          data: res.video.data,
        },
      };
    };
  }
);
