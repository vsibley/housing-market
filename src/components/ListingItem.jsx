import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg';
import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg';
import bedIcon from '../assets/svg/bedIcon.svg'
import bathtubIcon from '../assets/svg/bathtubIcon.svg'
import { FaBed, FaBath } from 'react-icons/fa'


function ListingItem({ listing, id, onDelete, onEdit }) {

    const navigate = useNavigate()


    return (
        <li className=''>
            <div className='categoryListing grid py-3 mb-4'>

                <Link
                    to={`/category/${listing.type}/${id}`}
                    className='categoryListingLink cursor-pointer'
                >
                    <img src={listing.imgUrls[0]} alt={listing.name} className='categoryListingImg' />

                </Link>


                    <div className="categoryListingDetails grid">
                    <p className="text-xs cursor-pointer" onClick={() => navigate(`/category/${listing.type}/${id}`)}>
                            {listing.location}
                        </p>
                    <p className="font-bold text-sm md:text-lg cursor" onClick={() => navigate(`/category/${listing.type}/${id}`)}>
                            {listing.name}
                        </p>

                        <p className="categoryListingPrice">
                            ${listing.offer ? listing.discountedPrice
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                : listing.regularPrice
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            {listing.type === 'rent' && '/month'}
                        </p>
                        <div className="categoryListingInfoDiv py-2">
                        <FaBed />
                            <p className="categoryListingInfoText">
                                {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : '1 Bedroom'}
                            </p>
                        <FaBath />
                            <p className='categoryListingInfoText'>
                                {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : '1 Bath'}
                            </p>

                        </div>

                        <span className='categoryListingBtn items-center pt-2 md:hidden'>
                        <p className='inline-flex pr- cursor-pointer pr-[5.25rem]' onClick={() => onDelete(listing.id, listing.name)}> 
                                {onDelete && (
                                    <DeleteIcon fill='rgb(231, 76, 60)' />
                                )} Delete
                            </p>

                        <p className='inline-flex cursor-pointer' onClick={() => onEdit(id)}>
                                {onEdit &&
                                    <EditIcon />}
                                    Update
                            </p>
                        </span>


                    </div>
                <div className='hidden md:flex'>

                    {onDelete && (
                        <DeleteIcon className='removeIcon' fill='rgb(231, 76, 60)' onClick={() => onDelete(listing.id, listing.name)} />
                    )}

                    {onEdit &&
                        <EditIcon className='editIcon' onClick={() => onEdit(id)} />}


                </div>
            </div>
        </li>
    )
}



export default ListingItem