import axios from "../config/axios";

export const createRecipe = (formData) => axios.post(`/recipes`, formData);

export const getRecipes = () => axios.get("/recipes");

export const getRecipeByRecipeId = (recipeId) =>
  axios.get(`/recipes/${recipeId}`);

export const getRecipesByuserId = (userId) =>
  axios.get(`/recipes/users/${userId}`);
