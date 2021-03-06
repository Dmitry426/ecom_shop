import { useContext, useState } from "react";
import {
  getUserInfo,
  loginAuthUserWithNameAndPassword,
} from "../../utils/auth.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sing-in-form.styles.scss";
import { UserContext } from "../../context/user.context";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const { setUser } = useContext(UserContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await loginAuthUserWithNameAndPassword(email, password);
      const user = await getUserInfo();
      setUser(user);
    } finally {
      resetFormFields();
    }
  };
  return (
    <div className="sing-in-container">
      <h2>Already have an account</h2>
      <span>Sing in with your email and password</span>
      <form onSubmit={handleSubmit}>
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
        <div className="buttons-container">
          <Button type="submit"> Sing In </Button>
          <Button buttonType="google" type="button">
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
