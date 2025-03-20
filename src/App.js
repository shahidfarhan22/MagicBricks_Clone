
// import React, { useEffect, useState } from 'react';
// import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom';
// import Buy from './pages/Buy';
// import Rent from './pages/Rent';
// import Sell from './pages/Sell';
// import MyFavorites from './pages/MyFavorites';
// import NoPage from './pages/NoPage';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import SubscriptionPage from './pages/SubscriptionPage';
// import AddProperty from './components/AddProperty';
// import PropertyListings from './components/PropertyListings';
// import './header.css';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userRole, setUserRole] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const role = localStorage.getItem('role');
//     if (token) {
//       setIsLoggedIn(true);
//       setUserRole(role);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     setIsLoggedIn(false);
//     setUserRole(null);
//   };

//   return (
//     <div>
//       <BrowserRouter>
//         <header className="main-header">
//           {/* Logo on the far left */}
//           <div className="logo">
//             <Link to="/">MagicBricks</Link>
//           </div>

//           {/* Navigation links for Buy and Rent on the left side */}
//           <nav className="nav-links-left">
//             <ul>
//               <li>
//                 <Link to="/properties">Buy</Link>
//               </li>
//               <li>
//                 <Link to="/Rent">Rent</Link>
//               </li>
//             </ul>
//           </nav>

//           {/* Login/Register buttons on the far right */}
//           <div className="nav-right">
//             {!isLoggedIn ? (
//               <>
//                 <Link to="/Login">Login</Link>
//                 <Link to="/Register">Register</Link>
//               </>
//             ) : (
//               <button onClick={handleLogout}>Logout</button>
//             )}
//           </div>
//         </header>

//           {/* Routes go here */}
//         <Routes>
//           <Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} />
//           <Route path="/Register" element={<Register />} />
//           <Route path="*" element={<NoPage />} />
//           <Route path="/properties" element={<PropertyListings />} />
//           <Route path="/Rent" element={<Rent />} />
//           <Route path="/add-property" element={isLoggedIn && userRole === 'Seller' ? <AddProperty /> : <Navigate to="/Login" />} />
//           <Route path="/MyFavorites" element={isLoggedIn && userRole === 'Buyer' ? <MyFavorites /> : <Navigate to="/Login" />} />
//           <Route path="/SubscriptionPage" element={isLoggedIn && userRole === 'Buyer' ? <SubscriptionPage /> : <Navigate to="/Login" />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom';
import Buy from './pages/Buy';
import Rent from './pages/Rent';
import Sell from './pages/Sell';
import MyFavorites from './pages/MyFavorites';
import NoPage from './pages/NoPage';
import Login from './pages/Login';
import Register from './pages/Register';
import SubscriptionPage from './pages/SubscriptionPage';
import AddProperty from './components/AddProperty';
import PropertyListings from './components/PropertyListings';
import './header.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setUserRole(null);
  };

  return (
    <div>
      <BrowserRouter>
        <header className="main-header">
          {/* Logo on the far left */}
          <div className="logo">
            <Link to="/">MagicBricks</Link>
          </div>

          {/* Navigation links for Buy and Rent on the left side */}
          <nav className="nav-links-left">
            <ul>
              <li>
                <Link to="/properties">Buy</Link>
              </li>
              <li>
                <Link to="/Rent">Rent</Link>
              </li>
              {/* Conditionally render MyFavorites and Subscription links */}
              {isLoggedIn && userRole === 'Buyer' && (
                <>
                  <li>
                    <Link to="/MyFavorites">My Favorites</Link>
                  </li>
                  <li>
                    <Link to="/SubscriptionPage">Subscription</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>

          {/* Login/Register buttons on the far right */}
          <div className="nav-right">
            {!isLoggedIn ? (
              <>
                <Link to="/Login">Login</Link>
                <Link to="/Register">Register</Link>
              </>
            ) : (
              <button onClick={handleLogout}>Logout</button>
            )}
          </div>
        </header>

        {/* Routes go here */}
        <Routes>
          <Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} />
          <Route path="/Register" element={<Register />} />
          <Route path="*" element={<NoPage />} />
          <Route path="/properties" element={<PropertyListings />} />
          <Route path="/Rent" element={<Rent />} />
          <Route path="/add-property" element={isLoggedIn && userRole === 'Seller' ? <AddProperty /> : <Navigate to="/Login" />} />
          <Route path="/MyFavorites" element={isLoggedIn && userRole === 'Buyer' ? <MyFavorites /> : <Navigate to="/Login" />} />
          <Route path="/SubscriptionPage" element={isLoggedIn && userRole === 'Buyer' ? <SubscriptionPage /> : <Navigate to="/Login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
