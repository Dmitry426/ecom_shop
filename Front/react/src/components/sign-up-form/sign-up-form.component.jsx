import { useState } from "react";
import { createAuthUserWithEmailAndPassword } from "../../utils/auth.utils";
import FormInput from "../form-input/form-input.component";
import "./sing-up-form.styles.scss";
import Button from "../button/button.component";

const defaultFormFields = {
  login: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { login, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("password must match");
      return;
    }
    try {
      await createAuthUserWithEmailAndPassword(login, email, password);
    } finally {
      resetFormFields();
    }
  };
  return (
    <div className="sing-up-container">
      <h2>Don&apos;t have an account </h2>
      <span>Sing up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Login"
          inputOptions={{
            type: "text",
            required: true,
            onChange: handleChange,
            name: "login",
            value: login,
          }}
        />
        <FormInput
          label="email"
          inputOptions={{
            type: "email",
            required: true,
            onChange: handleChange,
            name: "email",
            value: email,
          }}
        />
        <FormInput
          label="password"
          inputOptions={{
            type: "password",
            required: true,
            onChange: handleChange,
            name: "password",
            value: password,
          }}
        />
        <FormInput
          label="confirm password"
          inputOptions={{
            type: "password",
            required: true,
            onChange: handleChange,
            name: "confirmPassword",
            value: confirmPassword,
          }}
        />
        <Button buttonType="inverted" type="submit">
          Sing Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
