import Button from "../../../components/Button";
import useRecipe from "../hooks/useRecipe";

export default function IncludeButton({ id, ingredient }) {
  const { handleDeleteInclude } = useRecipe();
  return (
    <Button
      onClick={() => handleDeleteInclude(id)}
      small
      hoverTextColor="white"
      hoverLineThrough
    >
      {ingredient}
    </Button>
  );
}
