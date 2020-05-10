import { useState, useEffect, useRef } from 'react';

export default function useIntersection({ distance = '0px', once = true} = {}) {
    const [ show, setShow ] = useState(false);
    const ref = useRef();
    useEffect(() => {
        const onIntersect = (entries,observer) => {
            const entry = entries[0]
            if(entry.isIntersecting) {
                setShow(true)
                if(once) observer.disconnect()
            } else {
                if(!once) setShow(false)
            }
        };

        const observer = new IntersectionObserver(onIntersect,{rootMargin: distance});
        observer.observe(ref.current);

    }, [distance,once])

    return { isIntersecting: show, ref }
}