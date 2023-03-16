import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { useSelector } from "react-redux";
import { AppState } from "../store";
import NoResults from "./NoResults";
import { IUser } from "../types";
interface IProps {
  isPostingComments: boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[];
}
interface IComment {
  comment: string;
  _key: string;
  length?: number
  postedBy: {
    _ref: string;
    _id:string
  };
}
const Comments = ({
  isPostingComments,
  comment,
  setComment,
  addComment,
  comments,
}: IProps) => {
  const user = useSelector((state: AppState) => state.user);
  const isPostingComment = false;
  const { currentUser, all_users }: any = user;
  return (
    <div className="border-t-2 border-gray-200 pt-2 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[475x]">
        {comments?.length ? (
          comments.map((item, index) => (
            
            <>
              {all_users.map(
                (user: IUser) =>
                  user._id === (item.postedBy._ref || item.postedBy._id) && (
                    <div className="p-2 items-center" key={index}>
                      <Link href={`/profile/${user._id}`}>
                        <div className="flex gap-3 cursor-pointer">
                        <div className="w-8 h-8">
                          <Image
                            src={user.image}
                            width={34}
                            height={34}
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
                      <div className=""><p>{item.comment}</p></div>
                    </div>
                  )
              )}
            </>
          ))
        ) : (
          <NoResults text="No Comments"></NoResults>
        )}
      </div>
      {currentUser._id && (
        <div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10">
          <form onSubmit={addComment} className="flex gap-4">
            <input
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              placeholder="Add Comment..."
              className="bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-gray-300 focus:border-2 flex-1 rounded-lg"
            />
            <button className="text-md text-gray-400" onClick={addComment}>
              {isPostingComments ? "Commenting..." : "Comment"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
