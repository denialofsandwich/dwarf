import React from 'react';
import { useRouter } from 'next/router'

var timerID = {}

export function useComplexState(data) {
    const router = useRouter();
    const initialMount = React.useRef(true);

    // actual onInit
    if(initialMount.current && data.mode === 'url') {
        var obj = router.query;

        if(data.name in obj) {
            data.default = JSON.parse(obj[data.name]);
        }
    }

    var [state, setState] = React.useState(data.default);

    // onChange
    React.useEffect(() => {
        if (!initialMount.current) {
            if(data.mode === 'url') {
                clearTimeout(timerID[data.name]);
                timerID[data.name] = setTimeout(() => {
                    var query = {...router.query};

                    if(state !== data.default) {
                        query[data.name] = JSON.stringify(state);
                    } else {
                        delete query[data.name];
                    }

                    router.replace({query: query});
                }, data.delay);
            } else if(data.mode === 'persist') {
                clearTimeout(timerID[data.name]);
                timerID[data.name] = setTimeout(() => {
                    localStorage.setItem(data.name, JSON.stringify(state));
                }, data.delay);
            }
        }
        // These Warnings are false positives
        // eslint-disable-next-line
    }, [state]);

    React.useEffect(() => {
        initialMount.current = false;
        
        if(data.mode === 'persist') {
            var pObj = localStorage.getItem(data.name);

            if(pObj !== null) {
                setState(JSON.parse(pObj));
            }
        }

        // onDestroy
        return () => {
            if(data.mode === 'url') {
                clearTimeout(timerID[data.name]);
                var query = {...router.query};
                delete query[data.name];
                router.replace({query: query});
            }
        }
        // These Warnings are false positives
        // eslint-disable-next-line
    }, []);

    return [state, setState];
}

export default useComplexState;
