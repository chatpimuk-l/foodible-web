import { useContext } from "react";
import { RecipeContext } from "../contexts/RecipeContext";

export default function useRecipe() {
  return useContext(RecipeContext);
}
