import { BASE_URL } from "../../utils";
import React, { useState } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { IUser, Video } from "../../types";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { AppState } from "../../store";

const Search = ({ videos }: { videos: Video[] }) => {
  const router = useRouter();
  const { searchTerm }: any = router.query;
  const [showVideos, setShowUserVideos] = useState(true);
  const isVideos = showVideos ? "border-b-2 border-black" : "text-gray-400";
  const isAccount = !showVideos ? "border-b-2 border-black" : "text-gray-400";
  const user = useSelector((state: AppState) => state.user);
  const { all_users } = user;
  const searchedAccounts = all_users.filter((user: IUser) =>
    user.userName.toLocaleLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="w-full">
      <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
          onClick={() => {
            setShowUserVideos(true);
          }}
        >
          Videos
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${isAccount}`}
          onClick={() => {
            setShowUserVideos(false);
          }}
        >
          Accounts
        </p>
      </div>
      {showVideos ? (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
          {videos.length ? (
            videos.map((video, index) => (
              <VideoCard key={index} post={video}></VideoCard>
            ))
          ) : (
            <NoResults text="No Videos Found"></NoResults>
          )}
        </div>
      ) : (
        <div className="md:mt-16">
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: IUser, index: number) => (
              <Link href={`/profile/${user._id}`} key={index} >
                <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200">
                  <div>
                    <Image
                      src={user.image}
                      width={50}
                      height={50}
                      alt={user.userName}
                      className="rounded-full"
                    />
                  </div>
                  <div className="hidden xl:block ">
                    <p className="flex gap-1 items-center font-bold text-md text-primary lowercase">
                      {user.userName.replaceAll(" ", "")}
                      <GoVerified className="text-blue-400"></GoVerified>
                    </p>
                    <p className="capitalize text-gray-400 text-xs">
                      {user.userName}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResults text="No Accounts Found"></NoResults>
          )}
        </div>
      )}
    </div>
  );
};
export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);
  return {
    props: {
      videos: res.data,
    },
  };
};
export default Search;
