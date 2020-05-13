import React from 'react';
import Classnames from 'classnames';
import {Omit} from '../utils/utils';

//todo 针对枚举的字符串
// declare const ButtonSizeList: ["large", "middle", "small"];
// declare type ButtonSize = (typeof ButtonSizeList)[number];
type ButtonSize = 'large' | 'middle' | 'small';

// declare const ButtonTypes: ['primary', 'danger', 'default', 'link'];
// declare type ButtonType = (typeof ButtonTypes)[number];
type ButtonType = 'primary' | 'danger' | 'default' | 'link';

interface BaseButtonProps {
    className?: string;
    href?: string;
    target?: string;
    disabled?: boolean;
    size?: ButtonSize;
    type?: ButtonType;
    children?: React.ReactNode;
}


type NativeButtonProps = BaseButtonProps & Omit<React.ButtonHTMLAttributes<HTMLElement>, 'type'>;
type AnchorButtonProps = BaseButtonProps & Omit<React.AnchorHTMLAttributes<HTMLElement>, 'type'>;
type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = (props) => {
    let {
        className,
        href,
        target,
        disabled,
        size,
        type,
        children,
        ...resetProps
    } = props;

    let btnClassName = Classnames('btn', {
        [`btn-${type} btn-${size} ${className}`]: true,
        'disabled': disabled && href
    });

    if(href){
        return (
            <a
                href={href}
                target={target}
                className={btnClassName}
                {...resetProps}
            >
                {children}
            </a>
        );
    }

    return (
        <button
            className={btnClassName}
            disabled={disabled}
            {...resetProps}
        >{children}</button>
    );
};

Button.defaultProps = {
    className: '',
    disabled: false,
    size: 'middle',
    type: 'default'
};

export default Button;
