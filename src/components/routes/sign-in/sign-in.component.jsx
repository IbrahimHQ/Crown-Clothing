import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocfromAuth } from "../../../utils/firebase/firebase.utils";
import SignUpForm from "../../sign-up-form/sign-up-form.component";
/* import { useEffect } from "react";
import { getRedirectResult } from 'firebase/auth';
 */
const SignIn = () => {
/*     useEffect (() => async () => {
        const response = await getRedirectResult(auth);
        if(response) {
            const userDocRef = await createUserDocfromAuth(response.user);
        }
    }, []); //will run on remount upon returning to signin page
 */
    const logGooglePopupUser = async () => {
        const { user }  = await signInWithGooglePopup();
        const userDocRef = await createUserDocfromAuth(user);
    }

/*     const logGoogleRedirectUser = async () => {
        const { user }  = await signInWithGoogleRedirect();
        const userDocRef = await createUserDocfromAuth(user);
    } */

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGooglePopupUser}>
                Sign in with Google.
            </button>
{/*             <button onClick={signInWithGoogleRedirect}>
                Sign in with Google Redirect.
            </button>
 */}        <SignUpForm />
        </div>
    );
}

export default SignIn;