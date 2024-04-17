import React from "react";
import "./Register.css";

const AdminReg = () => {
  return (
    <div className="container form__ --100vh">
      <div className="form-container">
        <p className="title"> Create an account</p>

        <form className="form">
          <div className="--dir-column">
            <label htmlFor="name">Full name:</label>
            <input 
            type="text"
            className="input"
            name="name"
            placeholder="Enter your name"
            required
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="email">Email:</label>
            <input 
            type="email"
            className="input"
            name="email"
            placeholder="example@yahoo.com"
            required
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="password">Password:</label>
            <input 
            type="password"
            className="input"
            name="password"
            placeholder="Enter your password"
            required
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="password">Confirm Password:</label>
            <input 
            type="password"
            className="input"
            name="password"
            placeholder="Confirm your password"
            required
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminReg;
