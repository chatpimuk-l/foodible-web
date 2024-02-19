import StarGroup from "../../../components/StarGroup";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

export default function LeaveACommentForm() {
  return (
    <div className="bg-primary px-32 pb-8">
      <form>
        <h1 className="pt-8 pb-6 text-5xl font-black">INGREDIENTS</h1>
        <div className="flex flex-col gap-2 pb-8">
          <div className="flex gap-3 items-center">
            <h5 className=" font-black text-2xl">RATING RECIPE</h5>
            <StarGroup />
          </div>
          <div className="flex flex-col gap-2">
            <h5 className=" font-black text-2xl">COMMENT</h5>
            <Input bgColor="white" textarea />
          </div>
        </div>
        <Button>POST COMMENT</Button>
      </form>
    </div>
  );
}
