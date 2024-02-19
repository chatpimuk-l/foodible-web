const bgColorClass = {
  primary: "bg-primary",
  white: "bg-white",
  black: "bg-black",
};

export default function Input({
  label = null,
  id,
  type = "text",
  name,
  value,
  bgColor = "primary",
  onChange,
  errorMessage = null,
  textarea = false,
  rows = "4",
  input = null,
  labelClasses = null,
}) {
  const extendedClasses = `${bgColorClass[bgColor]} ${input}`;

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className=" flex flex-col max-w-[600px]">
          {label && (
            <label
              htmlFor={id}
              className={`font-black text-2xl ${labelClasses}`}
            >
              {label}
            </label>
          )}
          {textarea ? (
            <textarea
              rows={rows}
              id={id}
              name={name}
              value={value}
              onChange={onChange}
              className={`${extendedClasses} w-full focus:outline-none py-2 px-4 font-medium text-2xl`}
            />
          ) : (
            <input
              id={id}
              type={type}
              name={name}
              value={value}
              onChange={onChange}
              className={`${extendedClasses} w-full focus:outline-none py-2 px-4 font-medium text-2xl`}
            />
          )}
          <p className="font-medium text-md text-red-500">{errorMessage}</p>
        </div>
      </div>
    </>
  );
}

//bg-primary
