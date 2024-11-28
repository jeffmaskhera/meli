import express from 'express';
import React from 'react';
import path from 'path';

import {RoutesAPIEnum, RoutesEnum} from "./interfaces/routes.enum";
import {getItemsApi} from "./apis/item-api";
import {getProductApi} from "./apis/product-api";
import {renderHomePage} from "./render-pages/home-page";
import {renderItemsPage} from "./render-pages/item-page";
import {renderDetailPage} from "./render-pages/detail-page";
import {searchItems, searchProduct} from "./actions/products/products";

const app = express();

app.use('/static', express.static(path.join(__dirname, '..', '..', 'dist', 'static')));


// Endpoints de la API
app.get(RoutesAPIEnum.APIItems, getItemsApi);
app.get(RoutesAPIEnum.APIProduct, getProductApi);


// Renderizar páginas
app.get(RoutesEnum.Home, (req, res) => {
    try {
        const html = renderHomePage();
        res.send(html);
    } catch (error) {
        console.error('Error handling ssr request:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get(RoutesEnum.Items, async (req, res) => {
    try {
        const query = req.query.search || '';
        const items = await searchItems(query);
        const html = renderItemsPage(items);
        res.send(html);
    } catch (error) {
        console.error('Error handling /items request:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get(RoutesEnum.DetailProduct, async (req, res) => {
    try {
        const { id } = req.params;
        const product = await searchProduct(id);
        const html = renderDetailPage(product);
        res.send(html);
    } catch (error) {
        console.error('Error handling /detail/:id request:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3000, () => console.log('server started http://localhost:3000'));
