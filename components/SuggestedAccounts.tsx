import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { useSelector } from "react-redux";
import { AppState } from "@/store";
import { IUser } from "../types";
const SuggestedAccounts = () => {
  const user = useSelector((state: AppState) => state.user);

  const { all_users }: any = user;
  return (
    <div className="xl:border-b-2 border-gray-200 pb-4">
      <p className="text-gray-300 hidden xl:block font-semibold m-3 mt-4">
        Suggested Accounts
      </p>
      <div>
        {all_users.slice(0, 6).map((user: IUser) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded">
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
        ))}
      </div>
    </div>
  );
};

export default SuggestedAccounts;
