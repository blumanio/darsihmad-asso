import Map, { Marker, Popup } from 'react-map-gl'
import RoomIcon from '@material-ui/icons/Room'
import './app.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Register from './components/register'
import Login from './components/login'

import { format } from 'timeago.js'
function App() {
  const myStorage = window.localStorage
  const [currentUser, setCurrentUser] = useState(
    myStorage?.getItem('user') || null
  )
  const [pins, setPins] = useState([])
  const [currentPlaceId, setCurrentPlaceId] = useState(null)
  const [newPlace, setNewPlace] = useState(null)
  const [title, setTitle] = useState(null)
  const [description, setDescription] = useState(null)
  const [rating, setRating] = useState(0)
  const [showRegister, setShowRegister] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  console.log('local storage ', myStorage)
  //const currentUser = 'mohamed'
  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get('/pins')
        setPins(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getPins()
  }, [])
  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id)
    console.log('typeof Id', typeof id, id)
    console.log('typeof currentPlaceId', typeof currentPlaceId, currentPlaceId)
  }

  const handleDblClick = (e) => {
    console.log('typeof eeeeeeeeeeeeeeee', e.lngLat.lat)
    const long = e.lngLat.lng
    const lat = e.lngLat.lat

    //setCurrentPlaceId(id)
    setNewPlace({ long, lat })
    console.log('eeeeeeeeeeeeeeee newPlace', newPlace)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newPin = {
      username: currentUser,
      title,
      description,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
    }
    try {
      const res = await axios.post('/pins', newPin)
      setPins([...pins, res.data])
      setNewPlace(null)
    } catch (error) {
      console.log(error)
    }
  }
  const handleLogout = () => {
    myStorage.removeItem('user')
    setCurrentUser(null)
  }

  return (
    <div className="App">
      <Map
        mapboxAccessToken="pk.eyJ1IjoibWVkbGlxdWUiLCJhIjoiY2wxNDhzZ2h2MDdqNTNqc2dsZzZob2d2dSJ9.vbkJ3PFGxkbZoiauPSMzng"
        initialViewState={{
          longitude: -10.17,
          latitude: 29.37,
          zoom: 10,
        }}
        style={{ width: '100vw', height: '100vh' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onDblClick={(e) => handleDblClick(e)}
      >
        {pins.map((p) => (
          <>
            <Marker longitude={p.long} latitude={p.lat} anchor="bottom">
              <RoomIcon
                onClick={() => handleMarkerClick(p._id)}
                style={{
                  fontSize: visualViewport.zoom * 7,
                  color: p.username == currentUser ? 'slateblue' : 'tomato',
                  cursor: 'pointer',
                }}
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                longitude={p.long}
                latitude={p.lat}
                anchor="left"
                closeButton={true}
                closeOnClick={true}
              >
                <div className="card">
                  <label>{p.title}</label>
                  <h1 className="place"> location test </h1>
                  <label> Review</label>
                  <p className="desc"> {p.desc} </p>
                  <div className="stars"></div>

                  <label>Information</label>
                  <span className="username">
                    created by <b>{p.username}</b>
                  </span>
                  <span className="date"> {format(p.createdAt)} </span>

                  <span></span>

                  <label></label>
                </div>
              </Popup>
            )}
          </>
        ))}

        {newPlace && (
          <Popup
            longitude={newPlace.long}
            latitude={newPlace.lat}
            anchor="left"
            closeButton={true}
            closeOnClick={true}
          >
            <div>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                  placeholder="enter a title"
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
                <label> Review</label>
                <textarea
                  placeholder="write something about this place"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <label>Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className="submitButton" type="submit">
                  {' '}
                  Add location
                </button>
              </form>
            </div>
          </Popup>
        )}
        {currentUser ? (
          <button className="button logout" onClick={handleLogout}>
            logout
          </button>
        ) : (
          <div className="buttons">
            <button
              className="button login"
              onClick={() => {
                setShowLogin(true)
              }}
            >
              login
            </button>
            <button
              className="button register"
              onClick={() => setShowRegister(true)}
            >
              register
            </button>
          </div>
        )}
        {showRegister && (
          <Register setShowRegister={setShowRegister}></Register>
        )}
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            myStorage={myStorage}
            setCurrentUser={setCurrentUser}
          ></Login>
        )}
      </Map>
    </div>
  )
}

export default App
