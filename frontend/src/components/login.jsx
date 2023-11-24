import { useRef, useState } from 'react'
import './login.css'
//after react 17 we dont have to import react
import RoomIcon from '@material-ui/icons/Room'
import axios from 'axios'
import CancelIcon from '@material-ui/icons/Cancel'

export default function Login({ setShowLogin, myStorage, setCurrentUser }) {
  const BASE_URL = 'https://darsihmad-asso-be1.onrender.com/api'

  const [failure, setFailure] = useState(false)
  const nameRef = useRef()
  const passwordRef = useRef()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = {
      username: nameRef.current.value,
      password: passwordRef.current.value,
    }
    try {
      const res = await axios.post(`${BASE_URL}/users/login `, user)
      myStorage?.setItem('user', res.data.username)
      console.log('local storage ', myStorage)
      setCurrentUser(res.data.username)
      setShowLogin(false)
    } catch (error) {
      console.log(error)
      setFailure(true)
    }
  }
  return (
    <div className="loginContainer">
      <div className="logo">
        <RoomIcon /> Dar Si Hmad - Fog Harvesting
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={nameRef}></input>
        <input type="password" placeholder="password" ref={passwordRef}></input>
        <button className="loginButton"> Login</button>
        {failure && <span className="failure">something went wrong </span>}
      </form>
      <div className="closeLogin" onClick={() => setShowLogin(false)}>
        {' '}
        <CancelIcon></CancelIcon>
      </div>
    </div>
  )
}
