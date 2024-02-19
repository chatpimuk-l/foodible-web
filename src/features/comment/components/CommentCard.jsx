import Button from "../../../components/Button";
import StarGroup from "../../../components/StarGroup";

export default function CommentCard({ children }) {
  return (
    <div className="flex flex-col gap-3 border-8 border-black p-6 ">
      <div className="flex gap-3">
        <h5 className="text-2xl font-black">JACK</h5>
        <small className=" self-end">02.06.24 at 9:14 am</small>
      </div>
      <div>
        <StarGroup />
      </div>
      <div className="pb-3">
        This is literally my favorite Super Bowl recipe of all time. Cannot wait
        to make for fam Sunday!
      </div>
      {children}
      <div className="pt-3">
        <Button bgColor="primary" textColor="black" hoverTextColor="white">
          REPLY
        </Button>
      </div>
    </div>
  );
}
