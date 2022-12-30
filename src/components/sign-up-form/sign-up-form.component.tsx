import { useState, useContext, FormEvent, ChangeEvent } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocfromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
//import { UserContext } from "../../contexts/users.contexts";
import  { SignUpContainerStyled } from './sign-up-form.styles';
import { AuthError, AuthErrorCodes } from "firebase/auth";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields;

/*  const { setCurrentUser } = useContext(UserContext);
    setCurrentUser(user) --> in try handleSubmit
 */    

    const resetFormFields = () => {
        setFormFields (defaultFormFields);
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== confirmPassword) (alert("Passwords do not match."));
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocfromAuth(user, { displayName });
            resetFormFields();
        } catch (error) {
            switch ((error as AuthError).code) {
                case AuthErrorCodes.EMAIL_EXISTS : alert("Email already in use. Please sign in."); break
                case AuthErrorCodes.WEAK_PASSWORD : alert("Password is too weak. Please try again."); break
                default: console.log("Error creating user", error);
            };
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    };

    return (
        <SignUpContainerStyled>
            <h2>Create New Account</h2>
            <span>Sign up here!</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Username' type='text' required onChange={handleChange} name='displayName' value={displayName}/>
                <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email}/>
                <FormInput label='Password' type='password' required onChange={handleChange} name='password' value={password}/>
                <FormInput label='Confirm Password' type='password' required onChange={handleChange} name='confirmPassword' value={confirmPassword}/>
                <Button type='submit'>Submit</Button>
            </form>
        </SignUpContainerStyled>
    );
}

export default SignUpForm;