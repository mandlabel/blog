import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom";

export const Login = () => {
  const [init, setInit] = useState(false)
  const [username, setUsername] = useState('user')
  const [password, setPassword] = useState('alma')
  
  const history = useHistory();

  const login = async () => {
    try {
      const { data } = await axios.post('/api/login', {
        username,
        password,
      })

      axios.defaults.headers.authorization = `Bearer ${data.token}`
      window.localStorage.setItem('token', data.token)
      console.log(data)
      history.push('/')
    } catch (error) {
      console.error(error);
    }
  }
  const pushtoregister = () => {
    history.push('/register')
  }
  

  useEffect(() => {
    const initialize = async () => {
      const token = window.localStorage.getItem('token')
      axios.defaults.headers.authorization = `Bearer ${token}`
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
		      	<h3 class="text-center mb-4">Sign In</h3>
						<form action="#" class="login-form">
		      		<div class="form-group">
		      			<input type="text" class="form-control rounded-left" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)}/>
		      		</div>
	            <div class="form-group d-flex">
	              <input type="password" class="form-control rounded-left" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
	            </div>
	            <div class="form-group">
	            	<button type="submit" class="form-control btn btn-primary rounded submit px-3" onClick={login}>Login</button>
	            </div>
              <div class="form-group">
                <button type="submit" class="form-control btn btn-success rounded submit px-3" onClick={pushtoregister}>Sign Up</button>
	            </div>
	          </form>   
	        </div>
				</div>
			</div>
		</div>
	</div>
)
}