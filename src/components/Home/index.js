import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Home = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }
  const JwtToken = Cookies.get('jwt_token')
  if (JwtToken === undefined) {
    return <Redirect to="/ebank/login" />
  }
  return (
    <div className="home-route">
      <div className="div1">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          className="logo"
          alt="website logo"
        />
        <button type="button" onClick={onLogout} className="logout-button">
          Logout
        </button>
      </div>
      <div className="div2">
        <h1 className="home-heading">Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
          className="card"
        />
      </div>
    </div>
  )
}

export default Home
