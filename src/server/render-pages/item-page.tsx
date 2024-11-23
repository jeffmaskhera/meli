import React from 'react';
import ReactDOM from 'react-dom/server';
import Search from "../../client/pages/search/search";

export const renderItemsPage = (items: any[]) => {
    const title = `Mercado libre búsqueda de "${items[0]?.title || ''}"`;
    const titlesArray = items.map(obj => obj?.title);

    const root = (
        <html>
        <title>{title}</title>
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={title} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={titlesArray.join(', ')} />
        <body>
        <div id="root">
            <Search params={items}/>
        </div>
        <script
            dangerouslySetInnerHTML={{
                __html: `window.__data__ = ${JSON.stringify(items || null)};`,
            }}
        />
        <script src="/static/bundle.js"/>
        </body>
        </html>
    );

    return ReactDOM.renderToString(root);
};
