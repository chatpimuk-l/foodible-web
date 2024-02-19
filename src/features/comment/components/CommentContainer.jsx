import CommentCard from "./CommentCard";

export default function CommentContainer() {
  return (
    <div>
      <h1 className=" text-5xl font-black pb-6">COMMENTS</h1>
      <div className="flex flex-col gap-4">
        <CommentCard />
        <CommentCard>
          <CommentCard />
        </CommentCard>
      </div>
    </div>
  );
}
