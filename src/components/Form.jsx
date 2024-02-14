import Button from "./Button";
import SubButton from "./SubButton";

export default function Form({
  children,
  title,
  buttonText,
  subButtonText = null,
  onSubmit,
  onClickSubButton = null,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="relative flex flex-col gap-6 border-8 border-black w-[80%] lg:w-[60%] h-[calc(100vh-20vh)] mt-[10vh] mx-auto p-8"
    >
      <h1 className="font-black text-7xl">{title}</h1>
      <div className="flex flex-col gap-3">{children}</div>
      <div className="absolute bottom-8 items-start">
        <Button type="submit">{buttonText}</Button>
        {onClickSubButton && (
          <SubButton onClick={onClickSubButton}>{subButtonText}</SubButton>
        )}
      </div>
    </form>
  );
}
