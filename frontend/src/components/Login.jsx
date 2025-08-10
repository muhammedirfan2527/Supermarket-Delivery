import React, { useContext, useEffect, useState } from 'react'
import './Login.css'
import { StoreContext } from '../context/StoreContext'

const Login = () => {
    const {setToken,setUsername} = useContext(StoreContext)
    const [current,setCurrent] = useState("login")
    const [data,setData] = useState({
      name:"",
      email:"",
      password:""
    })

    const onChangeHandler = (e)=>{
      setData({...data,[e.target.name]:e.target.value})
    }

    const onLogin = async (e)=>{
      e.preventDefault()
      let newUrl
      if(current === "login"){
        newUrl = "http://localhost:4000/api/user/login"
      }else{
        newUrl = "http://localhost:4000/api/user/register"
      }
      try{
        const response = await fetch(newUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        const result = await response.json();
        console.log(result)
        if(response.ok){
          setToken(result.token) 
          setUsername(result.name)
          localStorage.setItem("token",result.token)
          if(result.username){
            localStorage.setItem("username",result.username)
            // console.log("loging"+result.username)
          }else{
            localStorage.setItem("username",result.user.name)
            // console.log("resgister"+result.user.name)
          }
          // console.log(result)
          window.location.replace("/")
        }
        else{
          alert(result.message)
        }
      }catch(error){
        console.error("Error:", error);
        alert("Enter Email & Password")
      }
    }

    const loginwithgoogle = () =>{
      window.open("http://localhost:4000/auth/google/callback","_self")
    }
    // useEffect(()=>{
    //   console.log(data)
    // }, [data])
  return (
    <div className='login'>
      <form className='login-form'>
        {current!== "login"?
        <div className='login-form-title'>
            <h2>Sign up</h2>
            <input type='text' name='name' onChange={onChangeHandler} value={data.name} placeholder='Your name'/>
            <input type='text' name='email' onChange={onChangeHandler} value={data.email} placeholder='Email'/>
            <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='Password' /> 
            <button onClick={onLogin}>Sign up</button>
            <p>Already have an account? <span onClick={()=> setCurrent("login")}>Click here</span></p>
        </div>
        :
        <div className='login-form-title'>
            <h2>Login</h2>
        <input type='email' name='email' onChange={onChangeHandler} value={data.email} placeholder='Email'/>
        <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='Password' />
        <button onClick={onLogin}>Login</button>
        <p>Create a new account? <span onClick={()=> setCurrent("sign")}>Click here</span></p>
        </div>
        }
      </form>
      {/* <button className='login-with-google-btn' onClick={loginwithgoogle}>
        Sign in with google
      </button> */}
    </div>
  )
}

export default Login


// import React, { useState } from 'react'
// import './LoginPopup.css'
// import { assets } from '../../assets/assets'

// const LoginPopup = ({setShowLogin}) => {
//     const [currState,setCurrState] = useState("Login")
//   return (
//     <div className='login-popup'>
//       <form className='login-popup-container'>
//         <div className='login-popup-title'>
//             <h2>{currState}</h2>
//             <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
//         </div>
//         <div className='login-popup-inputs'>
//             {currState==="Login"?<></>:<input type="text" placeholder='Your name' required />}          
//             <input type="email" placeholder='Your email' required />
//             <input type="password" placeholder='password' required />
//         </div>
//         <button>{currState==="Sing Up"?"Create account":"Login"}</button>
//         <div className='login-popup-condition'>
//             <input type="checkbox" required/>
//             <p>By continuing, I agree to the terms of use & privacy policy.</p>
//         </div>
//         {currState==="Login"
//         ?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")} >Click here</span> </p>
//         :<p>Already have an account? <span onClick={()=>setCurrState("Login")} >Login here</span> </p>
//         }    
//       </form>
//     </div>
//   )
// }

// export default LoginPopup

 