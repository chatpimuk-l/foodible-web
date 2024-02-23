import { createContext } from "react";
import { useState } from "react";
import * as responseApi from "../../../api/response";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CommentCard from "../components/CommentCard";
import { useEffect } from "react";
import useAuth from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useRecipe from "../../recipe/hooks/useRecipe";

export const CommentContext = createContext();

export default function CommentContextProvider({ children }) {
  const { recipeId } = useParams();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [responseList, setResponseList] = useState([]);
  const [isRated, setIsRated] = useState(true);
  const { authUser } = useAuth();
  const { setRatingsValue } = useRecipe();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authUser) {
      toast("Please login first");
      return;
    }
    if (!rating) {
      setIsRated(false);
      toast("Please give a rating");
      return;
    }
    try {
      console.log(44444);
      await responseApi.createResponse(recipeId, { comment, rating });
      await fetchResponseList();
      setComment("");
      setRating("");
      toast("Sent");
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
      const recipeRatings = await responseApi.getRatingsByRecipeId(recipeId);
      setRatingsValue(recipeRatings.data?.ratings);
      console.log("recipeRatings", recipeRatings);
    } catch (err) {
      console.log(err);
      toast(err.response?.data.message);
    } finally {
    }
  };

  useEffect(() => {
    if (recipeId) {
      console.log("recipeId", recipeId);
      const run = async () => {
        if (recipeId) {
          await fetchResponseList();
        }
      };
      run();
      console.log("responseList", responseList);
    }
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
        isRated,
        setIsRated,
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
