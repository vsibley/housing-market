import React from 'react'
import { Link } from 'react-router-dom'
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg'
import Slider from '../components/Slider'

function Explore() {
  return (
    <div className='pt-[3rem] px-3 pb-[8rem] md:px-0 max-w-[1240px] mx-auto'>
      <header>
        <p className='pageHeader'> Explore available properties </p>
      </header>

      <main>
        <Slider />


        <p className="exploreCategoryHeading text-2xl pb-5">Categories</p>
        <div className="exploreCategories">
          <Link to='/category/rent'>
            <img src={rentCategoryImage} alt="Rent categories image" className='exploreCategoryImg' />
            <p className="exploreCategoryName">Places for rent</p>
          </Link>

          <Link to='/category/sale'>
            <img src={sellCategoryImage} alt="Rent categories image" className='exploreCategoryImg' />
            <p className="exploreCategoryName">Places for sale</p>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Explore