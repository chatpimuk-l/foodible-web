import axios from "../config/axios";

export const createRecipe = (formData) => {
  console.log("in api");
  console.log("formdata", formData.getAll("image"));
  return axios.post(`/recipes`, formData);
};
