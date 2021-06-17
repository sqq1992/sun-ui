import React, {FC, useState, useRef, createContext, ChangeEvent, useEffect} from 'react';
import Classnames from 'classnames';


export interface CheckboxProps {
    checked?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>, checked?:boolean) => void
}

/**
 * Input组件
 * ### 引用方法
 *
 * ~~~js
 * import { Input } from 'sun-ui'
 * ~~~
 */
const Checkbox: FC<CheckboxProps> = ({
    checked = false,
    onChange
}) => {

    const [innerChecked,setInnerChecked] = useState(checked);

    useEffect(() => {
        if(innerChecked!==checked){
            setInnerChecked(checked);
        }
    }, [checked]);

    const handleChange = (e) => {
        let isChecked = !innerChecked;
        onChange && onChange(e, isChecked);
    };

    let inputClsName = Classnames({
        'sun-checkbox': true,
        'checked': innerChecked
    });

    return (
        <label className="sun-checkbox-wrapper">
            <span className={inputClsName}>
                <input type="checkbox" onChange={handleChange}  />
            </span>
            <span className="">33</span>
        </label>
    );
};

export default Checkbox;
