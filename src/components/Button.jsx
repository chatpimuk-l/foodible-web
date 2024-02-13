export default function Button({
  children,
  bgColor = "black",
  textColor = "white",
  hoverColor = "yellow",
}) {
  const extendedClasses = `bg-${bgColor} text-${textColor}`;

  return (
    <button
      className={`py-4 px-8 font-black text-2xl ${extendedClasses} hover:text-${hoverColor}`}
    >
      {children}
    </button>
  );
}
