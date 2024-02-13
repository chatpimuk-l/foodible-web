export default function Button({
  children,
  bgColor = "black",
  textColor = "white",
  hoverColor = "yellow",
  type = "button",
}) {
  const extendedClasses = `bg-${bgColor} text-${textColor}`;

  return (
    <button
      type={type}
      className={`py-4 px-8 font-black text-2xl ${extendedClasses} hover:text-${hoverColor}`}
    >
      {children}
    </button>
  );
}
