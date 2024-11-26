import React from 'react';
import ReactDom from 'react-dom/client'; // Asegúrate de usar react-dom/client
import './assets/styles/global.scss';
import Home from './pages/home/home';
import Search from "./pages/search/search";
import Detail from "./pages/detail/detail";
import { switchCases } from "../utils/helpers";
import { RoutesClient } from "./types/types";

/* import { defineCustomElements } from 'ui-meli-components/loader'; */
/*
defineCustomElements(window);
*/

const linkElement = document.createElement('link');
linkElement.rel = 'preconnect';
linkElement.href = 'https://fonts.googleapis.com';
document.head.appendChild(linkElement);

const linkGFontElement = document.createElement('link');
linkGFontElement.rel = 'preconnect';
linkGFontElement.href = 'https://fonts.gstatic.com';
linkGFontElement.crossOrigin = 'anonymous'; // Cambiado de true a 'anonymous'
document.head.appendChild(linkGFontElement);

const fontLinkElement = document.createElement('link');
fontLinkElement.href = 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,500;0,700&display=swap';
fontLinkElement.rel = 'stylesheet';
document.head.appendChild(fontLinkElement);

const fontAwesomeLink = document.createElement('link');
fontAwesomeLink.rel = 'stylesheet';
fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css';
document.head.appendChild(fontAwesomeLink);

const currentRoute = window.location.pathname;
const searchParam: string | null = new URLSearchParams(window.location.search).get('search');
let detailId = null;

if (currentRoute.startsWith(RoutesClient.DETAIL)) {
    detailId = currentRoute.split('/').pop();
}

const componentToRender = switchCases(currentRoute, {
    [RoutesClient.HOME]: <Home items={window.__data__} />,
    [RoutesClient.ITEMS]: <Search params={searchParam} />,
    [RoutesClient.DETAIL + detailId]: <Detail detailId={detailId} />,
    // 'default': <div>no encontrado</div>, // Página no encontrada
});

// Verifica si el contenedor con id 'root' existe
const rootElement = document.getElementById('root');
if (rootElement) {
    // Si el contenedor existe, usa hydrateRoot para renderizar el componente
    ReactDom.hydrateRoot(rootElement, componentToRender);
} else {
    // Si no se encuentra el contenedor, muestra un mensaje de error
    console.error('Contenedor "root" no encontrado en el DOM.');
}

