import { useContext } from "react";
import { CommentContext } from "../contexts/CommentContext";

export default function useComment() {
  return useContext(CommentContext);
}
