import { useState, useEffect } from 'react'
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { db } from '../firebase.config';
import { updateDoc, doc, collection, getDocs, query, orderBy, deleteDoc, where } from 'firebase/firestore';
import {toast} from 'react-toastify';
import ListingItem from '../components/ListingItem';
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg';
import homeIcon from '../assets/svg/homeIcon.svg';
import { async } from '@firebase/util';



function Profile() {

  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const [loading, setLoading] = useState(true)

  const [listings, setListings] = useState(null)

  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const { name, email } = formData;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingsRef = collection(db, 'listings')
      const q = query(listingsRef, where('userRef', '==', auth.currentUser.uid),
      orderBy('timestamp', 'desc')
      )
      const querySnap = await getDocs(q)

      const listings = []

       querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
       })

       setListings(listings)
       setLoading(false)
    }

    fetchUserListings()

  }, [auth.currentUser.uid])
  

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


  const onDelete = async (listingId) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await deleteDoc(doc(db, 'listings', listingId))
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingId
      )
      setListings(updatedListings)
      toast.success('Listing has')
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

  const onEdit = (listingId) => navigate(`/edit-listing/${listingId}`)
 

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

    {!loading && listings?.length > 0 && (
      <>
        <p className='listingText'>Your Listings</p>
        <ul className='listingsList'>
          {listings.map((listing) => (
            <ListingItem
              key={listing.id}
              listing={listing.data}
              id={listing.id}
              onDelete={() => onDelete(listing.id)}
              onEdit={() => onEdit(listing.id)}
            />
          ))}
        </ul>
      </>
    )}
  </main>
</div>
}

export default Profile