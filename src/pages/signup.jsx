import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

const SignUpPage = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [ error, setError ] = useState('')


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      console.log({ email, password });
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      
      if(userCredential?.user) {
        // automatically login
        const credentials = await signInWithEmailAndPassword(auth, email, password)

        if(credentials.user?.email) {
          navigate("/")
          console.log(credentials.user?.email);
        }
        navigate("/")
      }
    } catch (error) {
      console.log(error.message);

      if(error.message.includes('Password should be at least 6 characters')) {
        setError("Password should be atleast 6 characters")
      } else if(error.message.includes("email-already-in-use")) {
        setError("Email already in use ")
      }
    }


  }
  useEffect(() => {

    let timeoutId;

    if(error) {
      timeoutId = setTimeout(() => {
        setError('')
      }, 3000);
    }


    return () => clearTimeout(timeoutId)
  },[error])
  return (
    <main >        
        <section>
            <div>
                <div>
                {error && <p>{error}</p>}                                                                          

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>
                                Email address
                            </label>
                            <input
                                type="email"
                                label="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}  
                                required                                    
                                placeholder="Email address"                                
                            />
                        </div>

                        <div>
                            <label>
                                Password
                            </label>
                            <input
                                type="password"
                                label="Create password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                required                                 
                                placeholder="Password"              
                            />
                        </div>                                             
                        
                        <button
                          type="submit" 
                        >  
                            Sign up                                
                        </button>
                                                                     
                    </form>
                   
                    <p>
                        Already have an account?
                        <NavLink to="/login" >
                            Sign in
                        </NavLink>
                    </p>                   
                </div>
            </div>
        </section>
    </main>
  )
}

export default SignUpPage