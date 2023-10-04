import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {UserId: '', pin: '', showErrormsg: false, errorMsg: ''}

  submitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  getMessageError = message => {
    this.setState({showErrormsg: true, errorMsg: message})
  }

  onFormSubmit = async event => {
    event.preventDefault()
    const apiUrl = 'https://apis.ccbp.in/ebank/login'
    const {UserId, pin} = this.state
    const UserDetails = {user_id: UserId, pin}
    const options = {
      method: 'POST',
      body: JSON.stringify(UserDetails),
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    const data = await response.json()
    if (response.ok === true) {
      console.log(data)
      this.submitSuccess(data.jwt_token)
    } else {
      this.getMessageError(data.error_msg)
    }
  }

  onChangeUserId = event => {
    this.setState({UserId: event.target.value})
  }

  onChangePIN = event => {
    this.setState({pin: event.target.value})
  }

  render() {
    const {errorMsg, showErrormsg} = this.state
    const JwtToken = Cookies.get('jwt_token')
    if (JwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-route">
        <div className="image-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            width="55%"
            height="80%"
            alt="website login"
          />
          <div className="details">
            <h1 className="heading">Welcome Back!</h1>
            <form onSubmit={this.onFormSubmit}>
              <label htmlFor="user-id" className="label">
                USER ID
              </label>
              <input
                type="text"
                id="user-id"
                className="input-element"
                placeholder="Enter USER ID"
                onChange={this.onChangeUserId}
              />
              <label htmlFor="pin" className="label">
                PIN
              </label>
              <input
                type="password"
                className="input-element"
                id="pin"
                placeholder="Enter PIN"
                onChange={this.onChangePIN}
              />
              <button className="login-button" type="submit">
                Login
              </button>
            </form>
            {showErrormsg && <p className="error-msg">{errorMsg}</p>}
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm
