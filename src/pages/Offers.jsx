import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy, limit, startAfter } from "firebase/firestore";
import { toast } from 'react-toastify';
import { db } from '../firebase.config'
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';



function Offers() {

  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true)

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        //Get reference 
        const listingsRef = collection(db, 'listings')

        //create a querty 
        const q = query(
          listingsRef,
          where('offer', '==', true),
          orderBy('timestamp', 'desc'),
          limit(10),
        )

        //Excecute query 
        const querySnap = await getDocs(q)

        let listings = []

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })

        setListings(listings)
        setLoading(false)
      } catch (error) {
        toast.error('Could not fetch listing, please try again.')
      }
    }

    fetchListings()
  }, );



  return (
    <div className='category'>
      <header>
        <p className='pageHeader'>
         Offers
        </p>
      </header>
      {loading ? (<Spinner />
      ) : listings && listings.length > 0 ? (

        <>
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => (
                <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
              ))}
            </ul>
          </main>
        </>

      ) : (<p>There are no offers currently available.</p>
      )}
    </div>
  )
}

export default Offers