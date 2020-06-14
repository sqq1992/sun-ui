import React, {FC, useContext, KeyboardEvent, useEffect, useState, useRef} from 'react';
import Classnames from 'classnames';
import { SelectContext } from './Select';



export interface selectOptionProps {
    index?: string,
    value?: any;
    /** 输入框选择内容 */
    key?: any;
    /** 数据来源 */
    className?: string;
    disabled?: boolean;
}




/**
 * Input组件
 * ### 引用方法
 *
 * ~~~js
 * import { Input } from 'sun-ui'
 * ~~~
 */
const Option: FC<selectOptionProps> = (props) => {
    let {
        className,
        disabled,
        children,
        value,
        key,
        index,
    } = props;
    const selectContext = useContext(SelectContext);

    let isSelected = selectContext.value === value;

    let handleClickLi = () => {

        if(disabled){
            //点击无效
        }else {
            if(selectContext.selectOnChange){
                selectContext.selectOnChange(value)
            }
        }
    };

    let boxClsName = Classnames({
        'select-filter-li': true,
        'disabled': disabled,
        'selected': isSelected,
        [`${className}`]: true,
    });

    return (
        <li
            className={boxClsName}
            key={key || index}
            onClick={handleClickLi}
        >
            <div>
                {children}
            </div>
        </li>
    );
};

Option.displayName = "selectOption";
Option.defaultProps = {
    className:""
};

export default Option;
