import { BasicButton, GoogleLoginButton, InvertedButton, ButtonSpinner} from './button.styles';

export const BUTTON_TYPE_CLASSES = {
    basic: 'basic',
    google: 'google-sign-in',
    inverted: 'inverted'
}

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
    switch (buttonType) {
        case BUTTON_TYPE_CLASSES.google:
            return (
                <GoogleLoginButton 
                    disabled={isLoading} 
                    {...otherProps}
                >
                    {isLoading ? <ButtonSpinner /> : children} 
                </GoogleLoginButton>
            )
        case BUTTON_TYPE_CLASSES.inverted:
            return (
                <InvertedButton 
                    disabled={isLoading} 
                    {...otherProps}
                >
                    {isLoading ? <ButtonSpinner /> : children} 
                </InvertedButton>
            )
        default:
            return (
                <BasicButton 
                    disabled={isLoading} 
                    {...otherProps}
                >
                    {isLoading ? <ButtonSpinner /> : children} 
                </BasicButton>
            )
    }
};

export default Button;