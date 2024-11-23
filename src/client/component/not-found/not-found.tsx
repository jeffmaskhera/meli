import React, { useEffect, useState } from 'react';

const NotFound = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={show ? 'not-found fadeIn' : 'not-found'}>
            <h2>No se encontraron productos, por favor intenta de nuevo</h2>
        </div>
    );
};

export default NotFound;
