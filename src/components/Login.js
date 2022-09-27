import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { user, userDetails } from "../atoms/userAtom";
import { useRecoilState } from "recoil";
import { Button } from "antd";
import { GoogleSquareFilled } from "@ant-design/icons";
import "./Login.css";
import { useQuery } from "react-query";
import { init } from "../apis/LoginApi";
import { fireEvent } from "@testing-library/react";

export function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useRecoilState(user);
  useEffect(() => {
    console.log("after login username is", userName);
  }, [userName]);

  const [userInfo, setuserInfo] = useRecoilState(userDetails);
  useEffect(() => {
    console.log("after login userDeatils is", userInfo);
  }, [userInfo]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user != null) {
        console.log("logged in", auth.currentUser);
        //auth.currentUser=null;
      } else {
        console.log("No User");
      }
    });
  }, [userInfo]);

  const {
    data: userDetailsnew,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(["unique-key"], init, {
    enabled: false, // disable this query from automatically running
  });

  //console.log("Usequery data:",data)
  if (isLoading) {
    <h1>Loading</h1>;
  }
  if (isError) {
    <h1>Error</h1>;
  }
  // useEffect(() => {
  //   console.log("If user isAdmin", userInfo.isAdmin);
  // }, [data]);

  async function googleLogin() {
    console.log("Username before login:", userName);
    //1 - init Google Auth Provider
    const provider = new GoogleAuthProvider();
    //2 - create the popup signIn
    console.log("entered login page");
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = await auth.currentUser?.getIdTokenResult();
        console.log("credentials................", credential.token);
        console.log("result type is:", typeof result.user);
        const token = credential.token;
        //console.log(token);
        localStorage.setItem("google-token-popup-feature", token);
        // The signed-in user info.
        const user = result.user;

        await alert("Authentication Sucessful", user.emailVerified);
        // console.log("Current logged in user details are: ",auth.currentUser)
        // //var { data, isLoading, isFetched } = await refetch();
        // console.log("User Details:", user.displayName);
        // console.log("User Details:", user.email);
        // console.log("User Details:", user.photoURL);

        const { data, isFetched } = await refetch(); //calling init
        if (isFetched && data.user === true) {
          return (
            setuserInfo({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            isAdmin: data.isAdmin,
          }),console.log("User Details for admin:", data?.isAdmin),console.log("Yooo user is here!!", userInfo),navigate("/home")
          
          )
          
        }
        if (isFetched && data.user === false) {
          {
            console.log("data.user", data.user);
          }
          {
            navigate("/");
          }
        }
        console.log(
          "user is not yet present in the db...please create company first"
        );
        //navigate("/");
        // ...
        //useNavigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
    //navigate("/create");
  }

  return (
    <div className="login">
      <div className="login_top">
        <h2>Login to Continue</h2>
      </div>
      <div>
        <Link
          to="/"
          onClick={googleLogin}
          className="login_button"
          style={{ marginLeft: "10px" }}
        >
          <Button type="primary" className="g_btn" ghost>
            <GoogleSquareFilled />
            Sign In
          </Button>
        </Link>
      </div>
    </div>
  );
}
