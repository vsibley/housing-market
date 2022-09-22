

import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase.config'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/a11y'; import Spinner from './Spinner'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay])

function Slider() {
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)
  const location = useLocation();


  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true
    }
  }

  const navigate = useNavigate()

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, 'listings')
      const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5))
      const querySnap = await getDocs(q)

      let listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setListings(listings)
      setLoading(false)
    }

    fetchListings()
    console.log(listings)
  }, [])

  if (loading) {
    return <Spinner />
  }

  if (listings.length === 0) {
    return <></>
  }

  return (
    listings && (
      <>

        <p className={pathMatchRoute('/') ? 'hidden' : 'exploreHeading font-normal text-xl py-3 px-3'}> Recently added properties</p>

        {pathMatchRoute('/') ? (
          <Swiper
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
          >
            {listings.map(({ data, id }) => (
              <SwiperSlide
                key={id}
                onClick={() => navigate(`/category/${data.type}/${id}`)}
              >
                <div
                  style={{
                    background: `url(${data.imgUrls[0]}) center no-repeat`,
                    backgroundSize: 'cover',
                    height: '30vh'
                  }}
                  className='swiperSlideDiv'
                >
                  <p className='swiperSlideText'>{data.name}</p>
                  <p className='swiperSlidePrice'>
                    ${data.discountedPrice ?? data.regularPrice}{' '}
                    {data.type === 'rent' && '/ month'}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) 
        
        : (
        <Swiper
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
        >
          {listings.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div
                style={{
                  background: `url(${data.imgUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                  height: '55vh'
                }}
                className='swiperSlideDiv'
              >
                <p className='swiperSlideText'>{data.name}</p>
                <p className='swiperSlidePrice'>
                  ${data.discountedPrice ?? data.regularPrice}{' '}
                  {data.type === 'rent' && '/ month'}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        )}
        
      </>
    )
  )
}

export default Slider