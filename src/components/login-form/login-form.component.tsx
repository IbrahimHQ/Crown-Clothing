import { useState, useContext, FormEvent, ChangeEvent } from "react";
import { 
    auth, 
    signInWithGooglePopup, 
    signInWithGoogleRedirect, 
    createUserDocfromAuth, 
    loginAuthUserWithEmailandPassword 
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {LoginContainerStyled, ButtonsContainerStyled} from './login-form.styles';
import { AuthError, AuthErrorCodes } from "firebase/auth";
//import { UserContext } from "../../contexts/users.contexts";
/* import { useEffect } from "react";
import { getRedirectResult } from 'firebase/auth';
 */

const defaultFormFields = {
    email: '',
    password: '',
}

const LoginForm = () => {
    const [formFields, setFormFields] = useState (defaultFormFields)
    const { email, password } = formFields;

/*  consolidated into OnAuthStateListener
    const { setCurrentUser } = useContext (UserContext);
    setCurrentUser(-const returned by loginAuthUserWithEm&Pass) 
    setCurrentUser(-const user returned by signInWithGooglePopup*/

    const resetFormFields = () => {
        setFormFields (defaultFormFields);
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await loginAuthUserWithEmailandPassword (email, password);
            resetFormFields();
        } catch (error) {
            switch ((error as AuthError).code) {
                case AuthErrorCodes.INVALID_PASSWORD : alert ('Incorrect Password'); break
                case AuthErrorCodes.USER_DELETED : alert ('No User with this Email'); break
                default: console.log(error);
            };
        };
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    };

    /*     useEffect (() => async () => {
        const response = await getRedirectResult(auth);
        if(response) {
            const userDocRef = await createUserDocfromAuth(response.user);
        }
    }, []); //will run on remount upon returning to signin page
 */
    const loginWithGooglePopup = async () => {
        try {
            await signInWithGooglePopup();
            //await createUserDocfromAuth(user); --> const user form calling signInWithGooglePopup
        } catch (error) {
            console.log("Error logging in", error);
        }
    }

/*     const logGoogleRedirectUser = async () => {
        const { user }  = await signInWithGoogleRedirect();
        const userDocRef = await createUserDocfromAuth(user);
    } */

    return (
        <LoginContainerStyled>
            <h2>Already have an account?</h2>
            <span>Login here!</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email}/>
                <FormInput label='Password' type='password' required onChange={handleChange} name='password' value={password}/>
                <ButtonsContainerStyled>
                    <Button type='submit'>Login</Button>
                    <Button 
                        type='button' 
                        onClick={loginWithGooglePopup} 
                        buttonType={BUTTON_TYPE_CLASSES.google}
                    >
                        Login with Google
                    </Button>
                </ButtonsContainerStyled>

            </form>
        </LoginContainerStyled>
    );
}

export default LoginForm;