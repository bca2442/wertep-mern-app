import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// Import the hook to read global state
import { useSelector } from 'react-redux'; 

export default function Header() {
    // 1. SELECTOR: Access the 'currentUser' object from the Redux store
    const { currentUser } = useSelector(state => state.user);

    return (
        <header className='bg-slate-200 shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                
                {/* Logo/Application Name (Linked to Home) */}
                <Link to='/'>
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                        <span className='text-slate-500'>MERN</span>
                        <span className='text-slate-700'>AuthApp</span>
                    </h1>
                </Link>

                {/* Search Bar (Optional, but good for a complete navigation) */}
                <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
                    <input
                        type='text'
                        placeholder='Search...'
                        className='bg-transparent focus:outline-none w-24 sm:w-64'
                    />
                    <FaSearch className='text-slate-600' />
                </form>

                {/* Navigation Links */}
                <ul className='flex gap-4'>
                    <Link to='/'>
                        <li className='hidden sm:inline text-slate-700 hover:underline'>
                            Home
                        </li>
                    </Link>
                    <Link to='/about'>
                        <li className='hidden sm:inline text-slate-700 hover:underline'>
                            About
                        </li>
                    </Link>
                    
                    {/* 2. CONDITIONAL RENDERING: Check if currentUser exists */}
                    <Link to='/profile'>
                        {currentUser ? (
                            // If user is logged in, show their profile picture
                            <img 
                                className='rounded-full h-7 w-7 object-cover'
                                src={currentUser.avatar || 'default_avatar_url'} 
                                alt='profile' 
                            />
                        ) : (
                            // If user is NOT logged in, show the Sign In link
                            <li className='text-slate-700 hover:underline'>Sign in</li>
                        )}
                    </Link>
                </ul>
            </div>
        </header>
    );
}