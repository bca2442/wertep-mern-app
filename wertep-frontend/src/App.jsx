import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header'; 
import PrivateRoute from './components/PrivateRoute'; 

export default function App() {
    return (
        <BrowserRouter>
            {/* Header is outside of Routes so it appears on all pages */}
            <Header /> 
            
            <Routes>
                {/* Public Routes: Accessible to everyone */}
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/sign-in' element={<SignIn />} />
                <Route path='/sign-up' element={<SignUp />} />
                
                {/* Protected Routes: Only accessible to logged-in users */}
                <Route element={<PrivateRoute />}>
                    {/* All child routes inside this <Route> element are protected */}
                    <Route path='/profile' element={<Profile />} /> 
                </Route>
            </Routes>
        </BrowserRouter>
    );
}