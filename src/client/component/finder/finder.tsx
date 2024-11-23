import React, {KeyboardEvent, useState} from 'react';

const Finder=()=> {

    const [input, setInput] = useState<string>('');

    const handleChange =(e: any)=> {
        const info = e?.target?.value
        setInput(info)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            searching();
        }
    };

    const searching =()=> {
        console.log()
        window.location.href = (`/items?search=${input}`)
    }

    return (
        <div className="hero-finder">
            <div className="finder">
                <div className="finder__box-img">
                    <a href="/">
                        <img src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/6.6.15/mercadolibre/logo_large_plus@2x.webp" alt="mercado libre" />
                    </a>

                </div>
                <input
                    placeholder="Buscar productos, marcas y más..."
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                <button
                    className="finder__send-button"
                    onClick={searching}
                >
                    <i className="fas fa-search"/>
                </button>
            </div>
        </div>
    );
};


export default Finder;



