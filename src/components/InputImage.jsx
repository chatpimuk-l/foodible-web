import Button from "./Button";

const bgColorClass = {
  primary: "bg-primary",
  white: "bg-white",
  black: "bg-black",
};

export default function InputImage({
  image = null,
  label,
  bgColor = "primary",
  onClick = null,
  onClear = null,
  errorMessage = null,
  h = "min-h-64",
  w = "min-w-64",
}) {
  const extendedClasses = `${bgColorClass[bgColor]} ${h} ${w}`;

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className=" flex flex-col">
          <label className="font-black text-2xl">{label}</label>
          <div
            onClick={onClick}
            className={`${extendedClasses} self-start focus:outline-none p-3 font-medium text-2xl`}
          >
            {image && (
              <div className="flex flex-col gap-3">
                <div>
                  <img src={image} alt="image" />
                </div>
                <div className="flex gap-3">
                  <Button small>EDIT</Button>
                  <Button small onClick={onClear}>
                    CLEAR
                  </Button>
                </div>
              </div>
            )}
          </div>
          <p className="font-medium text-md text-red-500">{errorMessage}</p>
        </div>
      </div>
    </>
  );
}
