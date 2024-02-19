import Form from "../../../components/Form";
import Input from "../../../components/Input";
import InputImage from "../../../components/InputImage";
import Button from "../../../components/Button";
import useRecipe from "../hooks/useRecipe";
import Spinner from "../../../components/Spinner";

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
  } = useRecipe();

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
        // errorMessage={error.email}
      />

      <Input
        textarea
        label="DESCRIPTION"
        id="description"
        name="description"
        value={recipe?.description}
        onChange={handleRecipeInputChange}
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
        // errorMessage={error.email}
      />
      <div className="w-64">
        <Input
          label="PREP TIME (mins)"
          id="prepTime"
          name="prepTime"
          value={recipe?.prepTime}
          onChange={handleRecipeInputChange}
        />
        <Input
          label="COOK TIME (mins)"
          id="cookTime"
          name="cookTime"
          value={recipe?.cookTime}
          onChange={handleRecipeInputChange}
        />
        <Input
          label="SERVINGS (ppl)"
          id="serving"
          name="serving"
          value={recipe?.serving}
          onChange={handleRecipeInputChange}
        />
      </div>

      <div className="flex gap-3">
        <Input
          label="INGREDIENT"
          id="ingredient"
          name="ingredient"
          input="hidden"
          labelClasses="w-[20vw]"
        />
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
      />
    </Form>
  );
}
