const bgColorClass = {
  primary: "bg-primary",
  white: "bg-white",
  black: "bg-black",
};

export default function Input({
  label,
  id,
  type = "text",
  name,
  value,
  bgColor = "primary",
  onChange,
  errorMessage = null,
}) {
  const extendedClasses = `${bgColorClass[bgColor]}`;
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className=" max-w-[600px]">
          <label htmlFor={id} className="font-black text-2xl">
            {label}
          </label>
          <input
            id={id}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className={`${extendedClasses} w-full focus:outline-none py-2 px-4 font-medium text-2xl`}
          />
          <p className="font-medium text-md text-red-500">{errorMessage}</p>
        </div>
      </div>
    </>
  );
}

//bg-primary
