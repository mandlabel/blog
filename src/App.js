import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login } from './components/Login'
import { Register } from './components/Register'
import { Home } from './components/Home'
import { CreatePost } from './components/CreatePost'
import { EditPost } from './components/EditPost'
import { SignOut } from './components/SignOut'
import { MyPosts } from './components/MyPosts'
import { Header } from './Header'
import { AuthContextProvider } from "./context/AuthContext";
import axios from 'axios'


function App() {

  const [init, setInit] = useState(false)

  useEffect(() => {
    const initialize = async () => {
      setInit(true)
      const {
        data: { csrfToken }
      } = await axios.get('/api/csrf-protection')
      axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    }
    if (!init) {
      initialize()
    }
  })

  return (
    <div>
    <AuthContextProvider>
        <Router forceRefresh={true}>
        <Header/>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/create" component={CreatePost}/>
            <Route path="/signout" component={SignOut}/>
            <Route path="/myposts" component={MyPosts}/>
            <Route path="/edit/:id" component={EditPost}/>
          </Switch>
        </Router>
    </AuthContextProvider>
    </div>
  );
}

export default App;

