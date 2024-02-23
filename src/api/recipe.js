import axios from "../config/axios";

export const createRecipe = (formData) => axios.post(`/recipes`, formData);

export const updateRecipe = (recipeId, formData) =>
  axios.put(`/recipes/${recipeId}`, formData);

export const deleteRecipe = (recipeId) => axios.delete(`/recipes/${recipeId}`);

export const getRecipes = () => axios.get("/recipes");

export const getRecipeByRecipeId = (recipeId) =>
  axios.get(`/recipes/${recipeId}`);

export const getRecipesByUserId = (userId) =>
  axios.get(`/recipes/users/${userId}`);

export const getRecipesByUserIdFav = (userId) =>
  axios.get(`/recipes/favs/${userId}`);

export const getRecipesBySearchName = (searchName) =>
  axios.get(`/recipes/?name=${searchName}`);

export const getRecipesByInclude = (includeList) =>
  axios.get(`/recipes/?include=${includeList}`);

export const getRecipesByNameAndInclude = (searchName, includeList) =>
  axios.get(`/recipes/?name=${searchName}&include=${includeList}`);
