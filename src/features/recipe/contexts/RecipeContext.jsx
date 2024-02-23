import { nanoid } from "nanoid";
import { createContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import InputIngredient from "../components/InputIngredient";
import InputInstruction from "../components/InputInstruction";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../features/auth/hooks/useAuth";
import * as recipeApi from "../../../api/recipe";
import * as favApi from "../../../api/fav";
import * as responseApi from "../../../api/response";
import HorizontalCard from "../../../components/HorizontalCard";
import { useParams } from "react-router-dom";
import validateRecipe from "../validators/validate-recipe";
import IncludeButton from "../components/IncludeButton";
import VerticalCard from "../../../components/VerticalCard";

export const RecipeContext = createContext();

export default function RecipeContextProvider({ children }) {
  const { authUser } = useAuth();
  const navigate = useNavigate();

  const [ingredientList, setIngredientList] = useState([{ id: nanoid() }]);
  const [instructionList, setInstructionList] = useState([{ id: nanoid() }]);
  const [recipe, setRecipe] = useState({ description: "", tip: "" });
  const [recipeImage, setRecipeImage] = useState(recipe.image || null);
  const [recipes, setRecipes] = useState([]);
  const [recipeObj, setRecipeObj] = useState({});
  const [writerRecipes, setWriterRecipes] = useState([]);
  const [favRecipes, setFavRecipes] = useState([]);

  const [searchName, setSearchName] = useState("");
  const [include, setInclude] = useState("");
  const [includeObj, setIncludeObj] = useState({
    id: nanoid(),
    ingredient: "",
  });
  const [includeList, setIncludeList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isRecipeBelongToAuthUser, setIsRecipeBelongToAuthUser] =
    useState(false);
  const [isFav, setIsFav] = useState(false);
  const [ratingsValue, setRatingsValue] = useState({});

  const recipeImageFileEl = useRef(null);
  const { recipeId, targetUserId } = useParams();

  const clearStates = () => {
    setRecipe({ description: "", tip: "" });
    setRecipeObj({});
    setRecipeImage(null);
    setIngredientList([{ id: nanoid() }]);
    setInstructionList([{ id: nanoid() }]);
    setRatingsValue({});
  };

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

  const compareIngredientMatch = (a, b) => {
    if (a.ingredients > b.ingredients) return -1;
    return 1;
  };
  const sortByIngredientMatch = (unorderedArray) =>
    unorderedArray.sort(compareIngredientMatch);

  const fetchRecipesByInclude = async () => {
    try {
      setLoading(true);
      const newIncludeList = includeList.reduce((acc, cur) => {
        acc.push(cur.ingredient);
        return acc;
      }, []);
      const stringifiedIncludeList = JSON.stringify(newIncludeList);
      console.log("stringifiedIncludeList", stringifiedIncludeList);
      const recipesByInclude = await recipeApi.getRecipesByInclude(
        stringifiedIncludeList
      );
      console.log("recipesByInclude", recipesByInclude);
      const editedRecipesByInclude = recipesByInclude.data?.recipes?.map(
        (el) => ({
          id: el.id,
          name: el.name,
          infos: [{ image: el.infos?.[0].image }],
          ingredients: el.ingredients,
        })
      );
      sortByIngredientMatch(editedRecipesByInclude);
      setRecipes(editedRecipesByInclude);
      setLoading(false);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipesByNameAndInclude = async () => {
    try {
      setLoading(true);
      const newIncludeList = includeList.reduce((acc, cur) => {
        acc.push(cur.ingredient);
        return acc;
      }, []);
      const stringifiedIncludeList = JSON.stringify(newIncludeList);
      console.log("stringifiedIncludeList", stringifiedIncludeList);
      const recipesByInclude = await recipeApi.getRecipesByNameAndInclude(
        searchName,
        stringifiedIncludeList
      );
      console.log("recipesByInclude", recipesByInclude);
      const editedRecipesByInclude = recipesByInclude.data?.recipes?.map(
        (el) => ({
          id: el.id,
          name: el.name,
          infos: [{ image: el.infos?.[0].image }],
          ingredients: el.ingredients,
        })
      );
      sortByIngredientMatch(editedRecipesByInclude);
      setRecipes(editedRecipesByInclude);
      setLoading(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

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

  const fetchRecipesByTargetUserId = async () => {
    if (targetUserId) {
      try {
        setLoading(true);
        const recipesByUserId = await recipeApi.getRecipesByUserId(
          +targetUserId
        );
        setWriterRecipes(recipesByUserId.data?.recipes);
        console.log("favRecipes", favRecipes);
        if (authUser) {
          const recipesByUserIdFav = await recipeApi.getRecipesByUserIdFav(
            authUser.id
          );
          setFavRecipes(recipesByUserIdFav.data?.recipes);
        }
        console.log("favRecipes2", favRecipes);
        setLoading(false);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
        console.log("writerRecipes", writerRecipes);
      }
    }
  };

  const fetchRecipe = async () => {
    if (recipeId) {
      try {
        console.log("recipeId", recipeId);
        setLoading(true);
        const recipeById = await recipeApi.getRecipeByRecipeId(recipeId);
        const recipesByUserId = await recipeApi.getRecipesByUserId(
          recipeById.data.recipe.userId
        );
        const recipeRatings = await responseApi.getRatingsByRecipeId(recipeId);
        setRatingsValue(recipeRatings.data?.ratings);
        console.log("recipeRatings", recipeRatings);
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
        setIsRecipeBelongToAuthUser(
          recipeById.data.recipe?.userId === authUser?.id
        );
        if (authUser) {
          console.log("recipeById", recipeById);
          const recipeFavList = recipeById.data.recipe?.favs;
          const isAuthUserFav =
            recipeFavList.findIndex((el) => el.userId === authUser.id) !== -1;
          setIsFav(isAuthUserFav);
          console.log("isAuthUserFav", isAuthUserFav);
        } else {
          setIsFav(false);
        }
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

  const isInclude = includeList.length !== 0;
  useEffect(() => {
    console.log("in useeff");
    if (searchName && isInclude) {
      fetchRecipesByNameAndInclude();
    }
    if (searchName && !isInclude) {
      fetchRecipesBySearchName();
    }
    if (!searchName && isInclude) {
      fetchRecipesByInclude();
    }
    if (!searchName && !isInclude) {
      fetchRecipes();
    }
  }, [searchName, includeList]);

  useEffect(() => {
    console.log(565656);
    if (recipeId) {
      console.log(2121);
      fetchRecipe();
    }
  }, [recipeId]);

  useEffect(() => {
    if (isOpenEdit) {
      fetchRecipe();
    }
  }, [isOpenEdit]);

  useEffect(() => {
    console.log(7171717);
    clearStates();
  }, [isOpenCreate]);

  useEffect(() => {
    fetchRecipesByTargetUserId();
  }, [targetUserId]);

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
    if (e.target.name === "name") {
      e.target.value = e.target.value.toUpperCase();
    }
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
      if (recipe.description && recipe.description.trim() !== "") {
        formData.append("description", recipe.description);
      } else {
        formData.append("description", "");
      }
      formData.append("recipeImage", recipe.image);
      formData.append("prepTime", recipe.prepTime);
      formData.append("cookTime", recipe.cookTime);
      formData.append("serving", recipe.serving);
      if (recipe.tip && recipe.tip.trim() !== "") {
        formData.append("tip", recipe.tip);
      } else {
        formData.append("tip", "");
      }

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
      const result = await recipeApi.createRecipe(formData);
      await fetchRecipe();
      await fetchRecipes();
      // navigate(`/profile/${authUser.id}`);
      navigate(`/recipe/${result.data.recipe.id}`);
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
      if (recipe.description && recipe.description.trim() !== "") {
        formData.append("description", recipe.description);
      } else {
        formData.append("description", "");
      }
      formData.append("recipeImage", recipe.image);
      formData.append("prepTime", recipe.prepTime);
      formData.append("cookTime", recipe.cookTime);
      formData.append("serving", recipe.serving);
      if (recipe.tip && recipe.tip.trim() !== "") {
        formData.append("tip", recipe.tip);
      } else {
        formData.append("tip", "");
      }

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
      await fetchRecipe();
      await fetchRecipes();
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
      await fetchRecipes();
      navigate(`/profile/${authUser.id}`);
      toast("Deleted");
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

  const handleChangeInclude = (e) => {
    e.target.value = e.target.value.toUpperCase().trim();
    setInclude(e.target.value);
    setIncludeObj({ ...includeObj, ingredient: e.target.value });
  };

  const handleAddInclude = () => {
    if (include && include.trim() !== "") {
      console.log("include", include);
      setIncludeList((prev) => [...prev, includeObj]);
      setInclude("");
      setIncludeObj({ id: nanoid(), ingredient: "" });
      console.log("ccccllll");
      console.log("include2", include);
    }
  };

  const handleDeleteInclude = (id) => {
    console.log("eee");
    setIncludeList(includeList.filter((el) => el.id !== id));
  };

  const handleClickIngredientURL = (ingredient) =>
    window.location.replace(
      `https://mart.grab.com/th/th/search?keyword=${ingredient.toLowerCase()}`
    );

  const handleClickFav = () => {
    if (!authUser) {
      toast.success("Please login first");
      return;
    }
    if (isFav) {
      toast("Removed from fav");
    } else {
      toast("Added to fav");
    }
    setIsFav((prev) => !prev);
    favApi.handleFav(recipeId);
  };

  const renderIncludeList = includeList?.map((el) => (
    <IncludeButton id={el.id} key={el.id} ingredient={el.ingredient} />
  ));

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
      ingredients={el.ingredients}
    />
  ));

  const renderWriterRecipes = writerRecipes?.map((el) => (
    <VerticalCard
      key={el.id}
      id={el.id}
      name={el.name}
      recipeImage={el.infos?.[0]?.image}
    />
  ));

  const renderFavRecipes = favRecipes?.map((el) => (
    <VerticalCard
      key={el.id}
      id={el.id}
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
        renderWriterRecipes,
        renderFavRecipes,
        recipeObj,
        setRecipeObj,
        writerRecipes,
        searchName,
        setSearchName,
        error,
        include,
        handleChangeInclude,
        handleAddInclude,
        handleDeleteInclude,
        renderIncludeList,
        clearStates,
        isOpenEdit,
        setIsOpenEdit,
        setIsOpenCreate,
        isRecipeBelongToAuthUser,
        handleClickIngredientURL,
        isFav,
        handleClickFav,
        ratingsValue,
        setRatingsValue,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}
