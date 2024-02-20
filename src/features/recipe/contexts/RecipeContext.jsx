import { nanoid } from "nanoid";
import { createContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import InputIngredient from "../components/InputIngredient";
import InputInstruction from "../components/InputInstruction";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../features/auth/hooks/useAuth";
import * as recipeApi from "../../../api/recipe";
import HorizontalCard from "../../../components/HorizontalCard";
import { useParams } from "react-router-dom";

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

  const [recipes, setRecipes] = useState([]);

  const recipeImageFileEl = useRef(null);

  const { recipeId, targetUserId } = useParams();

  const [recipeObj, setRecipeObj] = useState({});
  const [writerRecipes, setWriterRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (recipeId) {
        try {
          setLoading(true);
          console.log("lll");
          const recipeById = await recipeApi.getRecipeByRecipeId(recipeId);
          const recipesByUserId = await recipeApi.getRecipesByuserId(
            recipeById.data.recipe.userId
          );
          setRecipeObj(recipeById.data.recipe);
          setWriterRecipes(recipesByUserId.data?.recipes);
          console.log("ooo");
          setLoading(false);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
          console.log("recipeObj", recipeObj);
          console.log("writerRecipes", writerRecipes);
        }
      }
    };
    fetchRecipe();
  }, [recipeId]);

  useEffect(() => {
    const fetchRecipesByTargetUserId = async () => {
      if (targetUserId) {
        try {
          setLoading(true);
          console.log("lllhhh");
          const recipesByUserId = await recipeApi.getRecipesByuserId(
            +targetUserId
          );
          setWriterRecipes(recipesByUserId.data?.recipes);
          console.log("ooohhh");
          setLoading(false);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
          console.log("writerRecipes", writerRecipes);
        }
      }
    };
    fetchRecipesByTargetUserId();
  }, [targetUserId]);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const res = await recipeApi.getRecipes();
      setRecipes(res.data.recipes);
      setLoading(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

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
      const ingredients = ingredientList.reduce((acc, el) => {
        acc.push(el.inputs);
        return acc;
      }, []);

      const stringifiedIngredients = JSON.stringify(ingredients);
      formData.append("ingredients", stringifiedIngredients);

      const instructions = instructionList.reduce((acc, el) => {
        acc.push(el.inputs);
        return acc;
      }, []);

      const stringifiedInstructions = JSON.stringify(instructions);
      formData.append("instructions", stringifiedInstructions);

      for (let i of instructionList) {
        if (i.inputs.image) {
          formData.append("instructionImage", i.inputs.image);
        }
      }
      await recipeApi.createRecipe(formData);
      fetchRecipes();
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

  const renderRecipes = recipes?.map((el) => (
    <HorizontalCard
      id={el.id}
      key={el.id}
      name={el.name}
      recipeImage={el.infos?.[0]?.image}
    />
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
        setLoading,
        renderRecipes,
        recipeObj,
        writerRecipes,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}
