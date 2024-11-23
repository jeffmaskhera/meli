import React from 'react';
import ReactDOM from 'react-dom/server';
import Detail from "../../client/pages/detail/detail";

export const renderDetailPage = (product: any) => {
    const title = product?.title
        ? `Mercado libre te muestra el producto: "${product.title}"`
        : 'No hay nada';
    const image = product?.thumbnail;

    const root = (
        <html>
        <head>
            <title>{title}</title>
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={title} />
            <meta name="twitter:image" content={image} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={title} />
            <meta property="og:image" content={image} />
        </head>
        <body>
        <div id="root">
            <Detail detailId={product.id} />
        </div>
        <script
            dangerouslySetInnerHTML={{
                __html: `window.__data__ = ${JSON.stringify(product || null)};`,
            }}
        />
        <script src="/static/bundle.js"></script>
        </body>
        </html>
    );

    return ReactDOM.renderToString(root);
};
