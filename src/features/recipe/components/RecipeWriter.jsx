import woman from "../../../assets/woman.jpeg";

export default function RecipeWriter() {
  return (
    <div className="flex bg-black text-white h-[30vh]">
      <div className="w-[72vw] h-100% self-end  pl-32 pr-32 py-8">
        <div className="flex flex-col gap-2 pr-10">
          <h5 className="text-3xl font-black">KRISTA BROWN</h5>
          <div className="flex gap-3">
            <h5 className="self-end text-xl font-normal">PUBLISHED</h5>
            <h5 className="text-xl font-black">FEB 12, 2024</h5>
          </div>
        </div>
      </div>
      <div>
        <img
          src={woman}
          alt="profile_image"
          className="w-[28vw] h-[100%] object-cover object-center"
        />
      </div>
    </div>
  );
}
