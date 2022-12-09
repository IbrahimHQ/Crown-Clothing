import { useState, useContext } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocfromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
//import { UserContext } from "../../contexts/users.contexts";
import './sign-up-form.styles.scss';

const defaultFormFields = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState (defaultFormFields)
    const { username, email, password, confirmPassword } = formFields;

/*  const { setCurrentUser } = useContext(UserContext);
    setCurrentUser(user) --> in try handleSubmit

 */    
    const resetFormFields = () => {
        setFormFields (defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match.")
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            user.displayName = username;  
            await createUserDocfromAuth(user);
            resetFormFields();
        } catch (error) {
            if(error.code === 'auth/email-already-in-use') {
                alert("Email already in use. Please sign in.");
            } else if (error.code === 'auth/weak-password') {
                alert("Password is too weak. Please try again.")
            } else {
                console.log("Error creating user", error);
            };
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    };

    return (
        <div className='sign-up-container'>
            <h2>Create New Account</h2>
            <span>Sign up here!</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Username' type='text' required onChange={handleChange} name='username' value={username}/>
                <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email}/>
                <FormInput label='Password' type='password' required onChange={handleChange} name='password' value={password}/>
                <FormInput label='Confirm Password' type='password' required onChange={handleChange} name='confirmPassword' value={confirmPassword}/>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    );
}

export default SignUpForm;