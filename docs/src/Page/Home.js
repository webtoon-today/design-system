import React, { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Setting from "./Setting";
import { useSignIn } from "../Hook/useSignIn";


const GOOGLE_ID=window.location.host.endsWith("webtoon.today")
    ?"1093253062710-dh2542i4vf7soiqjji199vcr0i02d7vh.apps.googleusercontent.com"
    :"646791605002-asu7bku1jtui8puu0nsuu47ef3pt83nb.apps.googleusercontent.com";

const Home = () => {
  const {session} = useSignIn();

  return (
    <GoogleOAuthProvider clientId={GOOGLE_ID}>
      <Setting />
    </GoogleOAuthProvider>
  )
}

export default Home;