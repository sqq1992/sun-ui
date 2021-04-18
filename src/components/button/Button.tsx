import React, {FC, ButtonHTMLAttributes, AnchorHTMLAttributes} from 'react';
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
    /** 按钮额外的类名 */
    className?: string;
    /** 点击跳转的地址, 与a链接一样 */
    href?: string;
    /** 相当于a链接跳转的地址 */
    target?: string;
    /** 按钮失效状态 */
    disabled?: boolean;
    /** 设置按钮大小 */
    size?: ButtonSize;
    /** 设置按钮风格 */
    type?: ButtonType;
    children?: React.ReactNode;
}


type NativeButtonProps = BaseButtonProps & Omit<ButtonHTMLAttributes<HTMLElement>, 'type'>;
type AnchorButtonProps = BaseButtonProps & Omit<AnchorHTMLAttributes<HTMLElement>, 'type'>;
type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

/**
 * Button组件
 * ### 引用方法
 *
 * ~~~js
 * import { Button } from 'sun-ui'
 * ~~~
 */
const Button: FC<ButtonProps> = ({
     className = '',
     href,
     target,
     disabled = false,
     size = "middle",
     type = "default",
     children,
     ...resetProps
}) => {


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

export default Button;
