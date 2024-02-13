export default function SubButton({ children }) {
  return (
    <button
      type="reset"
      className={`py-4 px-8 font-black text-2xl hover:underline`}
    >
      {children}
    </button>
  );
}
