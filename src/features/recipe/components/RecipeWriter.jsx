import { Link } from "react-router-dom";

export default function RecipeWriter({
  writerId,
  writerName,
  writerImage,
  recipeCreatedAt,
}) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return (
    <Link to={`/profile/${writerId}`}>
      <div className="flex bg-black text-white h-[30vh]">
        <div className="w-[72vw] h-100% self-end  pl-appWidth pr-appWidth py-8">
          <div className="flex flex-col gap-2 pr-10">
            <h5 className="text-3xl font-black">{writerName}</h5>
            <div className="flex gap-3">
              <h5 className="self-end text-xl font-normal">PUBLISHED</h5>
              <h5 className="text-xl font-black">
                {formatter.format(Date.parse(recipeCreatedAt))}
              </h5>
            </div>
          </div>
        </div>
        <div>
          <img
            src={writerImage}
            alt="profile_image"
            className="w-[28vw] h-[100%] object-cover object-center"
          />
        </div>
      </div>
    </Link>
  );
}
