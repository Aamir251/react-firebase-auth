import { signOut } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom"
import { auth } from "../../firebase";

const Homepage = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    signOut(auth).then(() => {
      // Sign-out successful.
          navigate(0);
          
          console.log("Signed out successfully")
    }).catch((error) => {

      console.log("error ", error);
      // An error happened.
    });
  }

  if(user) {
    return (
      <div>
  
        {user && <nav>
          <button onClick={handleLogout}>Logout</button>
        </nav>}
        
  
          
        {user && <h1>Loggin as {user}</h1>}
  
      </div>
    )
  }

  return (
    <div>
  
        <h2>You are not logged in</h2>

        <div>
          <h4>Please</h4>
        <NavLink to={"/login"}>Login Here</NavLink>
        </div>
      </div>
  )
  
  
}

export default Homepage

