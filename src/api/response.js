import axios from "../config/axios";

export const createResponse = (recipeId, data) =>
  axios.post(`/responses/${recipeId}`, data);

export const getResponseByRecipeId = (recipeId) =>
  axios.get(`/responses/${recipeId}`);
