import React, {FC, InputHTMLAttributes, KeyboardEvent, useEffect, useState, useRef, ChangeEvent} from 'react';
import Classnames from 'classnames';
import {pick} from 'lodash';
import Input from '../input/Input';
import { useDebounceValue, useClickOutArea } from '../../hooks/combineHooks';
import DefineTransition from "../transition/Transition";


interface DataSourceMap {
    value: string;
    text: string;
}
type FormatDataSource = string | DataSourceMap;

interface BaseProps {
    value?: string | number;
    /** 输入框选择内容 */
    defaultValue?: string | number;
    /** 输入框默认选择内容 */
    dataSource?: FormatDataSource[];
    /** 数据来源 */
    className?: string;
    disabled?: boolean;
    /** 输入框失效状态 */
    onSearch?: (value) => void;
    /** 输入框输入内容的回调函数 */
    onSelect?: (value:object) => void;
    /** 选择搜索列表的回调函数 */
    filterOption?: (inputValue, options) => void;
    /** 是否根据输入项进行筛选 */
}


type CombineProps = BaseProps & Pick<InputHTMLAttributes<HTMLElement>, 'placeholder'>;
type FormatProps = Partial<CombineProps>

/**
 * Input组件
 * ### 引用方法
 *
 * ~~~js
 * import { Input } from 'sun-ui'
 * ~~~
 */
const AutoComplete: FC<FormatProps> = (props) => {
    let {
        className,
        disabled,
        onSearch,
        onSelect,
        dataSource,
        filterOption,
        ...resetProps
    } = props;
    let resultValue = 'value' in resetProps ? resetProps.value : resetProps.defaultValue;

    const [inputValue, setInputValue] = useState(resultValue);
    const [showDropDown, setDropDown] = useState(false);
    const componentRef = useRef<HTMLDivElement>(null);
    const triggerSearchRef = useRef(false);

    //0 点击组件的外部事件
    useClickOutArea(componentRef, () => {
        setDropDown(false);
    });

    //0-1 input的focus时间
    const handleFocus = () => {
        setDropDown(true);
    };

    //1 搜索关键词的debounceValue
    const [formatResult, setFormatResult] = useState<DataSourceMap[]>([]);
    const debounceValue = useDebounceValue(inputValue, 300);
    useEffect(() => {
        if (debounceValue && dataSource?.length && triggerSearchRef.current) {
            let formatDataSource = dataSource.map((elem) => {
                if (typeof elem === "object") {
                    return elem;
                }
                return {
                    text: elem,
                    value: elem
                }
            });
            if (props.filterOption) {
                const {filterOption} = props;
                formatDataSource = formatDataSource.filter((elem) => {
                    return filterOption(debounceValue, elem);
                });
            } else {
                let debounceArr = debounceValue.split('');
                formatDataSource = formatDataSource.filter((elem) => {
                    return debounceArr.some((smallElem)=>{
                        return elem.text.includes(smallElem);
                    });
                });
            }
            let tempHighLightIndex = formatDataSource.findIndex((elem)=>{
                return elem.text === debounceValue;
            })

            setHighLightIndex(tempHighLightIndex);
            setFormatResult(formatDataSource);
        }
    }, [debounceValue, dataSource, filterOption]);

    //2 激活选项的状态
    const [highLightIndex, setHighLightIndex] = useState(-1);

    const handleChangeInput = (e) => {
        let tempValue = e.target.value;
        setInputValue(tempValue);
        if(onSearch){
            onSearch(tempValue);
        }
        triggerSearchRef.current = true;
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch(e.keyCode) {
            case 13:    //enter
                if(formatResult[highLightIndex]){
                    let detailItem = formatResult[highLightIndex];
                    setInputValue(detailItem.text);
                    if(onSelect){
                        onSelect(detailItem);
                    }
                }
                setDropDown(false);
                triggerSearchRef.current = false;
                break
            case 38: {    //向上
                let tempVal = (highLightIndex - 1 < 0) ? formatResult.length - 1 : highLightIndex - 1;
                setHighLightIndex(tempVal);
                break;
            }
            case 40: {    //向下
                let tempVal = (highLightIndex + 1 >= formatResult.length) ? 0 : highLightIndex + 1;
                setHighLightIndex(tempVal);
                break;
            }
            case 27:  //esc
                setDropDown(false);
                break
            default:
                break
        }
    };

    const handleClickItem = (arr) => {
        let detailItem = arr[0];
        let index = arr[1];

        if(highLightIndex!==index){
            setHighLightIndex(index);
            setInputValue(detailItem.text);
            if(onSelect){
                onSelect(detailItem);
            }
        }
        setDropDown(false);
        triggerSearchRef.current = false;
    };

    const setSearchResult = () => {
        let isShowResult = !!formatResult.length && showDropDown;
        // console.log('isShowResult', formatResult, isShowResult, showDropDown);
        return (
            <DefineTransition
                in={isShowResult}
                animation="zoom-in-top"
            >
                <ul className="result-list">
                    {formatResult.map((elem, index) => {
                        return (
                            <li
                                key={elem.value}
                                className={highLightIndex === index ? "active" : ""}
                                onClick={handleClickItem.bind(null, [elem, index])}
                            >{elem.text}</li>
                        );
                    })}
                </ul>
            </DefineTransition>
        );
    };

    let boxClsName = Classnames({
        'auto-input-complete-wrapper': true,
        'disabled': disabled,
        [`${className}`]: true,
    });

    return (
        <div className={boxClsName} ref={componentRef}>
            <Input
                disabled={disabled}
                value={inputValue}
                onChange={handleChangeInput}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
                {...pick(resetProps, ['placeholder'])}
            />
            {setSearchResult()}
        </div>
    );
};

AutoComplete.defaultProps = {
    dataSource: [],
    className: '',
    disabled: false,
};

export default AutoComplete;
