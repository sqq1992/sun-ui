import React, {FC, useState, useRef, createContext} from 'react';
import Classnames from 'classnames';
import DefineTransition from "../transition/Transition";
import Icon from "../icon/Icon";
import { selectOptionProps } from './Option';
import {useClickOutArea} from "../../hooks/combineHooks";




export interface SelectProps {
    value?: string | number;
    /** 输入框选择内容 */
    defaultValue?: string | number;
    /** 输入框默认选择内容 */
    className?: string;
    placeholder?: string;
    /** 输入框默认选择内容 */
    disabled?: boolean;
    /** 输入框失效状态 */
    children: any[];
    /** 输入框失效状态 */
    onChange?: (value) => void;
    /** 输入框输入内容的回调函数 */
}


interface optionsContext {
    index?: string,
    value?: string | number,
    selectOnChange?: (value) => void;
}

/**
 * Input组件
 * ### 引用方法
 *
 * ~~~js
 * import { Input } from 'sun-ui'
 * ~~~
 */
export const SelectContext = createContext<optionsContext>({});
const Select: FC<SelectProps> = (props) => {
    let {
        className,
        disabled,
        onChange,
        placeholder,
        children,
    } = props;

    // 是否为受控组件
    let isControlled = "value" in props;

    let controlledVal;
    let notControlledVal;
    if(isControlled){
        controlledVal = props.value;
    }else {
        notControlledVal = props.defaultValue;
    }
    let [formatNotControlledVal, setFormatNotControlledVal] = useState(notControlledVal);
    let resultFormatValue = isControlled ? controlledVal : formatNotControlledVal;
    const [showDropDown, setDropDown] = useState(false);
    const componentRef = useRef<HTMLDivElement>(null);

    let resultObj = children.find((elem) => {
        return elem.props.value === resultFormatValue;
    });
    let resultText = resultObj ? resultObj.props.children : '';

    let handleClickInput = () => {
        setDropDown(!showDropDown);
    };

    //点击外部事件
    useClickOutArea(componentRef, () => {
        setDropDown(false);
    },()=>{
        setDropDown(true);
    });

    let selectOnChange = (value) => {
        if(!isControlled){
            setFormatNotControlledVal(value);
        }
        setDropDown(false);
        if (onChange && value !== resultFormatValue) {
            onChange(value);
        }
    };

    // 传递给options的值
    let optionsValue = {
        value: resultFormatValue,
        selectOnChange
    };

    const setDataList = () => {

        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<selectOptionProps>;
            const {displayName} = childElement.type;

            if(displayName==="selectOption"){
                return React.cloneElement(childElement,{
                    index: index.toString()
                })
            }else {
                console.error("这不是一个select的option组件");
            }
        });

    };

    // format value
    let isShowResult = showDropDown && !!(Array.isArray(children) && children.length);

    let boxClsName = Classnames({
        'select-wrapper': true,
        'disabled': disabled,
        'isShowResult': isShowResult,
        [`${className}`]: true,
    });

    return (
        <div className={boxClsName} ref={componentRef}>
            <div className="select-wrapper-box" onClick={handleClickInput}>
                <div className="select-input-box">
                    <input
                        className="select-input"
                        type="text"
                        readOnly={true}
                        value={resultText}
                        placeholder={placeholder}
                    />
                </div>
                <div className="select-icon-box">
                    <Icon type="iconxiangxia" className="select-icon"/>
                </div>
            </div>
            <DefineTransition
                in={isShowResult}
            >
                <ul className="select-filter-ul">
                    <SelectContext.Provider value={optionsValue}>
                        {setDataList()}
                    </SelectContext.Provider>
                </ul>
            </DefineTransition>
        </div>
    );
};

Select.defaultProps = {
    className:"",
    children: []
};

export default Select;
