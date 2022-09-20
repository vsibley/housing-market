import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import { toast, Toast } from 'react-toastify';
import OAuth from '../components/OAuth';


function SignIn() {

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',

  })

  const { email, password } = formData

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
      [e.target.password]: e.target.value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth();
  
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
  
      if(userCredential.user) {
        navigate('/profile')
      }
    } catch (error) {
      toast.error('Bad User Credentials')
    }

  }

  return (
    <>
      <div className="header px-3 md:px-0 max-w-[1240px] mx-auto pt-[4rem] md:pt-[15rem] min-h-screen">
        <header>
          <p className="pageHeader pb-5">
            Welcome Back!
          </p>
        </header>

        <form onSubmit={onSubmit}>
          <input type="email" className="emailInput" placeholder='Email' id='email' value={email} onChange={onChange}/>

          <div className="passwordInputDiv">
            <input type={showPassword ? 'text' : 'password'} className='passwordInput' placeholder='Password' id='password' value={password} onChange={onChange}/>

            <img src={visibilityIcon} alt="show password" className="showPassword" onClick={() => setShowPassword((prevState) => !prevState )}/>
          </div>
          <div className='flex justify-between items-center'>
          <Link to='/forgot-password' className='text-lg font-semibold cursor-pointer hover:text-gray-300'>Forgot Password</Link>
          <div className="signInBar ">
            <p className="signInText hover:text-gray-300 pr-1 ">
              Sign In
            </p>
            <button className="signInButton "> <ArrowRightIcon fill='#ffff' width='30px' height='30px' /></button>
          </div>
          </div>
        </form>

        <OAuth />
        <Link to='/sign-up' className='registerLink mx-auto'>Sign Up Instead</Link>
      </div>
    </>
  )
}

export default SignIn