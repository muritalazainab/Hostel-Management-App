import {useCallback, useContext, useState} from 'react'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PasswordInput from '../passwordInput/PasswordInput';
import { UserContext} from '../../../context/userContent';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formValidMessage,setFormValidMessage] = useState("")
  const [isSubmitting,setIsSubmitting] = useState(false)
  const navigate = useNavigate();
  const {setUser} = useContext(UserContext);
  const handleInputChange = useCallback((e) => {
    setFormValidMessage("")
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }, [])
  const loginUser = useCallback((e) => {
    e.preventDefault()
    const {email,password} = formData
    if(!email || !password){
      setFormValidMessage("Please fill all the fields")
      return
    }
    setIsSubmitting(true);
    axios.post("https://hostel-management-app-xi.vercel.app/admin/login",formData)
    .then((response) => {
      setUser(response.data);
      setIsSubmitting(false);
      toast.success("Login successful");
      navigate("/homedash", {state: {user:response.data}})
    })
    .catch((error) => {
      setIsSubmitting(false)
      const message = error.response?.status === 401 ? "Invalid credentials" : "Something went wrong"
      setFormValidMessage(message)
    
    })
  },[formData, navigate, setUser])
  

 

  return (
    <div className="container form__ --100vh">
      <div className="form-container">
        <p className="title" > Login as an Admin</p>

        <form className="form" onSubmit={loginUser}>

          <div className="--dir-column">
            <label htmlFor="email">Email:</label>
            <input 
            type="email"
            className="input"
            name="email"
            placeholder="example@yahoo.com"
            required
            value={formData.email}
            onChange={handleInputChange}
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="password">Password:</label>
            <PasswordInput
                  placeholder="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
          </div>


          <button className="--btn" disabled={isSubmitting}>{isSubmitting ? "Signing In...":"Sign In"} </button>
        </form>
        {formValidMessage && (
        <p className='error-message'>{formValidMessage}</p>)}
            
        <p>
          Don&apos;t have an account yet? <Link to='/'>Register</Link> {" "}
        </p>
      </div>
    </div>
  );
}

export default Login
