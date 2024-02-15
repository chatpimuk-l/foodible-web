import axios from "../config/axios";

export const getUserProfileByTargetUserId = (targetUserId) =>
  axios.get(`/users/${targetUserId}/profile`);

export const updateUserByTargetUserId = (formData) =>
  axios.patch(`/users`, formData);
