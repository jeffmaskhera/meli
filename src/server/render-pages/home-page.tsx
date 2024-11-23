import React from 'react';
import ReactDOM from 'react-dom/server';
import Home from "../../client/pages/home/home";

export const renderHomePage = () => {
    const title = `Mercado libre`;
    const description = "Encontrá lo que buscás en Mercado Libre. Todo lo que necesitas lo conseguís en un solo lugar, en Mercado Libre";

    const root = (
        <html>
        <head>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta property="og:description" content={description} />
        </head>
        <body>
        <div id="root">
            <Home />
        </div>
        <script src="/static/bundle.js"/>
        </body>
        </html>
    );

    return ReactDOM.renderToString(root);
};
