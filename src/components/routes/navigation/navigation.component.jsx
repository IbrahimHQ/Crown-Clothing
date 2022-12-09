import { Fragment, useContext } from 'react'; //component that renders as nothing to avoid a wrapping div
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrownLogo } from '../../../assets/crown.svg';
import { UserContext } from '../../../contexts/users.contexts';
import { signOutUser } from '../../../utils/firebase/firebase.utils';
import './navigation.styles.scss';

const NavBar = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);

/*     const signOutHandler = async () => {
      signOutUser();
      setCurrentUser(null);
    } */

    return (
      <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                <CrownLogo className='logo' />
            </Link>
            <div className='nav-links-container'>
              {currentUser ? (<span className='nav-link' onClick={signOutUser}>SIGN OUT</span>)
                : (<Link className='nav-link' to='/auth'>SIGN IN</Link>)
              }
            </div>
        </div>
        <Outlet />
      </Fragment>
    );
  }

  export default NavBar;