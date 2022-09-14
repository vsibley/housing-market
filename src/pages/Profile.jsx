import { useState, useEffect } from 'react'
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { db } from '../firebase.config';
import { updateDoc, doc } from 'firebase/firestore';
import {toast} from 'react-toastify';
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg';
import homeIcon from '../assets/svg/homeIcon.svg';



function Profile() {

  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);

  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const { name, email } = formData;

  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      if(auth.currentUser.displayName !== name) {
        //update display name in FB
        await updateProfile(auth.currentUser, {
          displayName: name
        })

        //update Firestore 
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name
        })
      }
    } catch (error) {
      toast.error('Could not update profile details.')
    }
  }
  const onLogout = () => {
    auth.signOut()
    navigate('/sign-in')
  }
  const onChange = (e) => {
    setFormData((prevState) => ({
    ...prevState,
    [e.target.id]: e.target.value,
    

  }))
}


return <div>
  <header className="profileHeader">
    <p className="pageHeader">My Profile</p>
    <button type='button' onClick={onLogout} className="logOut">
      Logout
    </button>
  </header>
  <main>
    <div className="profileDetailsHeader">
      <p className="profileDetailsText">Personal Details <br/> Only user name can be updated.</p>
      
      <p className='changePersonalDetails' onClick={() => {
        changeDetails && onSubmit()
        setChangeDetails((prevState) => !prevState)
      }}>
        {changeDetails ? 'done' : 'change'}
      </p>
    </div>
    <div className="profileCard">
      <form>
        <input type="text" id='name' className={!changeDetails ? 'profileName' : 'profileNameActive'} disabled={!changeDetails} value={name} onChange={onChange} />
        
        <input type="text" id='email' className='profileEmail' disabled={!changeDetails || changeDetails} value={email}  />

      </form>
    </div>
    <Link to='/create-listing' className='createListing'>
      <img src={homeIcon} alt="home" />
      <p>Sell or rent your home </p>
      <img src={arrowRight} alt="arrowRight" />
    </Link>
  </main>
</div>
}

export default Profile