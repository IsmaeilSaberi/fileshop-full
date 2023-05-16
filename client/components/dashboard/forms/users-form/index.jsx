"use client";
import { useState, useEffect } from "react";
import AllUsers from "./all-users";
import FindUser from "./find-user";
import UserDetails from "./user-details";

const UserMain = () => {
  const [userDetailCtrl, setUserDetailCtrl] = useState("");
  const [randNumForUserClick, setRandNumForUserClick] = useState(1);
  const [details, setDetails] = useState(
    <AllUsers
      setRandNumForUserClick={setRandNumForUserClick}
      setUserDetailCtrl={setUserDetailCtrl}
    />
  );

  useEffect(() => {
    if (userDetailCtrl != "") {
      setDetails(<UserDetails userId={userDetailCtrl} />);
    }
  }, [randNumForUserClick]);

  return (
    <div className="flex flex-col gap-8">
      <section className="flex justify-between items-center gap-4">
        <h1 className="text-blue-500 text-lg">کاربر ها</h1>
        <div className="flex justify-end items-center gap-2">
          <button
            onClick={() =>
              setDetails(
                <AllUsers
                  setRandNumForUserClick={setRandNumForUserClick}
                  setUserDetailCtrl={setUserDetailCtrl}
                />
              )
            }
            className="flex justify-center items-center w-32 h-10 rounded-md bg-indigo-500 text-white transition-all duration-200 hover:bg-orange-500"
          >
            همه
          </button>
          <button
            onClick={() =>
              setDetails(
                <FindUser
                  setRandNumForUserClick={setRandNumForUserClick}
                  setUserDetailCtrl={setUserDetailCtrl}
                />
              )
            }
            className="flex justify-center items-center w-32 h-10 rounded-md bg-indigo-500 text-white transition-all duration-200 hover:bg-orange-500"
          >
            پیدا کردن کاربر
          </button>
        </div>
      </section>
      <section>{details}</section>
    </div>
  );
};

export default UserMain;
