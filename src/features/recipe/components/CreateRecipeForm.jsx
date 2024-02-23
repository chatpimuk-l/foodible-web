import Form from "../../../components/Form";
import Input from "../../../components/Input";
import InputImage from "../../../components/InputImage";
import Button from "../../../components/Button";
import useRecipe from "../hooks/useRecipe";
import Spinner from "../../../components/Spinner";
import React, { useEffect } from "react";

export default function CreateRecipeForm() {
  const {
    recipe,
    renderIngredientList,
    renderInstructionList,
    handleRecipeInputChange,
    handelAddIngredientList,
    handelAddInstructionList,
    recipeImage,
    recipeImageFileEl,
    handleRecipeImageChange,
    handleRecipeImageClear,
    handleCancel,
    handleRecipeFormSubmit,
    loading,
    error,
    setIsOpenCreate,
  } = useRecipe();

  useEffect(() => {
    setIsOpenCreate(true);
    return () => setIsOpenCreate(false);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Form
      title={"CREATE A RECIPE"}
      buttonText={"CREATE"}
      onSubmit={handleRecipeFormSubmit}
      subButtonText="CANCEL"
      onClickSubButton={handleCancel}
    >
      <Input
        label="NAME"
        id="name"
        name="name"
        value={recipe?.name}
        onChange={handleRecipeInputChange}
        errorMessage={error.name}
      />

      <Input
        textarea
        label="DESCRIPTION"
        id="description"
        name="description"
        value={recipe?.description}
        onChange={handleRecipeInputChange}
        errorMessage={error.description}
      />
      <input
        type="file"
        className="hidden"
        ref={recipeImageFileEl}
        onChange={handleRecipeImageChange}
      />
      <InputImage
        label="IMAGE"
        onClick={() => recipeImageFileEl.current.click()}
        onClear={handleRecipeImageClear}
        type="button"
        image={recipeImage}
        errorMessage={error.image}
      />
      <div className="w-64">
        <Input
          label="PREP TIME (mins)"
          id="prepTime"
          name="prepTime"
          value={recipe?.prepTime}
          onChange={handleRecipeInputChange}
          errorMessage={error.prepTime}
        />
        <Input
          label="COOK TIME (mins)"
          id="cookTime"
          name="cookTime"
          value={recipe?.cookTime}
          onChange={handleRecipeInputChange}
          errorMessage={error.cookTime}
        />
        <Input
          label="SERVINGS (ppl)"
          id="serving"
          name="serving"
          value={recipe?.serving}
          onChange={handleRecipeInputChange}
          errorMessage={error.serving}
        />
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            label="INGREDIENT"
            id="ingredient"
            name="ingredient"
            input="hidden"
            labelClasses="w-[20vw]"
          />
        </div>
        <Input
          label="AMOUNT"
          id="amount"
          name="amount"
          input="hidden"
          labelClasses="w-[20vw]"
        />
        <Input
          label="UNIT"
          id="unit"
          name="unit"
          input="hidden"
          labelClasses="w-[20vw]"
        />
        <Button small invisible>
          -
        </Button>
      </div>
      {renderIngredientList}
      {error.ingredients &&
        (error.ingredients.includes("number") ? (
          <span className="font-medium text-md text-red-500">
            AMOUNT must be a number.
          </span>
        ) : (
          <span className="font-medium text-md text-red-500">
            INGREDIENT, AMOUNT, and UNIT are required.
          </span>
        ))}
      <div className="self-start">
        <Button small onClick={handelAddIngredientList}>
          +
        </Button>
      </div>
      <div className="flex gap-3">
        <div className="flex-1">
          <Input label="INSTRUCTION" textarea rows="2" input="hidden" />
        </div>
      </div>

      {renderInstructionList}
      {error.instructions && (
        <p className="font-medium text-md text-red-500">
          INSTRUCTION is required. INSTUCTION IMAGE is optional.
        </p>
      )}
      <div className="self-start">
        <Button small onClick={handelAddInstructionList}>
          +
        </Button>
      </div>

      <Input
        label="TIPS"
        textarea
        name="tip"
        value={recipe?.tip}
        onChange={handleRecipeInputChange}
        errorMessage={error.tip}
      />
    </Form>
  );
}
