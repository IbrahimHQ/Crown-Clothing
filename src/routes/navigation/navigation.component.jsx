import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import CartIcon from '../../components/cart-icon/cart-icon.components';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.components';

import { DropdownContext } from '../../contexts/dropdown.context';
import { selectCurrentUser } from '../../store/user/user.selectors';

import { signOutUser } from '../../utils/firebase/firebase.utils';

import { NavigationContainer, NavLinksContainer, LogoContainer, NavLink} from './navigation.styles';

const NavBar = () => {
    const currentUser = useSelector(selectCurrentUser);
    const { openCart } = useContext(DropdownContext);

    return (
      <Fragment>
        <NavigationContainer>
            <LogoContainer to='/'>
                <CrownLogo className='logo' />
            </LogoContainer>
            <NavLinksContainer>
              <NavLink to='/shop'>
                SHOP
              </NavLink>
              {currentUser ? (<NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>)
                : (<NavLink to='/auth'>SIGN IN</NavLink>)
              }
              <CartIcon />
            </NavLinksContainer>
            {openCart && <CartDropdown />} {/* //double ampersand means that if both values are true, the last item will return, note: all components are true */}
        </NavigationContainer>
        <Outlet />
      </Fragment>
    );
  }

  export default NavBar;