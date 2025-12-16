import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute() {
    // 1. Check Redux state for the current user
    const { currentUser } = useSelector((state) => state.user);

    // 2. Conditional Rendering Logic
    // If a user is logged in (currentUser is not null), render the child routes (<Outlet />).
    // If no user is logged in, redirect them to the /sign-in page (<Navigate />).
    
    // 

    return currentUser ? <Outlet /> : <Navigate to='/sign-in' />;
}