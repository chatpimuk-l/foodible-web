import { toast } from "react-toastify";
import { useState } from "react";
import Form from "../../../components/Form";
import Input from "../../../components/Input";
import useAuth from "../hooks/useAuth";
import validateLogin from "../validators/validate-login";
import { useNavigate } from "react-router-dom";

export default function registerForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const initial = { email: "", password: "" };
  const [input, setInput] = useState(initial);
  const [error, setError] = useState({});

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const validateError = validateLogin(input);
      if (validateError) {
        return setError(validateError);
      }

      await login(input);
      toast("Successfully loged in");
      setInput(initial);
      setError({});
    } catch (err) {
      toast(err.response?.data.message);
    }
  };

  const handleClickSubButton = (e) => {
    navigate("/register");
  };

  return (
    <Form
      title={"LOG IN"}
      buttonText={"LOG IN"}
      subButtonText="OR SIGN UP"
      onSubmit={handleSubmit}
      onClickSubButton={handleClickSubButton}
    >
      <Input
        label="EMAIL"
        id="email"
        name="email"
        value={input.email}
        onChange={handleInputChange}
        errorMessage={error.email}
      />
      <Input
        label="PASSWORD"
        id="password"
        name="password"
        value={input.password}
        onChange={handleInputChange}
        errorMessage={error.password}
      />
    </Form>
  );
}
