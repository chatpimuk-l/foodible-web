import HorizontalCard from "../../../components/HorizontalCard";

export default function AllRecipeContainer() {
  return (
    <div className="flex flex-col gap-6">
      <div className=" flex justify-between">
        <h1 className=" text-5xl font-black">ALL RECIPES</h1>
        <div className=" flex items-end gap-6 text-xl font-black">
          <div>LATEST</div>
          <div className="underline">HIGHEST RATED</div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <HorizontalCard />
        <HorizontalCard />
        <HorizontalCard />
      </div>
    </div>
  );
}
