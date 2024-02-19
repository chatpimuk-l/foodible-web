import CommentContainer from "../features/comment/components/CommentContainer";
import LeaveACommentForm from "../features/comment/components/LeaveACommentForm";
import RecipeDescription from "../features/recipe/components/RecipeDescription";
import RecipeHero from "../features/recipe/components/RecipeHero";
import RecipeInfoTop from "../features/recipe/components/RecipeInfoTop";
import RecipeIngredient from "../features/recipe/components/RecipeIngredient";
import RecipeInstruction from "../features/recipe/components/RecipeInstruction";
import RecipeTip from "../features/recipe/components/RecipeTip";
import RecipeWriter from "../features/recipe/components/RecipeWriter";
import RecipeWriterMore from "../features/recipe/components/RecipeWriterMore";

export default function RecipePage() {
  return (
    <>
      <RecipeHero />
      <div className="px-appWidth pt-6 pb-7">
        <RecipeInfoTop />
      </div>
      <div className="mx-appWidth ">
        <RecipeDescription />
      </div>
      <div className="px-appWidth py-8">
        <RecipeIngredient />
      </div>
      <div className="px-appWidth ">
        <RecipeInstruction />
      </div>
      <div className="px-appWidth py-8">
        <RecipeTip />
      </div>
      <RecipeWriter />
      <div className="px-appWidth py-8">
        <CommentContainer />
      </div>
      <div>
        <LeaveACommentForm />
      </div>
      <div className="px-appWidth py-8">
        <RecipeWriterMore />
      </div>
    </>
  );
}
