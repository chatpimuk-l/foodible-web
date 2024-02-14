const bgColorClass = {
  primary: "bg-primary",
  white: "bg-white",
  black: "bg-black",
};

const textColorClass = {
  primary: "text-primary",
  white: "text-white",
  black: "text-black",
};

const hoverTextColorClass = {
  primary: "hover:text-primary",
  white: "hover:text-white",
  black: "hover:text-black",
};

export default function Button({
  children,
  bgColor = "black",
  textColor = "white",
  hoverTextColor = "primary",
  type = "button",
}) {
  const extendedClasses = `${bgColorClass[bgColor]} ${textColorClass[textColor]} ${hoverTextColorClass[hoverTextColor]}`;

  return (
    <button
      type={type}
      className={`py-4 px-8 font-black text-2xl  ${extendedClasses}`}
    >
      <h1>{children}</h1>
    </button>
  );
}
