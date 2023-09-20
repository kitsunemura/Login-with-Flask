import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import ErrorMessageModal from "../component/ErrorMessageModal"; 

export const RegisterPage = () => {
  const { actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [registrationError, setRegistrationError] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false); 

  useEffect(() => {
    if (registrationError) {
      setShowErrorModal(true);
    }
  }, [registrationError]);

  const registerUser = async (e) => {
    e.preventDefault();

    if (!validateEmail(email) || !validatePassword(password)) {
      setRegistrationError("Please enter a valid email and a strong password (6 characters minimum required).");
      return;
    }

    const newUser = {
      email,
      password,
    };

    const success = await actions.registerUser(newUser);

    if (success) {
      navigate("/");
      console.log("User registered successfully!", newUser);
    } else {
      const errorData = await response.json();
      console.error("Error registering user:", errorData.message);
      setRegistrationError("Registration failed. Please check your information.");
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const closeModal = () => {
    setShowErrorModal(false);
    setRegistrationError(null); 
  };

  return (
    <div>
      <h1 className="display-3 text-center">Register</h1>
      <div className="container">
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary" onClick={registerUser}>
            Register
          </button>
        </form>
      </div>
      {showErrorModal && <ErrorMessageModal message={registrationError} onClose={closeModal} />}
    </div>
  );
};
