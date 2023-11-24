import { useRef, useState } from 'react'
import './register.css'
//after react 17 we dont have to import react
import RoomIcon from '@material-ui/icons/Room'
import axios from 'axios'
import CancelIcon from '@material-ui/icons/Cancel'

export default function Register({ setShowRegister }) {
  const BASE_URL = 'https://darsihmad-asso-be1.onrender.com/api/'

  const [success, setSuccess] = useState(false)
  const [failure, setFailure] = useState(false)
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    try {
      await axios.post(`${BASE_URL}/users/register`, newUser)
      setSuccess(true)
      setFailure(false)
    } catch (error) {
      console.log(error)
      setFailure(true)
    }
  }
  return (
    <div className="registerContainer">
      <div className="logo">
        <RoomIcon /> Dar Si Hmad - Fog Harvesting
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={nameRef}></input>
        <input type="email" placeholder="email" ref={emailRef}></input>
        <input type="password" placeholder="password" ref={passwordRef}></input>
        <button className="registerButton"> register</button>
        {success && <span className="success">success</span>}
        {failure && <span className="failure">something went wrong </span>}
      </form>
      <div className="closeRegister" onClick={() => setShowRegister(false)}>
        {' '}
        <CancelIcon></CancelIcon>
      </div>
    </div>
  )
}
