import { createContext, useEffect, useState } from "react";

import * as userApi from "../../../api/user";
import { useParams } from "react-router-dom";

export const ProfileContext = createContext();

export default function ProfileContextProvider({ children }) {
  const [userProfile, setUserProfile] = useState({});

  const { targetUserId } = useParams();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const result = await userApi.getUserProfileByTargetUserId(targetUserId);
        setUserProfile(result.data.userProfile);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserProfile();
  }, [targetUserId]);

  return (
    <ProfileContext.Provider value={{ userProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}
