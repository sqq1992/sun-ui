import React, {ChangeEvent, FC, InputHTMLAttributes} from 'react';
import Classnames from 'classnames';

type InputSize = 'large' | 'default' | 'small';


interface BaseInputProps {
    className?: string;
    /** 按钮失效状态 */
    disabled?: boolean;
    /** 设置按钮大小 */
    size?: InputSize;
    type: string;
    addonBefore?: React.ReactNode;
    addonAfter?: React.ReactNode;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}


type NativeInputProps = BaseInputProps & Omit<InputHTMLAttributes<HTMLElement>, 'type' | 'size'>;
type InputProps = Partial<NativeInputProps>

/**
 * Input组件
 * ### 引用方法
 *
 * ~~~js
 * import { Input } from 'sun-ui'
 * ~~~
 */
const Input: FC<InputProps> = (props) => {
    let {
        className,
        disabled,
        size,
        type,
        addonBefore,
        addonAfter,
        ...resetProps
    } = props;

    let boxClsName = Classnames({
        'input-wrapper': true,
        'input-addon-before-box': addonBefore,
        'input-addon-after-box': addonAfter,
    });

    let inputClassName = Classnames({
        'input': true
    });

    return (
        <div className={boxClsName}>
            {addonBefore && (
                <div className="input-addon input-addon-before">
                    {addonBefore}
                </div>
            )}
            <input
                className={inputClassName}
                type={type}
                disabled={disabled}
                {...resetProps}
            />
            {addonAfter && (
                <div className="input-addon input-addon-after">
                    {addonAfter}
                </div>
            )}
        </div>
    );
};

Input.defaultProps = {
    className: '',
    disabled: false,
    size: 'default',
    type: 'text',
    addonBefore: '',
    addonAfter: ''
};

export default Input;
