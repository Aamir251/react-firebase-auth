import './App.css'
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/homepage';
import SignUpPage from './pages/signup';
import LoginPage from './pages/login';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
function App() {

  const [ user, setUser ] = useState(null)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const email = user.email;
        // ...
        setUser(email)
      } else {
        // User is signed out
        // ...
        console.log("user is logged out")
      }
    })
  })
  return (
    <Router>
      <div>
        <section>                              
            <Routes>
                <Route path="/" element={<HomePage user={user} />}/>
                <Route path="/signup" element={<SignUpPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
            </Routes>                    
        </section>
      </div>
    </Router>
  )
}

export default App
