import React from 'react'
import Slider from '../components/Slider'
import { RiHomeHeartLine } from 'react-icons/ri'

function Home() {
  return (
      <div className='pb-[8rem] md:px-0 max-w-[1240px] mx-auto min-h-screen'>
      <Slider />
      <section className='items-center flex pt-5 lg:pt-[6rem]'>
          <div className="container  p-4 sm:p-6 lg:p-8">
              <div className="flex flex-wrap -mx-8 ">
                  <div className="w-full lg:w-1/2 px-8">
                      <div className="mb-12 lg:mb-0 pb-12 lg:pb-0 border-b lg:border-b-0">
                          <h2 className="mb-4 text-2xl md:text-4xl font-bold font-heading ">
                                  Welcome to Casa < RiHomeHeartLine className='inline pl-2' />
                          </h2>
                          <p className="mb-8 leading-loose">
                                  The site dedicated to making the selling &amp; renting process easy. We are commited to having the easiest and most transparent prices, hosts and sellers. Here at Casa, your home is our home. That means we've always got <span className='font-bold italic'>our</span> best interest at heart.
                          </p>
                          <div className="w-full md:w-1/3">
                                  <button type="button" className="py-2 px-4  btn bg-[#5af] hover:bg-[#c5e5fb] text-black w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                  Sign Up
                              </button>
                          </div>
                      </div>
                  </div>
                  <div className="w-full lg:w-1/2 px-8">
                      <ul className="space-y-12">

                          <li className="flex -mx-4">
                              <div className="px-4">
                                  <span className="flex w-16 h-16 mx-auto items-center justify-center text-2xl font-bold font-heading rounded-full bg-blue-50 text-[#5af]">
                                      1
                                  </span>
                              </div>
                              <div className="px-4">
                                  <h3 className="my-4 text-xl font-semibold ">
                                      Quick &amp; Easy 
                                  </h3>
                                  <p className="text-gray-500 leading-loose">
                                     Sign up for and account and create your listing. <span className='font-black'>You</span> design the terms and decide what'll work best for you. 
                                  </p>
                              </div>
                          </li>

                          <li className="flex -mx-4">
                              <div className="px-4">
                                  <span className="flex w-16 h-16 mx-auto items-center justify-center text-2xl font-bold font-heading rounded-full bg-blue-50 text-[#5af]">
                                      2
                                  </span>
                              </div>
                              <div className="px-4">
                                  <h3 className="my-4 text-xl font-semibold ">
                                      Flexible Terms 
                                  </h3>
                                  <p className="text-gray-500 leading-loose">
                                      Flexibility is the key. All contracts are designed specifically by the seller/renter and the customer. No third party mediator and but all the safety perks.
                                  </p>
                              </div>
                          </li>

                      </ul>
                  </div>
              </div>
          </div>
      </section>
      </div>

  )
}

export default Home