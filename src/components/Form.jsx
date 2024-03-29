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
      className="flex flex-col gap-6 border-8 border-black  min-h-[calc(100vh-26vh)] mx-appWidth mb-appWidth p-8"
    >
      <h1 className="font-black text-7xl">{title}</h1>
      <div className="flex flex-col gap-3">{children}</div>
      <div className="flex-1 flex mt-10">
        <div className="self-end">
          <Button type="submit">{buttonText}</Button>
          {onClickSubButton && (
            <SubButton onClick={onClickSubButton}>{subButtonText}</SubButton>
          )}
        </div>
      </div>
    </form>
  );
}
