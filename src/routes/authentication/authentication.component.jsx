import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import LoginForm from "../../components/login-form/login-form.component";
import { FormsContainerStyled } from './authentication.styles';

const Authentication = () => {
    return (
        <FormsContainerStyled>
            <LoginForm />
            <SignUpForm />
        </FormsContainerStyled>
    );
}

export default Authentication;