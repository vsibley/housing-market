import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/a11y';
import { Virtual } from 'swiper';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])




function Listing() {
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [shareLinkCopied, setShareLinkCopied] = useState(false)

    const navigate = useNavigate()
    const params = useParams()
    const auth = getAuth()

    useEffect(() => {
        const fetchListing = async () => {
            const docRef = doc(db, 'listings', params.listingId)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                setListing(docSnap.data())
                setLoading(false)
            }
        }

        fetchListing()
    }, [navigate, params.listingId])

    if (loading) {
        return <Spinner />
    }

    return (
        <div className='max-w-[1240px] min-h-screen mx-auto mb-10'>
            <main>


                <Swiper modules={[Virtual]} spaceBetween={50} slidesPerView={1} virtual pagination={{ clickable: true }} navigation={true} >
                    {listing.imgUrls.map((slideContent, index) => (
                        <SwiperSlide key={slideContent} virtualIndex={index}>
                            <img src={slideContent} alt="" className='sliderImg' />
                        </SwiperSlide>
                    ))}
                </Swiper>



                <div className='absolute top-0 right-[20%] md:top-5'>
                    <div
                        className='shareIconDiv mt-[5rem]'
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href)
                            setShareLinkCopied(true)
                            setTimeout(() => {
                                setShareLinkCopied(false)
                            }, 2000)
                        }}
                    >
                        <img src={shareIcon} alt='' />
                    </div>
                </div>

                {shareLinkCopied && <p className='linkCopied'>Link Copied!</p>}

                <div className='listingDetails'>
                    <p className='listingName'>
                        {listing.name} - $
                        {listing.offer
                            ? listing.discountedPrice
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            : listing.regularPrice
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </p>
                    <p className='listingLocation'>{listing.location}</p>
                    <p className='listingType'>
                        For {listing.type === 'rent' ? 'Rent' : 'Sale'}
                    </p>
                    {listing.offer && (
                        <p className='discountPrice'>
                            ${listing.regularPrice - listing.discountedPrice} discount
                        </p>
                    )}

                    <ul className='listingDetailsList text-lg'>
                        <li>
                            {listing.bedrooms > 1
                                ? `${listing.bedrooms} Bedrooms`
                                : '1 Bedroom'}
                        </li>
                        <li>
                            {listing.bathrooms > 1
                                ? `${listing.bathrooms} Bathrooms`
                                : '1 Bathroom'}
                        </li>
                        <li>{listing.parking && 'Parking Spot'}</li>
                        <li>{listing.furnished && 'Furnished'}</li>
                    </ul>
                    <div className='pt-4'>
                        {auth.currentUser?.uid !== listing.userRef && (
                            <Link
                                to={`/contact/${listing.userRef}?listingName=${listing.name}`}
                                className='btn btn-outline btn-success flex mx-auto'
                            >
                                Contact Landlord
                            </Link>
                        )}
                    </div>
                    <div className='min-h-screen'>
                        <p className='listingLocationTitle'>Location</p>

                        <div className='leafletContainer'>
                            <MapContainer
                                style={{ height: '100%', width: '100%' }}
                                center={[listing.geolocation.lat, listing.geolocation.lng]}
                                zoom={13}
                                scrollWheelZoom={false}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
                                />

                                <Marker
                                    position={[listing.geolocation.lat, listing.geolocation.lng]}
                                >
                                    <Popup>{listing.location}</Popup>
                                </Marker>
                            </MapContainer>
                        </div>

                        <br />
                        <br />
                    </div>

                </div>
            </main>
        </div>
    )
}

export default Listing