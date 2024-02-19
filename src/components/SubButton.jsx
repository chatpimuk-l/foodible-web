export default function SubButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`py-4 px-8 font-black text-2xl hover:underline`}
    >
      {children}
    </button>
  );
}
