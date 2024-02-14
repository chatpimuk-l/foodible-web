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

export default function SelectedText({
  children,
  bgColor = "primary",
  textColor = "black",
}) {
  const extendedClasses = `${bgColorClass[bgColor]} ${textColorClass[textColor]} `;
  return (
    <div className={`py-2 px-4 font-extrabold text-lg  ${extendedClasses}`}>
      {children}
    </div>
  );
}
