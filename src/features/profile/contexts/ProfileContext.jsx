import { createContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import * as userApi from "../../../api/user";
import { useNavigate, useParams } from "react-router-dom";
import validateUserProfile from "../validators/validate-userProfile";
import useAuth from "../../auth/hooks/useAuth";

export const ProfileContext = createContext();

export default function ProfileContextProvider({ children }) {
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState({ bio: "" });
  const [userProfileImage, setUserProfileImage] = useState(userProfile.image);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const { targetUserId } = useParams();

  const userProfileImageFileEl = useRef(null);

  const { authUser } = useAuth();

  const isAuthUserIdMatchTargetUserId = +targetUserId == authUser?.id;

  const handleInputChange = (e) => {
    if (e.target.name === "name") {
      e.target.value = e.target.value.toUpperCase();
    }
    setUserProfile({
      ...userProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageClear = (e) => {
    e.stopPropagation();
    setUserProfile({ ...userProfile, image: null, bio: "" });
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
    try {
      setLoading(true);
      fetchUserProfile();
      setLoading(false);
      navigate(`/profile/${userProfile.id}`);
    } catch (err) {
      console.log(err);
      toast(err.response?.data.message);
    } finally {
      setLoading(false);
      setError({});
    }
  };

  const handleEditFormSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const validateError = validateUserProfile(userProfile);
      if (validateError) {
        console.log("validateError userprofile", validateError);
        return setError(validateError);
      }
      console.log(99999);
      const formData = new FormData();
      formData.append("name", userProfile.name);
      formData.append("email", userProfile.email);
      formData.append("bio", userProfile.bio);
      if (userProfile.image) {
        formData.append("image", userProfile.image);
      }
      const res = await userApi.updateUserByTargetUserId(formData);
      res.data.image = userProfileImage;
      setUserProfile((prev) => ({ ...prev, ...res.data }));
      setError({});
      navigate(`/profile/${userProfile.id}`);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast(err.response?.data.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    if (targetUserId) {
      try {
        setLoading("true");
        console.log("targetUserId", targetUserId);
        const result = await userApi.getUserProfileByTargetUserId(targetUserId);
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

  useEffect(() => {
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
        error,
        isAuthUserIdMatchTargetUserId,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
