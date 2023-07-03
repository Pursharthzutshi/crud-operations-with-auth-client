import './App.css';
import { useEffect, useState } from "react"
import axios from "axios"

function App() {

  //log in details 

  const [loggedInEmailId,setLoggedInEmailId] = useState("")
  const [loggedInPassword,setLoggedInPassword] = useState("")

  //sign up details
  const [signUpEmailId,setSignUpEmailId] = useState("")
  const [signUpUsername,setSignUpUsername] = useState("")
  const [signUpPassword,setSignUpPassword] = useState("")


  const [showUserDetials,setShowUserDetails] = useState([])

  const [firstName,setFirstName] = useState("")

  const [lastName,setLastName] = useState("")

  const [age,setAge] = useState("")

  const [updatedFirstName,setUpdatedFirstName] = useState("")
  const [updatedLastName,setUpadatedLastName] = useState("")
  const [updatedAge,setUpadatedAge] = useState("")

  const [showUserLoggedIn,setShowUserLoggedIn] = useState("")
  const [showToken,setShowToken] = useState("")

  const [showTokenStatus,setShowTokenStatus] = useState(false)

  const [signUpMessage,setSignUpMessage] = useState("")

  const [showRefreshToken,setShowRefreshToken] = useState("")
  const [refreshTokenStatus,setRefreshTokenStatus] = useState(false)


  //sign Up Table Connection

  
  const signUpUsers = (e) =>{
    axios.post("http://localhost:3001/signup/insertSignUpDetails",{signUpEmailId:signUpEmailId,signUpUsername:signUpUsername,signUpPassword:signUpPassword}).then((res)=>{
      if(res.data.errormessage){
        setSignUpMessage(res.data.errormessage) 
      }
      if(res.data.message){
        setSignUpMessage(res.data.message)
      }
    })
    e.preventDefault()
  
        // window.location.reload();
      } 



  //logIn Users

  axios.defaults.withCredentials = true


  useEffect(()=>{
    axios.get("http://localhost:3001/login/logInUserDetails").then((res)=>{
    if(res.data.loggedIn === true){
      console.log(res)

      localStorage.setItem("acessToken",res.data.token)
      setShowUserLoggedIn(res.data.user.logInUserDetails[0].username)
      setShowToken(res.data.user.accessToken)

        setShowTokenStatus(true)
        if(res.data.user.refreshToken){

          setRefreshTokenStatus(true)
          setShowRefreshToken(res.data.user.refreshToken)
        }else{
          setRefreshTokenStatus(false)
          setShowRefreshToken("")
          
        }
      }
      
    if(res.data.loggedIn === false){

      localStorage.setItem("acessToken","No Token")
        setShowUserLoggedIn(res.data.message)
        setShowToken("No Token generated")
        setShowRefreshToken("")
        console.log(res)
        setShowTokenStatus(false)
        setRefreshTokenStatus(false)
      }

    })
    },[])


  const logInUsers = (e) =>{
    axios.post("http://localhost:3001/login/logInUserDetails",{loggedInEmailId:loggedInEmailId,loggedInPassword:loggedInPassword}).then((res)=>{
      console.log(res)
      // localStorage.setItem("accesstoken",res.data.accessToken)
    })
    e.preventDefault()
            // window.location.reload();
  } 

  //insert Data
  const create = (e) =>{
    // e.preventDefault()

    axios.post("http://localhost:3001/CreateData/InsertUserDetails",{firstName:firstName,lastName:lastName,age:age}).then((res)=>{
      console.log(res)
    })
  }

  //update Data
  const updateFirstName = (id) =>{
    window.location.reload();

    console.log(updatedFirstName)
    axios.put(`http://localhost:3001/update/UpdateFirstName/${id}`,{updatedFirstName:updatedFirstName}).then((res)=>{
      console.log(res)
    })
  }
  const updateLastName = (id) =>{
    window.location.reload();

      axios.put(`http://localhost:3001/update/UpdateLastName/${id}`,{updatedLastName:updatedLastName}).then((res)=>{
        console.log(res)
    })
  }
  const updateAge = (id) =>{
    window.location.reload();

    axios.put(`http://localhost:3001/update/UpdateAge/${id}`,{updatedAge:updatedAge}).then((res)=>{
      console.log(res)
    })
  }

  //show Data
  useEffect(()=>{
    axios.get("http://localhost:3001/ReadData/ReadUserDetails").then((res)=>{
      setShowUserDetails(res.data)
    })

  },[])

  //delete Data
  const deleteUserDetails = (id) =>{
    window.location.reload();

    axios.delete(`http://localhost:3001/DeteteData/DeteteUserData/${id}`,{updatedAge:updatedAge}).then((res)=>{
      console.log(res)
    })
  }




  return (
    <div className="App">

<p>{signUpMessage}</p>

<form>
  <p>Register Form</p>

      <input placeholder='EmailId' type="text" onChange={(e)=>{setSignUpEmailId(e.target.value)}}/>
      <input placeholder='Username' type="text" onChange={(e)=>{setSignUpUsername(e.target.value)}}/>
      <input placeholder='Password' type="text" onChange={(e)=>{setSignUpPassword(e.target.value)}}/>

      <button onClick={signUpUsers}>Submit</button>
  
</form>


<form onSubmit={logInUsers}>
  
  <p>logIn Form</p>

      <input placeholder='EmailId' type="text" onChange={(e)=>{setLoggedInEmailId(e.target.value)}}/>  
      <input placeholder='Password' type="text" onChange={(e)=>{setLoggedInPassword(e.target.value)}}/>

      <button onClick={logInUsers}>Submit</button>
  
</form>
<p>Refresh page after login</p>

<p>User Log in : {showUserLoggedIn}</p>
<p>Token : {showToken}</p>
<p>Token : {showRefreshToken}</p>

{
  (showTokenStatus || refreshTokenStatus) && 
  <div>
  <form onSubmit={create}>
    
    <p>Create Details</p>
        <input placeholder='firstname' type="text" onChange={(e)=>{setFirstName(e.target.value)}}/>
        
  
        <input placeholder='lastname' type="text" onChange={(e)=>{setLastName(e.target.value)}}/>
        
        <input placeholder='age' type="text" onChange={(e)=>{setAge(e.target.value)}}/>
  
        <button>Submit</button>
    
  </form>
  
     <h3>User Details</h3>
  
      {
        showUserDetials.map((val)=>{
          return(
            <div className='user-details'>
           <div>
              firstName : {val.firstName}
              <br></br>
              <input onChange={(e)=>{setUpdatedFirstName(e.target.value)}} type="text" placeholder='updateFirstName'/>
              <button onClick={()=>{updateFirstName(val._id)}}>Update First Name</button>
  </div>
  <div>
              lastName : {val.lastName}
              <br></br>
              <input onChange={(e)=>{setUpadatedLastName(e.target.value)}} type="text" placeholder='updateLastName'/>
              <button onClick={()=>{updateLastName(val._id)}}>Update Last Name</button>
  </div>
  <div>
  
             age : {val.age}
              <br></br>
              <input onChange={(e)=>{setUpadatedAge(e.target.value)}} type="text" placeholder='age'/>
              <button onClick={()=>{updateAge(val._id)}}>Update Age</button>
  
  </div>
  <button onClick={()=>{deleteUserDetails(val._id)}} className='delete-button'>delete</button>
  <br></br>
              </div>
          )
        })
      }
      </div>
}

    </div>
  );
}

export default App;
