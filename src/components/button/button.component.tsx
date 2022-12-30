import { BasicButton, GoogleLoginButton, InvertedButton, ButtonSpinner} from './button.styles';
import { ButtonHTMLAttributes } from 'react';

export enum BUTTON_TYPE_CLASSES {
    basic = 'basic',
    google = 'google-sign-in',
    inverted = 'inverted'
};

type ButtonProps = {
    buttonType?: BUTTON_TYPE_CLASSES;
    isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>; //adds typical button attributes(like otherProps and disabled) to this type

const Button = ({ children, buttonType, isLoading, ...otherProps }: ButtonProps) => {
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