export default function Spinner() {
  return (
    <>
      <div className="fixed inset-0  bg-primary opacity-10 z-40"></div>
      <div className="fixed inset-0 z-50">
        <div className="flex items-center justify-center min-h-full">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      </div>
    </>
  );
}
