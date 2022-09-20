import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy, limit, startAfter } from "firebase/firestore";
import { toast } from 'react-toastify';
import { db } from '../firebase.config'
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';



function Category() {

  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchedListing, setLastFetchedListing] = useState(null)

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        //Get reference 
        const listingsRef = collection(db, 'listings')

        //create a querty 
        const q = query(
          listingsRef,
          where('type', '==', params.categoryName),
          orderBy('timestamp', 'desc'),
          limit(7),
        )

        //Excecute query 
        const querySnap = await getDocs(q)

        const lastVisible = querySnap.docs[querySnap.docs.length-1]
        setLastFetchedListing(lastVisible)

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
  }, [params.categoryName]);


  //LOAD MORE LISTINGS 
  const onFetchMoreListings = async () => {
    try {
      //Get reference 
      const listingsRef = collection(db, 'listings')

      //create a querty 
      const q = query(
        listingsRef,
        where('type', '==', params.categoryName),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(7),
      )

      //Excecute query 
      const querySnap = await getDocs(q)

      const lastVisible = querySnap.docs[querySnap.docs.length - 1]
      setLastFetchedListing(lastVisible)

      let listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })

      setListings((prevState) => [...prevState,...listings])
      setLoading(false)
    } catch (error) {
      toast.error('Could not fetch listing, please try again.')
    }
  }

  return (
    <div className='px-4 md:px-0 max-w-[1240px] mx-auto'>
      <header>
        <p className='pageHeader'>
          {params.categoryName === 'rent'
            ? 'Places for rent'
            : 'Places for sale'}
        </p>
      </header>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className='categoryListings'>
              {listings.map((listing) => (
                <ListingItem
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />
              ))}
            </ul>
          </main>

          <div className='flex pb-5'>
          {lastFetchedListing && (
            <p className='loadMore btn btn-outline' onClick={onFetchMoreListings}>
              Load More
            </p>
          )}
            </div>
        </>
      ) : (
        <p>No listings for {params.categoryName}</p>
      )}
    </div>
  )
}

export default Category