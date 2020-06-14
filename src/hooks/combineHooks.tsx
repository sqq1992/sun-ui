import {useEffect, RefObject, useState} from 'react';

export const useDebounceValue = (value: any = "", delay = 300) => {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const handleTimer = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => {
            clearTimeout(handleTimer);
        }
    }, [value, delay]);

    return debounceValue;
};


export const useClickOutArea = (ref: RefObject<HTMLDivElement>, outCallBack: Function, inCallBack:Function=()=>{}) => {

    useEffect(() => {

        let clickEvents = (e) => {
            let target = e.target;
            if(!ref.current || ref.current.contains(target)){
                inCallBack();
            }else {     //点击组件外部事件
                outCallBack();
            }

        };

        // todo 原生事件机制和react事件机制不一样, react事件不会冒泡到这里的!
        document.addEventListener('click', clickEvents);
        return () => {
            document.removeEventListener('click', clickEvents);
        };

    }, [ref, outCallBack, inCallBack]);

};


export default useDebounceValue;
