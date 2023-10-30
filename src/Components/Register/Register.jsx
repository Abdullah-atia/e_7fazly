import axios from 'axios'
import joi from "joi";
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

export default function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [errMsg, setErrorMsg] = useState("")
  const [errorList, setErrorList] = useState([])
  let navigate = useNavigate()
  
  let submitFormData = async(e) => {
    e.preventDefault()
    let validationResponse = validateFormData()
    console.log(validationResponse);
    if (validationResponse.error){
      setErrorList(validationResponse.error.details)
    }
    else {
      let {data} = await axios.post ("api",user)
      console.log(data);
      if (data.message === "success") {
        goToLogin()
      }
      else{
        setErrorMsg(data.message)
      }
    }
  }
  let validateFormData = () =>{
    const schema = joi.object({
      name: joi.string().min(2).max(30).required(),
      email: joi.string().required().email({ tlds: { allow: ["com", "net"] } }),
      password: joi.string().min(4).max(30).required(),
    })
    return schema.validate(user, {abortearly: false})
  }
  let goToLogin = () => {
    navigate("/login");
  };
  let getnputValue = (e) => {
    let newUser = { ...user }
    newUser[e.target.name] = e.target.value
    setUser(newUser)
  }
  return (
<>
      <div className="w-75 m-auto py-5">
        <h2>Registeration Form</h2>
        {errorsList.map((error, index) => (
          <div key={index} className="alert alert-danger p-2">
            {error.message}
          </div>
        ))}

        {errorMsg ? (
          <div className="alert alert-danger p-2">{errorMsg}</div>
        ) : (
          ""
        )}
        <form onSubmit={submitFormData}>
          <div className="input-data my-2">
            <label htmlFor="first_name">First Name</label>
            <input
              onChange={getInputValue}
              type="text"
              className="form-control my-2"
              name="first_name"
            />
          </div>
          <div className="input-data my-2">
            <label htmlFor="last_name">Last Name</label>
            <input
              onChange={getInputValue}
              type="text"
              className="form-control my-2"
              name="last_name"
            />
          </div>
          <div className="input-data my-2">
            <label htmlFor="age">Age</label>
            <input
              onChange={getInputValue}
              type="number"
              className="form-control my-2"
              name="age"
            />
          </div>
          <div className="input-data my-2">
            <label htmlFor="email">Email</label>
            <input
              onChange={getInputValue}
              type="email"
              className="form-control my-2"
              name="email"
            />
          </div>
          <div className="input-data my-2">
            <label htmlFor="password">Password</label>
            <input
              onChange={getInputValue}
              type="password"
              className="form-control my-2"
              name="password"
            />
          </div>

          <button className="btn btn-info my-3 float-end">register</button>
          <div className="clear-fix"></div>
        </form>
      </div>
    </>
  )
}
