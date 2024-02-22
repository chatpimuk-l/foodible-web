import { createContext } from "react";
import { useState } from "react";
import * as responseApi from "../../../api/response";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CommentCard from "../components/CommentCard";
import { useEffect } from "react";

export const CommentContext = createContext();

export default function CommentContextProvider({ children }) {
  const { recipeId } = useParams();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [responseList, setResponseList] = useState([]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await responseApi.createResponse(recipeId, { comment, rating });
      await fetchResponseList();
      setComment("");
      setRating("");
      toast("Send");
    } catch (err) {
      console.log(err);
      toast(err.response?.data.message);
    }
  };

  const fetchResponseList = async () => {
    try {
      const result = await responseApi.getResponseByRecipeId(recipeId);
      setResponseList(result.data.responses);
      console.log("result.data.responses", result.data.responses);
    } catch (err) {
      console.log(err);
      toast(err.response?.data.message);
    } finally {
    }
  };

  useEffect(() => {
    const run = async () => {
      if (recipeId) {
        await fetchResponseList();
      }
    };
    run();
    console.log("responseList", responseList);
  }, [recipeId]);

  const renderResponseList = responseList?.map((el) => (
    <CommentCard
      key={el.id}
      name={el.user.name}
      createdAt={el.createdAt}
      rating={el.rating}
      comment={el.comment}
    />
  ));

  const isNoComment = responseList.length === 0;

  return (
    <CommentContext.Provider
      value={{
        setRating,
        comment,
        setComment,
        handleSubmit,
        renderResponseList,
        isNoComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
}
