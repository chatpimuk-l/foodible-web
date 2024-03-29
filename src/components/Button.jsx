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
  hoverLineThrough = false,
  type = "button",
  onClick = null,
  small = false,
  invisible = false,
  lineThrough = false,
}) {
  const extendedClasses = `${bgColorClass[bgColor]} ${
    textColorClass[textColor]
  } ${hoverTextColorClass[hoverTextColor]} ${invisible && "invisible"} ${
    lineThrough && "line-through"
  } ${hoverLineThrough && "hover:line-through"}`;

  return (
    <button
      onClick={onClick}
      type={type}
      className={
        small
          ? `py-2 px-4 font-extrabold text-base  ${extendedClasses}`
          : `py-4 px-8 font-black text-2xl  ${extendedClasses}`
      }
    >
      <h1>{children}</h1>
    </button>
  );
}
