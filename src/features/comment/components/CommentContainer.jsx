import useComment from "../hooks/useComment";
import CommentCard from "./CommentCard";
import NoComment from "./NoComment";

export default function CommentContainer() {
  const { renderResponseList, isNoComment } = useComment();
  return (
    <div>
      <h1 className=" text-5xl font-black pb-6">COMMENTS</h1>
      {isNoComment ? (
        <NoComment />
      ) : (
        <div className="flex flex-col gap-4">{renderResponseList}</div>
      )}
    </div>
  );
}
