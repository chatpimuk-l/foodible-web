import axios from "../config/axios";

export const register = (user) => axios.post("/auth/register", user);

export const login = (user) => axios.post("auth/login", user);

export const fetchMe = () => axios.get("/auth/me");
