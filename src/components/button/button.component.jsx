import { BasicButton, GoogleLoginButton, InvertedButton} from './button.styles';

export const BUTTON_TYPE_CLASSES = {
    basic: 'basic',
    google: 'google-sign-in',
    inverted: 'inverted'
}

const Button = ({ children, buttonType, ...otherProps }) => {
    switch (buttonType) {
        case BUTTON_TYPE_CLASSES.google:
            return <GoogleLoginButton {...otherProps}>{children}</GoogleLoginButton>;
        case BUTTON_TYPE_CLASSES.inverted:
            return <InvertedButton {...otherProps}>{children}</InvertedButton>;
        default:
            return <BasicButton {...otherProps}>{children}</BasicButton>;
    }
};

export default Button;