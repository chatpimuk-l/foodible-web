import { toast } from "react-toastify";
import { useState } from "react";
import Form from "../../../components/Form";
import Input from "../../../components/Input";
import useAuth from "../hooks/useAuth";
import validateRegister from "../validators/validate-register";
import { useNavigate } from "react-router-dom";

export default function registerForm() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const initial = { name: "", email: "", password: "", confirmPassword: "" };
  const [input, setInput] = useState(initial);
  const [error, setError] = useState({});

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const validateError = validateRegister(input);
      if (validateError) {
        return setError(validateError);
      }

      await register(input);
      toast("Successfully registered");
      setInput(initial);
      setError({});
    } catch (err) {
      if (err.response?.data.message === "User already existed") {
        return setError({ email: "This EMAIL is in use" });
      }
    }
  };

  const handleClickSubButton = (e) => {
    navigate("/login");
  };

  return (
    <Form
      title={"SIGN UP"}
      buttonText={"SIGN UP"}
      subButtonText="OR LOG IN"
      onSubmit={handleSubmit}
      onClickSubButton={handleClickSubButton}
    >
      <Input
        label="NAME"
        id="name"
        name="name"
        value={input.name}
        onChange={handleInputChange}
        errorMessage={error.name}
      />
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
      <Input
        label="CONFIRM PASSWORD"
        id="confirmPassword"
        name="confirmPassword"
        value={input.confirmPassword}
        onChange={handleInputChange}
        errorMessage={error.confirmPassword}
      />
    </Form>
  );
}
