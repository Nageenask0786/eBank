import {Switch, Route, Redirect} from 'react-router-dom'

import './App.css'

import LoginForm from './components/LoginForm'
import NotFound from './components/NotFound'
import Home from './components/Home'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/ebank/login" component={LoginForm} />
    <Route exact path="/" component={Home} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
