import React, {FC, useState, createContext} from 'react';
import Classnames from 'classnames';
import { tabsPaneProps } from './TabsPane';


export interface TabsProps {
    activeKey?: string;
    /** 输入框选择内容 */
    defaultActiveKey?: string;
    /** 输入框默认选择内容 */
    className?: string;
    /** 输入框默认选择内容 */
    disabled?: boolean;
    /** 输入框失效状态 */
    children: any[];
    /** 输入框失效状态 */
    onChange?: (value) => void;
    /** 输入框输入内容的回调函数 */
}


interface optionsContext {
    key?: string;
}

/**
 * Input组件
 * ### 引用方法
 *
 * ~~~js
 * import { Input } from 'sun-ui'
 * ~~~
 */
export const TabsContext = createContext<optionsContext>({});
const Tabs: FC<TabsProps> = (props) => {
    let {
        className,
        onChange,
        children,
    } = props;

    // 是否为受控组件
    let formatChildren = children.filter((elem) => {
        return !elem.props.disabled
    });
    let keys = formatChildren.map((elem) => {
        return elem.key
    });
    let isControlled = "activeKey" in props;
    let controlledVal;
    let notControlledVal;
    if(isControlled){
        controlledVal = keys.includes(props.activeKey) ? props.activeKey : keys[0];
    }else {
        notControlledVal = keys.includes(props.defaultActiveKey) ? props.defaultActiveKey : keys[0];
    }
    let [formatNotControlledVal, setFormatNotControlledVal] = useState(notControlledVal);
    let resultFormatValue = isControlled ? controlledVal : formatNotControlledVal;


    // 传递给options的值
    let optionsValue = {
        key: resultFormatValue,
    };
    let handleToggleNav = (props) => {
        if(!props.disabled){

            if(isControlled){
            }else {
                setFormatNotControlledVal(props.key);
            }

            if(onChange){
                onChange(props.key)
            }

        }
    };

    const setNavList = () => {

        return React.Children.map(children, (child, index) => {

            let key = child.key;

            return (
                <div
                    className={`tabs-nav ${key===resultFormatValue ? 'active' : ''}  ${child.props.disabled ? 'disabled' : ''}`}
                    onClick={handleToggleNav.bind(null, {
                        key,
                        ...child.props
                    })}
                >
                    {child.props.tab}
                </div>
            );
        });


    };

    const setTabContList = () => {

        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<tabsPaneProps>;
            const {displayName} = childElement.type;

            if(displayName==="tabsPane"){
                return React.cloneElement(childElement, {
                    showKey: child.key,
                });
            }else {
                console.error("这不是一个tabs的tabsPane组件");
            }
        });

    };



    // format value
    let boxClsName = Classnames({
        'tabs-wrapper': true,
        [`${className}`]: true,
    });

    return (
        <div className={boxClsName} >
           <div className="tabs-nav-wrap">
               <div className="tabs-nav-list">
                   {setNavList()}
               </div>
           </div>
            <div className="tabs-content-wrapper">
                <div className="tabs-cont">
                    <TabsContext.Provider value={optionsValue}>
                        {setTabContList()}
                    </TabsContext.Provider>
                </div>
            </div>
        </div>
    );
};

Tabs.defaultProps = {
    className:"",
    children: []
};

export default Tabs;
