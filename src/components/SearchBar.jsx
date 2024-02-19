export default function SearchBar() {
  return (
    <div className=" flex gap-3 py-4 font-black text-2xl">
      <div className="flex-1 flex flex-col gap-3">
        <div className="bg-primary">NAME:</div>
        <div className="flex gap-3">
          <div className="flex justify-between bg-primary">
            <div>INCLUDE:</div>
            <div>+</div>
          </div>
          <div className="flex justify-between bg-primary">
            <div>EXCLUDE:</div>
            <div>-</div>
          </div>
        </div>
      </div>
      <div>
        <i className="fa-solid fa-magnifying-glass bg-primary"></i>
      </div>
    </div>
  );
}
