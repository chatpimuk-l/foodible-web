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
import validateRecipe from "../validators/validate-recipe";
import { useLocation } from "react-router-dom";

export const RecipeContext = createContext();

export default function RecipeContextProvider({ children }) {
  const { authUser } = useAuth();
  const navigate = useNavigate();

  const [ingredientList, setIngredientList] = useState([{ id: nanoid() }]);
  const [instructionList, setInstructionList] = useState([{ id: nanoid() }]);
  const [recipe, setRecipe] = useState({});
  const [recipeImage, setRecipeImage] = useState(recipe.image || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const [recipes, setRecipes] = useState([]);

  const recipeImageFileEl = useRef(null);

  const { recipeId, targetUserId } = useParams();

  const [recipeObj, setRecipeObj] = useState({});
  const [writerRecipes, setWriterRecipes] = useState([]);

  const [searchName, setSearchName] = useState("");

  const location = useLocation();
  const currentPath = location.pathname;

  const handleRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (currentPath.includes("/recipe/create")) {
      console.log(3636);
      clearStates();
      // handleRefresh();
      // navigate("/recipe/create", { replace: true });
    }
    if (currentPath.includes("recipe") && currentPath.includes("edit")) {
      console.log(7878);
      fetchRecipe();
    }
  }, [currentPath]);

  useEffect(() => {
    const fetchRecipesBySearchName = async () => {
      try {
        setLoading(true);
        const recipesBySearchName = await recipeApi.getRecipesBySearchName(
          searchName
        );
        setRecipes(recipesBySearchName.data?.recipes);
        setLoading(false);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipesBySearchName();
  }, [searchName]);

  const fetchRecipe = async () => {
    if (recipeId) {
      try {
        console.log("recipeId", recipeId);
        setLoading(true);
        const recipeById = await recipeApi.getRecipeByRecipeId(recipeId);
        const recipesByUserId = await recipeApi.getRecipesByUserId(
          recipeById.data.recipe.userId
        );
        setRecipeObj(recipeById.data.recipe);
        setWriterRecipes(recipesByUserId.data?.recipes);
        setRecipe({
          name: recipeById.data.recipe.name,
          description: recipeById.data.recipe.infos?.[0]?.description || null,
          image: recipeById.data.recipe.infos?.[0]?.image,
          prepTime: recipeById.data.recipe.infos?.[0]?.prepTime,
          cookTime: recipeById.data.recipe.infos?.[0]?.cookTime,
          serving: recipeById.data.recipe.infos?.[0]?.serving,
          tip: recipeById.data.recipe.infos?.[0]?.tip || null,
        });
        setRecipeImage(recipeById.data.recipe.infos?.[0]?.image);
        setIngredientList(recipeById.data.recipe?.ingredients);
        setInstructionList(recipeById.data.recipe?.instructions);
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

  useEffect(() => {
    console.log(2121);
    fetchRecipe();
  }, [recipeId]);

  useEffect(() => {
    console.log(4545);
    fetchRecipe();
  }, []);

  useEffect(() => {
    const fetchRecipesByTargetUserId = async () => {
      if (targetUserId) {
        try {
          setLoading(true);
          const recipesByUserId = await recipeApi.getRecipesByUserId(
            +targetUserId
          );
          setWriterRecipes(recipesByUserId.data?.recipes);
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

  const clearStates = () => {
    console.log(234567);
    setRecipe({});
    setIngredientList([{ id: nanoid() }]);
    setInstructionList([{ id: nanoid() }]);
    setRecipeImage(null);
    setRecipeObj({});
  };

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
    try {
      setLoading(true);
      fetchRecipe();
      navigate(`/profile/${authUser.id}`);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast(err.response?.data.message);
    } finally {
      setError(false);
      setRecipe({});
      setIngredientList([{ id: nanoid() }]);
      setInstructionList([{ id: nanoid() }]);
      setLoading(false);
    }
  };
  const handleCancelEditRecipeForm = (e) => {
    try {
      setLoading(true);
      fetchRecipe();
      navigate(`/recipe/${recipeId}`);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast(err.response?.data.message);
    } finally {
      setError(false);
      setRecipe({});
      setIngredientList([{ id: nanoid() }]);
      setInstructionList([{ id: nanoid() }]);
      setLoading(false);
    }
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

      console.log("recipe", recipe);
      const validateError = validateRecipe({
        ...recipe,
        image: recipe.image,
        ingredients: ingredientList,
        instructions: instructionList,
      });
      console.log("validateError", validateError);
      if (validateError) {
        console.log("error", error);
        console.log("validateError recipe", validateError);
        return setError(validateError);
      }

      const formData = new FormData();
      formData.append("name", recipe.name);
      formData.append("description", recipe.description);
      formData.append("recipeImage", recipe.image);
      formData.append("prepTime", recipe.prepTime);
      formData.append("cookTime", recipe.cookTime);
      formData.append("serving", recipe.serving);
      formData.append("tip", recipe.tip);
      const ingredients = ingredientList.reduce((acc, el) => {
        acc.push({
          ingredient: el.ingredient,
          amount: el.amount,
          unit: el.unit,
        });
        return acc;
      }, []);

      const stringifiedIngredients = JSON.stringify(ingredients);
      formData.append("ingredients", stringifiedIngredients);

      const instructions = instructionList.reduce((acc, el) => {
        acc.push({ instruction: el.instruction, image: el.image });
        return acc;
      }, []);

      const stringifiedInstructions = JSON.stringify(instructions);
      formData.append("instructions", stringifiedInstructions);

      for (let i of instructionList) {
        if (i.image) {
          formData.append("instructionImage", i.image);
        }
      }
      await recipeApi.createRecipe(formData);
      fetchRecipes();
      navigate(`/profile/${authUser.id}`);
      setError({});
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

  const handleSubmitEditRecipeForm = async (e) => {
    try {
      console.log("handleSubmitEditRecipeForm");
      setLoading(true);
      e.preventDefault();

      console.log("recipe", recipe);
      const validateError = validateRecipe({
        ...recipe,
        image: recipe.image,
        ingredients: ingredientList,
        instructions: instructionList,
      });
      console.log("validateError", validateError);
      if (validateError) {
        console.log("error", error);
        console.log("validateError recipe", validateError);
        return setError(validateError);
      }

      const formData = new FormData();
      formData.append("name", recipe.name);
      formData.append("description", recipe.description);
      formData.append("recipeImage", recipe.image);
      formData.append("prepTime", recipe.prepTime);
      formData.append("cookTime", recipe.cookTime);
      formData.append("serving", recipe.serving);
      formData.append("tip", recipe.tip);
      const ingredients = ingredientList.reduce((acc, el) => {
        acc.push({
          ingredient: el.ingredient,
          amount: el.amount,
          unit: el.unit,
        });
        return acc;
      }, []);

      const stringifiedIngredients = JSON.stringify(ingredients);
      formData.append("ingredients", stringifiedIngredients);

      const instructions = instructionList.reduce((acc, el) => {
        acc.push({ instruction: el.instruction, image: el.image });
        return acc;
      }, []);

      const stringifiedInstructions = JSON.stringify(instructions);
      formData.append("instructions", stringifiedInstructions);

      for (let i of instructionList) {
        if (i.image) {
          formData.append("instructionImage", i.image);
        }
      }

      await recipeApi.updateRecipe(recipeId, formData);
      fetchRecipe();
      fetchRecipes();
      navigate(`/recipe/${recipeId}`);
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

  const handleDeleteRecipe = async (e) => {
    try {
      console.log("handleDeleteRecipe");
      setLoading(true);
      e.preventDefault();
      await recipeApi.deleteRecipe(recipeId);
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
    setIngredientList((prev) => [...prev, { id: nanoid() }]);
  };
  const handelAddInstructionList = () => {
    setInstructionList((prev) => [...prev, { id: nanoid() }]);
  };

  const renderIngredientList = ingredientList?.map((el) => (
    <InputIngredient id={el.id} key={el.id} value={el} />
  ));
  const renderInstructionList = instructionList?.map((el) => (
    <InputInstruction id={el.id} key={el.id} value={el} />
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
        setRecipe,
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
        handleCancelEditRecipeForm,
        handleSubmitEditRecipeForm,
        handleDeleteRecipe,
        loading,
        setLoading,
        renderRecipes,
        recipeObj,
        writerRecipes,
        searchName,
        setSearchName,
        error,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}
