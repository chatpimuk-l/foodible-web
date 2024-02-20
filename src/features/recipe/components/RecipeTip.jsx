export default function RecipeTip({ recipeTip }) {
  return (
    <>
      <h1 className=" text-5xl font-black pb-4">TIPS</h1>
      <div className="bg-primary px-14 py-6 text-lg font-medium">
        {recipeTip}
      </div>
    </>
  );
}
