
import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'

function Contact() {
    const [message, setMessage] = useState('')
    const [landlord, setLandlord] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()

    const params = useParams()

    useEffect(() => {
        const getLandlord = async () => {
            const docRef = doc(db, 'users', params.landlordId)
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setLandlord(docSnap.data())
            } else {
                toast.error('Could not get landlord info. Please try again later.')
            }
        }

        getLandlord()
    }, [params.landlordId])

    const onChange = (e) => setMessage(e.target.value);



    return (
        <div className='pageContainer'>
            <header className='pageHeader'>
                Contact Landlord
            </header>

            {landlord !== null 
            ? (
            
            <main>
                <div className="contactLandlord">
                    <p className="landlordName">
                        Contact {landlord?.name}
                    </p>
                </div>
                <form  className="messageForm">
                    <div className="messageDiv">
                        <label htmlFor="message" className="messageLabel">
                            Message
                        </label>
                        <textarea name="message" id="message" className='textarea' value={message} onChange={onChange} />
                    </div>
                    <a href={`mailto:${landlord.email}?Subject=${searchParams.get('listingName')}&body=${message}`} target='_blank' rel='noreffer'> 
                    <button type='button' className="primaryButton">
                        Send Message
                    </button>
                    </a>
                </form>
            </main>
            ) 
            : (
                <div><p>The landlord that created this listing has been removed for violating our terms and agreements. We apologize for the inconvicence and hope you find another property you're interested in.</p></div>
            ) }

        </div>
    )
}

export default Contact