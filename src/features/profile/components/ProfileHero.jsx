import woman from "../../../assets/woman.jpeg";
import Button from "../../../components/Button";

export default function ProfileHero() {
  return (
    <div className="flex bg-black text-white h-[50vh]">
      <div className="w-[76vw] h-100%  flex flex-col gap-20 justify-between items-start px-20 py-16">
        <Button bgColor="white" textColor="black" hoverTextColor="primary">
          EDIT
        </Button>
        <div className="flex flex-col gap-6 pr-10">
          <h5 className="text-xl font-normal">
            In 2014, after a decade of work in the HR and Technical
            Communication fields, Krista decided to follow her passion for
            healthy cooking by starting food blog. Along the way, she honed her
            recipe development and food photography skills, and today, she is
            thrilled to be helping others in the food blogging space to develop
            and photograph mouth-watering recipes. Krista lives in Shoreview,
            Minnesota with her husband and two children.
          </h5>
          <h1 className="text-7xl font-black">CHRISTA BROWN</h1>
        </div>
      </div>
      <div>
        <img
          src={woman}
          alt="profile_image"
          className="w-[24vw] h-[100%] object-cover object-center"
        />
      </div>
    </div>
  );
}
