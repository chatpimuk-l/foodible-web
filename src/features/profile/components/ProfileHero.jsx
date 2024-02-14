import woman from "../../../assets/woman.jpeg";
import Button from "../../../components/Button";
import useProfile from "../hooks/useProfile";

export default function ProfileHero() {
  const {
    userProfile: { name, bio, image },
  } = useProfile();
  return (
    <div className="flex bg-black text-white h-[50vh]">
      <div className="w-[72vw] h-100%  flex flex-col gap-20 justify-between items-start px-20 py-16">
        <Button bgColor="white" textColor="black" hoverTextColor="primary">
          EDIT
        </Button>
        <div className="flex flex-col gap-6 pr-10">
          <h5 className="text-xl font-normal max-h-28 overflow-auto">{bio}</h5>
          <h1 className="text-7xl font-black">{name}</h1>
        </div>
      </div>
      <div>
        {image && (
          <img
            src={image}
            alt="profile_image"
            className="w-[28vw] h-[100%] object-cover object-center"
          />
        )}
      </div>
    </div>
  );
}
