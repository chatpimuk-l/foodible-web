import Button from "../../../components/Button";
import StarGroup from "../../../components/StarGroup";

export default function CommentCard({ name, createdAt, rating, comment }) {
  return (
    <div className="flex flex-col gap-3 border-8 border-black p-6 ">
      <div className="flex gap-3">
        <h5 className="text-2xl font-black">{name}</h5>
        <small className=" self-end">{createdAt}</small>
      </div>
      <div>
        <StarGroup />
        {rating}
      </div>
      <div className="pb-3">{comment}</div>
      <div className="pt-3">
        <Button bgColor="primary" textColor="black" hoverTextColor="white">
          REPLY
        </Button>
      </div>
    </div>
  );
}
