import { nanoid } from "nanoid";
import { createContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import InputIngredient from "../components/InputIngredient";
import InputInstruction from "../components/InputInstruction";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../features/auth/hooks/useAuth";
import * as recipeApi from "../../../api/recipe";

export const RecipeContext = createContext();

export default function RecipeContextProvider({ children }) {
  const { authUser } = useAuth();
  const navigate = useNavigate();

  const [ingredientList, setIngredientList] = useState([
    { id: nanoid(), inputs: {} },
  ]);
  const [instructionList, setInstructionList] = useState([
    { id: nanoid(), inputs: {} },
  ]);
  const [recipe, setRecipe] = useState({});
  const [recipeImage, setRecipeImage] = useState(recipe.image || null);
  const [loading, setLoading] = useState(false);

  const recipeImageFileEl = useRef(null);

  const handleRecipeImageChange = (e) => {
    setRecipe({
      ...recipe,
      image: e.target.files[0],
    });
    if (e.target?.files[0]) {
      setRecipeImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleRecipeImageClear = (e) => {
    e.stopPropagation();
    setRecipe({ ...recipe, image: null });
    setRecipeImage(null);
    recipeImageFileEl.current.value = "";
  };

  const handleCancel = (e) => {
    navigate(`/profile/${authUser.id}`);
  };

  const handleIngredientDelete = (id) => {
    setIngredientList(ingredientList.filter((el) => el.id !== id));
  };
  const handleInstructionDelete = (id) => {
    setInstructionList(instructionList.filter((el) => el.id !== id));
  };

  const handleRecipeInputChange = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  };

  const handleRecipeFormSubmit = async (e) => {
    try {
      console.log("handleRecipeFormSubmit");
      setLoading(true);
      e.preventDefault();

      const formData = new FormData();
      formData.append("name", recipe.name);
      formData.append("description", recipe.description);
      formData.append("recipeImage", recipe.image);
      formData.append("prepTime", recipe.prepTime);
      formData.append("cookTime", recipe.cookTime);
      formData.append("serving", recipe.serving);
      formData.append("tip", recipe.tip);
      console.log("ingredientList", ingredientList);
      const ingredients = ingredientList.reduce((acc, el) => {
        acc.push(el.inputs);
        return acc;
      }, []);
      console.log("ingredients", ingredients);
      const stringifiedIngredients = JSON.stringify(ingredients);
      console.log("stringifiedIngredients", stringifiedIngredients);
      formData.append("ingredients", stringifiedIngredients);

      const instructions = instructionList.reduce((acc, el) => {
        acc.push(el.inputs);
        return acc;
      }, []);

      console.log("instructions", instructions);
      const stringifiedInstructions = JSON.stringify(instructions);
      formData.append("instructions", stringifiedInstructions);
      console.log(3);
      console.log("stringifiedInstructions", stringifiedInstructions);

      for (let i of instructionList) {
        if (i.inputs.image) {
          console.log("i.inputs.image", i.inputs.image);
          formData.append("instructionImage", i.inputs.image);
        }
      }
      console.log(4);
      console.log(formData.getAll("instructions"));
      console.log("bf api");
      const res = await recipeApi.createRecipe(formData);
      console.log(res);
      console.log(5);
      //   res.data.image = userProfileImage;
      //   setUserProfile((prev) => ({ ...prev, ...res.data }));
      navigate(`/profile/${authUser.id}`);
      setLoading(false);
    } catch (err) {
      console.log(err);
      console.dir(err);
      console.log(err.response?.data.message);
      toast(err.response?.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handelAddIngredientList = () => {
    setIngredientList((prev) => [...prev, { id: nanoid(), inputs: {} }]);
  };
  const handelAddInstructionList = () => {
    setInstructionList((prev) => [...prev, { id: nanoid(), inputs: {} }]);
  };

  const renderIngredientList = ingredientList?.map((el) => (
    <InputIngredient id={el.id} key={el.id} />
  ));
  const renderInstructionList = instructionList?.map((el) => (
    <InputInstruction id={el.id} key={el.id} />
  ));

  return (
    <RecipeContext.Provider
      value={{
        recipe,
        ingredientList,
        instructionList,
        setIngredientList,
        setInstructionList,
        handleRecipeInputChange,
        handelAddIngredientList,
        handelAddInstructionList,
        handleIngredientDelete,
        handleInstructionDelete,
        renderIngredientList,
        renderInstructionList,
        recipeImage,
        recipeImageFileEl,
        handleRecipeImageChange,
        handleRecipeImageClear,
        handleCancel,
        handleRecipeFormSubmit,
        loading,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}
