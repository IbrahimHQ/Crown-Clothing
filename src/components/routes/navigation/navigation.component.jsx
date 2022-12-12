import { Fragment, useContext } from 'react'; //Fragment --> component that renders as nothing to avoid a wrapping div
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrownLogo } from '../../../assets/crown.svg';
import CartIcon from '../../cart-icon/cart-icon.components';
import CartDropdown from '../../cart-dropdown/cart-dropdown.components';
import { UserContext } from '../../../contexts/users.contexts';
import { DropdownContext } from '../../../contexts/dropdown.context';
import { signOutUser } from '../../../utils/firebase/firebase.utils';
import './navigation.styles.scss';

const NavBar = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const { openCart } = useContext(DropdownContext);

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
              <Link className='nav-link' to='/shop'>
                SHOP
              </Link>
              {currentUser ? (<span className='nav-link' onClick={signOutUser}>SIGN OUT</span>)
                : (<Link className='nav-link' to='/auth'>SIGN IN</Link>)
              }
              <CartIcon />
            </div>
            {openCart && <CartDropdown />} {/* //double ampersand means that if both values are true, the last item will return, note: all components are true */}
        </div>
        <Outlet />
      </Fragment>
    );
  }

  export default NavBar;