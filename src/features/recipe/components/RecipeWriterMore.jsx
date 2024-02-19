import VerticalCard from "../../../components/VerticalCard";

export default function RecipeWriterMore() {
  return (
    <div className="flex flex-col gap-6">
      <div className=" flex flex-col gap-2">
        <h1 className=" text-5xl font-black">MORE RECIPES FROM</h1>
        <h1 className=" text-5xl font-medium">KRISTA BROWN</h1>
      </div>
      <div className="flex gap-4">
        <VerticalCard />
        <VerticalCard />
        <VerticalCard />
      </div>
    </div>
  );
}
