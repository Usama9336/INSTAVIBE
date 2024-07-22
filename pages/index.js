import Header from "@/components/Header"
import { getProviders, signIn } from "next-auth/react"
import Image from "next/image"
import google from '@/assets/google.gif'
import { useRouter } from "next/router"
import instagram from '@/assets/instagram.png'
import React from "react";
import { auth } from "../Firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom"
import Router from "next/router"


const SignIn = () => {

  const router=useRouter()
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
     router.push("/auth/Firstpage"); 
    try {
      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="pt-[0.1rem] h-screen bg-gradient-to-r from-sky-500 to-fuchsia-500 ">
          <div className="flex flex-col items-center mt-[10rem]">
           <div className="shadow-2xl hover:scale-[120%] rounded-[6px] p-[2rem] duration-500">
            <div className="w-[19rem] h-[6rem]">
              <img alt=""  src={instagram.src} className="mt-[1rem] w-[18rem] h-[4.5rem]"/>
            </div>
            <div className="flex gap-5 font-semibold text-lg rounded-full items-center bg-[white] p-2 mt-[1.8rem]" >
         <img src={google.src} alt="" className="w-[4rem] h-[3.5rem] mt-[-18px]"/>
          <button onClick={signInWithGoogle}>
            Sign in with Google
          </button>
          </div>
          </div>
          </div>
        </div>
    </div>
  );
};

export default SignIn;


{/*export default function SignIn({ providers }) {
  return (
    <>{Object.values(providers).map((provider) => (
        <div key={provider.name} className="pt-[0.1rem] h-screen bg-gradient-to-r from-sky-500 to-fuchsia-500 ">
          <div className="flex flex-col items-center mt-[10rem]">
           <div className="shadow-2xl hover:scale-[120%] rounded-[6px] p-[2rem] duration-500">
            <div className="w-[19rem] h-[6rem]">
              <img alt=""  src={instagram.src} className="mt-[1rem] w-[18rem] h-[4.5rem]"/>
            </div>
            <div className="flex gap-5 font-semibold text-lg rounded-full items-center bg-[white] p-2 mt-[1.8rem]">
         <img src={google.src} alt="" className="w-[4rem] h-[3.5rem] mt-[-18px]"/>
          <button onClick={() => signIn(provider.id,{callbackUrl:"/auth/Firstpage"})}>
            Sign in with {provider.name}
          </button>
          </div>
          </div>
          </div>
        </div>
      ))}
      
    </>
  )
}

export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}*/}

// components/SignIn.js

