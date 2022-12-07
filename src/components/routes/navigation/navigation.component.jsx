import { Fragment } from 'react'; //component that renders as nothing to avoid a wrapping div
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrownLogo } from '../../../assets/crown.svg';
import './navigation.styles.scss';

const NavBar = () => {
    return (
      <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                <CrownLogo className='logo' />
            </Link>
            <div className='nav-links-container'>
                <Link className='nav-link' to='/sign-in'>
                SIGN IN
                </Link>
            </div>
        </div>
        <Outlet />
      </Fragment>
    );
  }

  export default NavBar;