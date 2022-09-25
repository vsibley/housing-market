import {useState} from 'react';
import {Link} from 'react-router-dom';
import {getAuth, sendPasswordResetEmail} from 'firebase/auth'
import { toast } from 'react-toastify';
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'


function ForgotPassword() {
  const [email, setEmail] = useState('')

  const onChange = e => setEmail(e.target.value)

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email)
      toast.success('Email has been sent! Please allow 1-2 minutes')
    } catch (error) {
      toast.error('Error has occured, please try again')
    }
  }


  return (
    <div className='grid items-center pb-[8rem] px-3 lg:px-0 max-w-[1240px] mx-auto min-h-screen'>
      <main>
      <header>
        <p className="pageHeader pb-5">Forgot Password?</p>
      </header>
        <form onSubmit={onSubmit}>
          <input type="email" placeholder='Email' id={email} value={email} className="emailInput" onChange={onChange} />
          <Link className='forgotPasswordLink pb-5' to='/sign-in'>Sign In</Link>
          <div className="signInBar">
            <div className="signInText">Send Reset Link</div>
            <button className="signInButton">
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px'/>
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default ForgotPassword