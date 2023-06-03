import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss";

const defaultSignInFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [signInFields, setSignInFields] = useState(defaultSignInFields);
  const { email, password } = signInFields;

  const resetFormFields = () => {
    setSignInFields(defaultSignInFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.target;

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        // I'm not using the handle change from signInFileds, I'm using actual value submitted in form
        email.value,
        password.value
      );

      if (user) {
        resetFormFields();
      }
    } catch (error) {
      console.log(
        "error signing in the user using email and password",
        error.message
      );
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignInFields({ ...signInFields, [name]: value });
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  return (
    <div className="sign-up-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          minLength="6"
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">SIGN IN</Button>
          <Button buttonType="google" onClick={signInWithGoogle}>
            GOOGLE SIGN IN
          </Button>
        </div>
      </form>
      {/* ADD THIS YOURSELF!! <button onClick={signInwithGoogleRedirect}>
        Sign in with Google Redirect or Facebook redirect
      </button> */}
    </div>
  );
};

export default SignInForm;
