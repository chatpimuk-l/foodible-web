import Input from "../../../components/Input";
import Button from "../../../components/Button";
import useComment from "../hooks/useComment";

export default function LeaveACommentForm() {
  const { setRating, comment, setComment, handleSubmit } = useComment();

  return (
    <div className="bg-primary px-32 pb-8">
      <form>
        <h1 className="pt-8 pb-6 text-5xl font-black">INGREDIENTS</h1>
        <div className="flex flex-col gap-2 pb-8">
          <div className="flex gap-3 items-center">
            <h5 className=" font-black text-2xl">RATING RECIPE</h5>
            <div className="rating">
              <input
                type="radio"
                name="rating-1"
                className="mask mask-star"
                onClick={() => setRating(1)}
              />
              <input
                type="radio"
                name="rating-1"
                className="mask mask-star"
                onClick={() => setRating(2)}
              />
              <input
                type="radio"
                name="rating-1"
                className="mask mask-star"
                onClick={() => setRating(3)}
              />
              <input
                type="radio"
                name="rating-1"
                className="mask mask-star"
                onClick={() => setRating(4)}
              />
              <input
                type="radio"
                name="rating-1"
                className="mask mask-star"
                onClick={() => setRating(5)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h5 className=" font-black text-2xl">COMMENT</h5>
            <Input
              bgColor="white"
              textarea
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
          </div>
        </div>
        <Button onClick={handleSubmit}>POST COMMENT</Button>
      </form>
    </div>
  );
}
