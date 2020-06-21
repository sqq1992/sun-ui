import React, {FC, useContext, useRef} from 'react';
import Classnames from 'classnames';
import { TabsContext } from './Tabs';


export interface tabsPaneProps {
    /** 输入框选择内容 */
    key: string;
    showKey?: string;
    /** 数据来源 */
    tab: React.ReactNode,
    disabled?: boolean;
    className?: string;
}

/**
 * Input组件
 * ### 引用方法
 *
 * ~~~js
 * import { Input } from 'sun-ui'
 * ~~~
 */
const TabsPane: FC<tabsPaneProps> = (props) => {
    let {
        className,
        children,
        key,
        showKey,
    } = props;

    const tabsContext = useContext(TabsContext);
    const triggerRender = useRef(false);

    let isActive = showKey === tabsContext.key;
    if(isActive){
        triggerRender.current = true;
    }

    let boxClsName = Classnames({
        'tabs-cont-li': true,
        [`${className}`]: true,
    });

    return (
        <div
            className={boxClsName}
            style={{
                display: isActive ? "block" : "none"
            }}
            key={key}
        >
            {triggerRender.current ? children : null}
        </div>
    );
};

TabsPane.displayName = "tabsPane";
TabsPane.defaultProps = {
    className:""
};

export default TabsPane;
