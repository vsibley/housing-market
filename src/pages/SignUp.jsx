import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import OAuth from '../components/OAuth';



function SignUp() {

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',

  })

  const { email, password, name } = formData

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
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user

      updateProfile(auth.currentUser, { displayName: name })

      const formDataCopy = { ...formData }
      delete formDataCopy.password
      formDataCopy.timeStamp = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), formDataCopy);

      navigate('/profile')
    } catch (error) {
      toast.error('Error has occured, please try again.')
    }
  }


  return (
    <>
      <div className="header px-3 md:px-0 max-w-[1240px] mx-auto pt-[4rem] md:pt-[15rem] min-h-screen">        
      <header>
        <p className="pageHeader pb-4">
          Please enter info
        </p>
      </header>

        <form onSubmit={onSubmit}>
          <input type="text" className="nameInput" placeholder='Name' id='name' value={name} onChange={onChange} />
          <input type="email" className="emailInput" placeholder='Email' id='email' value={email} onChange={onChange} />

          <div className="passwordInputDiv">
            <input type={showPassword ? 'text' : 'password'} className='passwordInput' placeholder='Password' id='password' value={password} onChange={onChange} />

            <img src={visibilityIcon} alt="show password" className="showPassword" onClick={() => setShowPassword((prevState) => !prevState)} />
          </div>
          <div className='flex justify-between items-center'>
          
            <Link to='/forgot-password' className='text-lg font-semibold cursor-pointer hover:text-gray-300'>Forgot Password</Link>
          <div className="signUpBar">
              <p className="signUpTex text-lg font-semibold cursor-pointer hover:text-gray-300">
              Sign Up
            </p>
            <button className="signUpButton"> <ArrowRightIcon fill='#ffff' width='34px' height='34px' /></button>
          </div>
          </div>
        </form>

        <OAuth />
        <Link to='/sign-in' className='registerLink'>Sign In Instead</Link>
      </div>
    </>
  )
}

export default SignUp