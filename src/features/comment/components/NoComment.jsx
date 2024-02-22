export default function NoComment({ name, createdAt, rating, comment }) {
  return (
    <div className="h-52 flex flex-col gap-3 border-8 border-black p-6 ">
      <div className="flex flex-col -space-y-2">
        <div className="pb-3">There is no comments yet.</div>
        <h5 className="text-2xl font-black">BE THE FIRST ONE!</h5>
      </div>
    </div>
  );
}
