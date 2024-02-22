import { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import useRecipe from "../hooks/useRecipe";
import { useEffect } from "react";

export default function InputIngredient({ id, value }) {
  const { ingredientList, setIngredientList, handleIngredientDelete } =
    useRecipe();

  const [ingredientItem, setIngredientItem] = useState({
    ingredient: "",
    amount: "",
    unit: "",
  });

  useEffect(() => {
    if (value.ingredient) {
      setIngredientItem({
        ingredient: value.ingredient,
        amount: value.amount,
        unit: value.unit,
      });
    }
  }, []);

  const handleIngredientInputChange = (e) => {
    if (e.target.name === "ingredient") {
      e.target.value = e.target.value.toUpperCase();
    }
    setIngredientItem({ ...ingredientItem, [e.target.name]: e.target.value });
    const index = ingredientList.findIndex((el) => el.id === id);
    const newIngredientList = [...ingredientList];
    newIngredientList[index][e.target.name] = e.target.value;
    setIngredientList(newIngredientList);
  };

  return (
    <div className="flex gap-3">
      <Input
        id="ingredient"
        name="ingredient"
        value={ingredientItem.ingredient}
        onChange={handleIngredientInputChange}
      />
      <Input
        id="amount"
        name="amount"
        value={ingredientItem.amount}
        onChange={handleIngredientInputChange}
      />
      <Input
        id="unit"
        name="unit"
        value={ingredientItem.unit}
        onChange={handleIngredientInputChange}
      />
      <Button small onClick={() => handleIngredientDelete(id)}>
        -
      </Button>
    </div>
  );
}
