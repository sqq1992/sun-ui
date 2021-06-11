import React, {ChangeEvent, FC, InputHTMLAttributes} from 'react';
import Classnames from 'classnames';

type InputSize = 'large' | 'default' | 'small';


interface BaseInputProps {
    value?: string;
    /** 输入框实时内容 */
    defaultValue?: string;
    /** 输入框默认内容 */
    className?: string;
    /** 输入框失效状态 */
    disabled?: boolean;
    /** 设置输入框大小 */
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
const Input: FC<InputProps> = ({
   disabled = false,
   type = 'text',
   addonBefore = '',
   addonAfter = '',
    ...resetProps
}) => {

    let boxClsName = Classnames({
        'input-wrapper': true,
        'input-addon-before-box': addonBefore,
        'input-addon-after-box': addonAfter,
    });

    let inputClassName = Classnames({
        'input': true
    });

    if('value' in resetProps){
        delete resetProps.defaultValue;
        resetProps.value = resetProps.value || '';
    }

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
                {...resetProps as any}
            />
            {addonAfter && (
                <div className="input-addon input-addon-after">
                    {addonAfter}
                </div>
            )}
        </div>
    );
};



export default Input;
