import star from "../assets/star.png";

export default function StarGroup() {
  return (
    <div className="flex -space-x-0.5">
      <img src={star} alt="star" className="h-6" />
      <img src={star} alt="star" className="h-6" />
      <img src={star} alt="star" className="h-6" />
      <img src={star} alt="star" className="h-6" />
      <img src={star} alt="star" className="h-6" />
    </div>
  );
}
