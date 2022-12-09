import SignUpForm from "../../sign-up-form/sign-up-form.component";
import LoginForm from "../../login-form/login-form.component";
import './authentication.styles.scss';

const Authentication = () => {
    return (
        <div className="forms-container">
            <LoginForm />
            <SignUpForm />
        </div>
    );
}

export default Authentication;