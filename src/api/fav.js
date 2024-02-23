import axios from "../config/axios";

export const handleFav = (recipeId) => axios.post(`/favs/${recipeId}`);
