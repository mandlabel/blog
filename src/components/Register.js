import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom";

export const Register = () => {
  const [username, setUsername] = useState('user')
  const [password, setPassword] = useState('almafa')
  const [password2, setPassword2] = useState('almafa')

  const history = useHistory();

  const register = async () => {
    try {
      await axios.post('/api/register', {
        username,
        password,
        password2,
      })
      history.push('/login')
    }
    catch(error) {
      console.error(error)
    }
  }
  const backtologin = () => {
    history.push('/login')
  }
  
  return (
    <div class="ftco-section">
      <div class="container">
        <div class="row justify-content-center">
        </div>
        <div class="row justify-content-center">
          <div class="col-md-7 col-lg-5">
            <div class="login-wrap p-4 p-md-5">
              <div class="icon d-flex align-items-center justify-content-center">
                <span class="fa fa-user-o"></span>
              </div>
              <h3 class="text-center mb-4">Sign Up</h3>
              <form action="#" class="login-form">
                <div class="form-group">
                  <input type="text" class="form-control rounded-left" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div class="form-group d-flex">
                  <input type="password" class="form-control rounded-left" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div class="form-group d-flex">
                  <input type="password" class="form-control rounded-left" placeholder="Password" required value={password2} onChange={(e) => setPassword2(e.target.value)}/>
                </div>
                <div class="form-group">
                  <button type="submit" class="form-control btn btn-success rounded submit px-3" onClick={register}>Sign Up</button>
                </div>
                <div class="form-group">
                  <button type="submit" class="form-control btn btn-primary rounded submit px-3" onClick={backtologin}>Sign In</button>
                </div>
              </form>   
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
