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


export const useClickOutArea = (ref: RefObject<HTMLDivElement>, outCallBack: Function) => {


    let clickEvents = (e) => {
        let target = e.target;
        if(!ref.current || ref.current.contains(target)){

        }else {     //点击组件外部事件
            outCallBack();
        }

    };

    useEffect(() => {

        document.addEventListener('click', clickEvents);
        return () => {
            document.removeEventListener('click', clickEvents);
        };

    }, [ref, outCallBack]);

};


export default useDebounceValue;
