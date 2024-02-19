import { useRef, useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import InputImage from "../../../components/InputImage";
import useRecipe from "../hooks/useRecipe";

export default function InputInstruction({ id }) {
  const { instructionList, setInstructionList, handleInstructionDelete } =
    useRecipe();

  const [instructionItem, setInstructionItem] = useState({
    instruction: "",
    image: "",
  });

  const [instructionImage, setInstructionImage] = useState(null);

  const instructionImageFileEl = useRef(null);

  const handleInstructionInputChange = (e) => {
    setInstructionItem({ ...instructionItem, instruction: e.target.value });
    const index = instructionList.findIndex((el) => el.id === id);
    const newInstructionList = [...instructionList];
    newInstructionList[index].inputs.instruction = e.target.value;
    setInstructionList(newInstructionList);
  };

  const handleInstructionImageChange = (e) => {
    if (e.target?.files[0]) {
      setInstructionImage(URL.createObjectURL(e.target.files[0]));
      setInstructionItem({ ...instructionItem, image: e.target.files[0] });
      const index = instructionList.findIndex((el) => el.id === id);
      const newInstructionList = [...instructionList];
      console.log("sdfghjhjhhhh");
      newInstructionList[index].inputs.image = e.target.files[0];

      setInstructionList(newInstructionList);
    }
  };

  const handleInstructionImageClear = (e) => {
    e.stopPropagation();
    setInstructionImage(null);
    setInstructionItem({ ...instructionItem, image: null });
    const index = instructionList.findIndex((el) => el.id === id);
    const newInstructionList = [...instructionList];
    newInstructionList[index].inputs.image = null;
    setInstructionList(newInstructionList);
    instructionImageFileEl.current.value = "";
  };

  return (
    <>
      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            textarea
            rows="2"
            id="instruction"
            name="instruction"
            value={instructionItem.instruction}
            onChange={handleInstructionInputChange}
          />
        </div>
        <Button small onClick={() => handleInstructionDelete(id)}>
          -
        </Button>
      </div>
      <input
        type="file"
        className="hidden"
        ref={instructionImageFileEl}
        onChange={handleInstructionImageChange}
      />
      <InputImage
        onClick={() => instructionImageFileEl.current.click()}
        onClear={handleInstructionImageClear}
        type="button"
        image={instructionImage}
        // errorMessage={error.email}
      />
    </>
  );
}
