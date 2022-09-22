import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as OfferIcon } from '../assets/svg/localOfferIcon.svg'
import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg'
import { ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { RiHomeHeartLine } from 'react-icons/ri'
function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [nav, setNav] = useState(false);


    const pathMatchRoute = (route) => {
        if (route === location.pathname) {
            return true
        }
    }

        const changeNav = () => {
        setNav(!nav)
    }

    return (
        <div className='navbar'>
            <div className='flex justify-between items-center w-full h-full max-w-[1240px] mx-auto'>
                <a href='/' alt='home link'>
                    <RiHomeHeartLine className='text-3xl md:text-5xl text text-[#5af]'/>
                </a>
                <div>
                    <ul className='hidden md:flex space-x-5 '>
                        <li className="" onClick={() => navigate('/')}>
                           
                            <p className={pathMatchRoute('/') ? 'text-lg font-bold text-gray-400' : 'text-lg '} > Home </p>
                        </li>
                        <li className="" onClick={() => navigate('/explore')}>
                           
                            <p className={pathMatchRoute('/explore') ? 'text-lg font-bold text-gray-400' : 'text-lg '} > Explore </p>
                        </li>
                        
                        <li className="navbarListItem" onClick={() => navigate('/offers')}>
                          
                            <p className={pathMatchRoute('/offers') ? 'text-lg font-bold text-gray-400' : 'text-lg '}> Offers </p>
                        </li>

                        <li className="navbarListItem" onClick={() => navigate('/profile')}>
                            <p className={pathMatchRoute('/profile') ? 'text-lg font-bold text-gray-400' : 'text-lg '}>Profile</p>
                        </li>
                     
                    </ul>
                    <div className='md:hidden' onClick={changeNav}>
                        <AiOutlineMenu size={25} />
                    </div>
                </div>
            </div>

            {/* Side-Mobile Menu  */}

            <div className={nav ? 'navbarNav md:hidden fixed left-0 top-0 right-0 w-full h-screen bg-black/90 text-white' : ''}>
                <div
                    className={
                        nav
                            ? 'navbarNavmd:hidden fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen p-7 ease-in duration-500'
                            : 'fixed left-[-100%] top-0 p-10 ease-in duration-500'
                    }
                >
                    <div>
                        <div className='flex w-full justify-end pb-2'>
                            <div className='rounded-full  shadow-gray-500 cursor-pointer' onClick={changeNav}>
                                <AiOutlineClose size={25} />
                            </div>
                        </div>
                        <div className='border-b border-gray-300 my-3'>

                        </div>
                    </div>
                    <div className='py-3 flex flex-col'>
                        <ul className='uppercase'>

                            <li className="" onClick={() => navigate('/')}>

                                <p className={pathMatchRoute('/') ? 'text-lg font-bold text-gray-500 pb-3' : 'text-lg pb-3'} onClick={() => setNav(false)}> Home </p>
                            </li>

                            <li className="" onClick={() => navigate('/explore')}>

                                <p className={pathMatchRoute('/explore') ? 'text-lg font-bold text-gray-500 pb-3' : 'text-lg pb-3'} onClick={() => setNav(false)}> Explore </p>
                            </li>

                            <li className="" onClick={() => navigate('/offers')}>

                                <p className={pathMatchRoute('/offers') ? 'text-lg font-bold text-gray-500 pb-3' : 'text-lg pb-3 '} onClick={() => setNav(false)}> Offers </p>
                            </li>
                            <li className="" onClick={() => navigate('/profile')}>

                                <p className={pathMatchRoute('/profile') ? 'text-lg font-bold text-gray-500 pb-3' : 'text-lg pb-3'} onClick={() => setNav(false)}>Profile</p>
                            </li>
                            
                        </ul>
                        
                    </div>
                </div>

            </div>
        </div>
    )
}

    // return (
    //     <footer className=''>
    //          <nav className="navbarNav">
    //             <ul className="navbarListItems">
                    
    //                 <li className="navbarListItem" onClick={() => navigate('/')}>
    //                     <ExploreIcon fill={pathMatchRoute('/') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px' />
    //                     <p className={pathMatchRoute('/') ? 'navbarListItemNameActive' : 'navbarListName'}> Explore </p>
    //                 </li>
    //                 <li className="navbarListItem" onClick={() => navigate('/offers')}>
    //                     <OfferIcon fill={pathMatchRoute('/offers') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px' />
    //                     <p className={pathMatchRoute('/offers') ? 'navbarListItemNameActive' : 'navbarListName'}> Offers </p>
    //                 </li>
    //                 <li className="navbarListItem" onClick={() => navigate('/profile')}>
    //                     <PersonOutlineIcon fill={pathMatchRoute('/profile') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px' />
    //                     <p className={pathMatchRoute('/profile') ? 'navbarListItemNameActive' : 'navbarListName'}>Profile</p>
    //                 </li>
    //             </ul>
    //         </nav> 


            

//             <div className="navbar bg-base-100 flex justify-between items-center max-w-5xl">
//                 <div className="flex-1">
//                     <a className="normal-case text-xl" onClick={() => navigate('/')}>Housing</a>
//                 </div>
//                 <div className="flex-none">
//                     <ul className="menu menu-horizontal p-0">
//                         <li className="navbarListItem" onClick={() => navigate('/')}>
//                             {/* <ExploreIcon fill={pathMatchRoute('/') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px' /> */}
//                             <p className={pathMatchRoute('/') ? 'text-lg font-bold' : 'text-lg '}> Explore </p>
//                         </li>
//                         <li className="navbarListItem" onClick={() => navigate('/offers')}>
//                             {/* <OfferIcon fill={pathMatchRoute('/offers') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px' /> */}
//                             <p className={pathMatchRoute('/offers') ? 'text-lg font-bold' : 'text-lg '}> Offers </p>
//                         </li>
//                         <li className="navbarListItem" onClick={() => navigate('/profile')}>
//                             {/* <PersonOutlineIcon fill={pathMatchRoute('/profile') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px' /> */}
//                             <p className={pathMatchRoute('/profile') ? 'text-lg font-bold text-gray-400' : 'text-lg '}> Profile </p>
//                         </li>
//                     </ul>
//                 </div>
//             </div>

//         </footer>
//     )
// }

export default Navbar