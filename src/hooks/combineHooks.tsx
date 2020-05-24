import {useEffect, useState} from 'react';

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


export default useDebounceValue;
