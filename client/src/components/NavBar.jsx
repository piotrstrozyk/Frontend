import { Link } from "react-router-dom";
import './Navbar.scss'; // Załaduj plik ze stylami SCSS

const Navbar = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:7000/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        alert('Logout successful');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <nav className="navbar">
      
      <div className="flex items-center">
        
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/profile" className="nav-link">
          Profile
        </Link>
        <Link to="/admin/add" className="nav-link">
          Admin Books
        </Link>
        <Link to="/admin/users" className="nav-link">
          Admin Users
        </Link>
        <Link to="/admin/comments" className="nav-link">
          Admin Comments
        </Link>
        <Link to="/stats" className="nav-link">
          Stats
        </Link>
        
      </div>
      <div>
        <Link to="/register" className="nav-link">
          Sign In
        </Link>
        <button onClick={handleLogout} className="logout-btn">
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
