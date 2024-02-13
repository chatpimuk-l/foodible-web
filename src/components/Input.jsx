export default function Input({
  label,
  id,
  type = "text",
  name,
  value,
  bgColor = "yellow",
  width = "75%",
  onChange,
  errorMessage = null,
}) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <label htmlFor={id} className="font-black text-2xl">
          {label}
        </label>
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`bg-${bgColor} lg:w-[${width}] w-full focus:outline-none py-2 px-4 font-medium text-2xl`}
        />
        <p className="font-medium text-md text-red-500">{errorMessage}</p>
      </div>
    </>
  );
}
