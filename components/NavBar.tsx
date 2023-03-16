import React,{useState} from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import Logo from "../utils/jaydenPlus.png";
import { AppState, userSliceAction } from "../store";
import { userLoginAndDataBase } from "../store/actions/user";
import { Action, AnyAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { AiOutlineLogout } from "react-icons/ai";
const NavBar = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('')
  const user = useSelector((state: AppState) => state.user);
  const router = useRouter()
  const { currentUser }: any = user;
  
  const handleSearch = (e : {preventDefault: ()=> void}) => {
    e.preventDefault()
    if(searchValue){
      router.push(`/search/${searchValue}`)
      setSearchValue('')
    }
  };
  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[130px] md:h-[30px] h-[38px]">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="tiktik"
            layout="responsive"
          ></Image>
        </div>
      </Link>
      <div className="relative hidden md:block">
        <form
          onSubmit={handleSearch}
          className="absolute md:static top-10 left-20 bg-white"
        >
          <input
            className="bg-primary p-3 md:text-md font-medium border-2 border-gray-200 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full md:top-0"
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search accounts and videos"
          ></input>
          <button
            onClick={handleSearch}
            className="absolute md:right-5 right-6 top-4 border-gray-300 pl-4 text-2xl text-gray-400 border-l-2"
          >
            <BiSearch></BiSearch>
          </button>
        </form>
      </div>
      <div>
        {currentUser._id ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                <IoMdAdd className="text-xl"></IoMdAdd>
                {` `}
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {currentUser.image && (
              <Link href="/">
                <>
                  <Image
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                    src={currentUser.image}
                    alt="profile photo"
                  ></Image>
                </>
              </Link>
            )}
            <button
              type="button"
              className="px-2"
              onClick={() => {
                googleLogout();
                dispatch(userSliceAction.removeUser());
              }}
            >
              <AiOutlineLogout color="red" fontSize={21}></AiOutlineLogout>
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response: any) =>
              dispatch<any>(userLoginAndDataBase(response))
            }
            onError={() => console.log("error")}
          />
        )}
      </div>
    </div>
  );
};

export default NavBar;
