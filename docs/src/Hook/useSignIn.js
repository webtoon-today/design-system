import ss, { nullSession } from "../Data/Session";
import { useCallback, useState } from "react";

export const useSignIn = () => {
  const [session, setSession] = useState(()=>ss.getCurrentSession());

  const GoogleSignin = useCallback(async (response) => {
    const newSession = await ss.GoogleSignin(response);

    setSession(newSession);
    if(newSession.userid){
      return newSession;
    } else{
      return nullSession;
    }
  }, [setSession]);

  const logout = useCallback(async () => {
    const newSession = await ss.logout();
    setSession(newSession);
  }, [setSession]);

  return {
    GoogleSignin,
    logout,
    session
  }
}
