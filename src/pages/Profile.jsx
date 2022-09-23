import { useState, useEffect } from 'react'
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { db } from '../firebase.config';
import { updateDoc, doc, collection, getDocs, query, orderBy, deleteDoc, where } from 'firebase/firestore';
import {toast} from 'react-toastify';
import ListingItem from '../components/ListingItem';
import { GoHome } from 'react-icons/go'
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
      toast.success('Listing has been deleted')
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
 

  return <div className='pt-[3rem] max-w-[1240px] px-2 md:px-5 mx-auto min-h-screen pb-8'>
  <main>
    <div className='flex justify-between '>

    <p className="text-3xl md:text-4xl font-bold pb-5">My Profile</p>
    <button type='button' onClick={onLogout} className="btn-sm btn btn-outline text-black md:btn-md">
      Logout
    </button>
    </div>
    <div className="profileDetailsHeader pb-4">
      <p className="profileDetailsText">Personal Details <br/> Only user name can be updated.</p>
      
      
    </div>
    <div className="profileCard max-w-5xl mx-auto">
      <form>
          <p className='font-extrabold'>
        Name: </p><input type="text" id='name' className={!changeDetails ? 'profileName' : 'profileNameActive'} disabled={!changeDetails} value={name} onChange={onChange} />
        
       <p className='font-extrabold'> Email: </p> <input type="text" id='email' className='profileEmail' disabled={!changeDetails || changeDetails} value={email}  />
          
      </form>
    </div>
    <div className='grid gap-4 px-4 pt-6 md:grid-cols-2 '>

        <Link to='/create-listing' className='btn btn-outline text-black'>
      <GoHome/>
          <p className='pl-2'>Sell/Rent your home </p>
      
    </Link>
        <p className='btn btn-outline text-black' onClick={() => {
      changeDetails && onSubmit()
      setChangeDetails((prevState) => !prevState)
    }}>
      {changeDetails ? 'done' : 'edit'}
    </p>
      </div>

    {!loading && listings?.length > 0 && (
      <>
        <p className='pt-7 pb-4 md:py-7 text-xl font-bold'>Your Listings</p>
        <ul>
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