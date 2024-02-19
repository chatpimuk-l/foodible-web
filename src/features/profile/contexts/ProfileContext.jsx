import { createContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import * as userApi from "../../../api/user";
import { useNavigate, useParams } from "react-router-dom";

export const ProfileContext = createContext();

export default function ProfileContextProvider({ children }) {
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState({});
  const [userProfileImage, setUserProfileImage] = useState(userProfile.image);
  const [loading, setLoading] = useState(false);

  const { targetUserId } = useParams();

  const userProfileImageFileEl = useRef(null);

  const handleInputChange = (e) => {
    setUserProfile({
      ...userProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageClear = (e) => {
    e.stopPropagation();
    setUserProfile({ ...userProfile, image: null });
    setUserProfileImage(null);
    userProfileImageFileEl.current.value = "";
  };

  const handleImageChange = (e) => {
    setUserProfile({
      ...userProfile,
      image: e.target.files[0],
    });
    if (e.target?.files[0]) {
      setUserProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleCancel = (e) => {
    navigate(`/profile/${userProfile.id}`);
  };

  const handleEditFormSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", userProfile.name);
      formData.append("email", userProfile.email);
      formData.append("bio", userProfile.bio);
      formData.append("image", userProfile.image);
      const res = await userApi.updateUserByTargetUserId(formData);
      res.data.image = userProfileImage;
      setUserProfile((prev) => ({ ...prev, ...res.data }));
      navigate(`/profile/${userProfile.id}`);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast(err.response?.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (targetUserId) {
        try {
          setLoading("true");
          console.log("targetUserId", targetUserId);
          const result = await userApi.getUserProfileByTargetUserId(
            targetUserId
          );
          setUserProfile(result.data.userProfile);
          setUserProfileImage(result.data.userProfile.image);
          setLoading(false);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchUserProfile();
  }, [targetUserId]);

  return (
    <ProfileContext.Provider
      value={{
        userProfile,
        setUserProfile,
        handleInputChange,
        handleImageClear,
        handleImageChange,
        handleCancel,
        userProfileImage,
        handleEditFormSubmit,
        userProfileImageFileEl,
        loading,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
