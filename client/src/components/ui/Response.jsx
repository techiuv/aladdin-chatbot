<<<<<<< HEAD
import React, { useEffect, useRef } from 'react';
import { typingEffect } from '../../utils/typingEffect';
const Response = ({ message }) => {

    useEffect(() => {
        const strings = [`${message}`];
        typingEffect('response', strings, 30, true);

        return () => {
            const element = document.querySelector('response');
            if (element) {
                element.innerHTML = '';
            }
        };
    }, []);
    return (
        <div

            className="response-message float-left clear-both m-2 px-4 text-slate-200 response font-normal text-lg"
        >
            <p>
                {/* {message} */}
            </p>
        </div>
    );
};

export default Response;
=======
import React, { useEffect, useRef } from 'react';
import { typingEffect } from '../../utils/typingEffect';
const Response = ({ message }) => {

    useEffect(() => {
        const strings = [`${message}`];
        typingEffect('response', strings, 30, true);

        return () => {
            const element = document.querySelector('response');
            if (element) {
                element.innerHTML = '';
            }
        };
    }, []);
    return (
        <div

            className="response-message float-left clear-both m-2 px-4 text-slate-200 response font-normal text-lg"
        >
            <p>
                {/* {message} */}
            </p>
        </div>
    );
};

export default Response;
>>>>>>> c9973c7f94f4d329365fbbb2db74be7bcabde679
