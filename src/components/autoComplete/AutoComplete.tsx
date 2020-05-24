import React, {FC, InputHTMLAttributes, useEffect, useState} from 'react';
import Classnames from 'classnames';
import {pick} from 'lodash';
import Input from '../input/Input';
import { useDebounceValue } from '../../hooks/combineHooks';
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
        dataSource,
        filterOption,
        ...resetProps
    } = props;
    let resultValue = 'value' in resetProps ? resetProps.value : resetProps.defaultValue;

    const [inputValue, setInputValue] = useState(resultValue);

    //1 搜索关键词的debounceValue
    const [formatResult, setFormatResult] = useState<DataSourceMap[]>([]);
    const debounceValue = useDebounceValue(inputValue, 300);
    useEffect(() => {
        if (debounceValue && dataSource?.length) {
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
                formatDataSource = formatDataSource.filter((elem) => {
                    return elem.text.includes(debounceValue);
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
    };

    let boxClsName = Classnames({
        'auto-input-complete-wrapper': true,
        'disabled': disabled,
        [`${className}`]: true,
    });


    const setSearchResult = () => {
        let isShowResult = !!formatResult.length;

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
                            >{elem.text}</li>
                        );
                    })}
                </ul>
            </DefineTransition>
        );
    };

    return (
        <div className={boxClsName}>
            <Input
                disabled={disabled}
                value={inputValue}
                onChange={handleChangeInput}
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
