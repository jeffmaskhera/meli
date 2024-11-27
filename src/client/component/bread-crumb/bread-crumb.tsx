import React, {useEffect, useState} from 'react';
import {getCache, setCache} from "../../cache/local-storage";
import {LocalStorageEnum} from "../../cache/local-storage.enum";

// Definiendo la interfaz
interface Product {
    query?: string;  // Categoría del producto (opcional, ya que en detalle no siempre existe)
    title: string;   // Título del producto
}

interface BreadcrumbProps {
    products: Product[];  // Lista de productos
    isDetail?: boolean;   // Si es una vista de detalle
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ products, isDetail = false }) => {
    const [category, setCategory] = useState<string>("");
    const [title, setTitle] = useState<string>("");

    // Función para obtener la categoría más frecuente
    const getMostFrequentCategory = (products: Product[]): string => {
        const categoryCount: { [key: string]: number } = {};

        products.forEach(product => {
            const category = product.query;
            if (category) {
                categoryCount[category] = (categoryCount[category] || 0) + 1;
            }
        });

        const mostFrequentCategory = Object.entries(categoryCount).reduce((max, current) =>
            current[1] > max[1] ? current : max
        );

        return mostFrequentCategory ? mostFrequentCategory[0] : "Sin categoría";
    };

    useEffect(() => {
        if (isDetail && products.length > 0) {
            // Si estamos en el detalle de un producto
            const storedCategory = getCache(LocalStorageEnum.BREADCRUMB)
            if (storedCategory && products[0] && products[0].title) {
                // Si hay una categoría almacenada en el localStorage y el producto tiene un título
                setCategory(storedCategory);
                setTitle(products[0].title);
            } else {
                // Si no hay categoría almacenada o no hay un producto con título, no mostramos nada
                setCategory("");
                setTitle("");
            }
        } else if (products.length > 0) {
            // Si estamos en la página de búsqueda
            const mostFrequentCategory = getMostFrequentCategory(products);
            setCategory(mostFrequentCategory);
            setCache(LocalStorageEnum.BREADCRUMB, mostFrequentCategory)// Guarda la categoría más frecuente en localStorage
            setTitle("");  // No mostramos título en la página de búsqueda
        }
    }, [products, isDetail]);

    // Si la categoría está vacía (en caso de que no haya información), no renderizamos nada
    if (!category && !title) return null;

    // Función de búsqueda (navegar a la página de búsqueda con el query)
    const searching = () => {
        window.location.href = `/items?search=${category}`;
    };

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb__item">
                    <a href="/" className="breadcrumb__link">Volver al listado</a>
                </li>

                {category && !title && (
                    <li className="breadcrumb__item breadcrumb__item--active" aria-current="page">
                        {category}
                    </li>
                )}

                {category && title && (
                    <>
                        <li
                            className="breadcrumb__item breadcrumb__item--active pointer"
                            aria-current="page"
                            onClick={searching}
                        >
                            {category}
                        </li>
                        <li
                            className="breadcrumb__item breadcrumb__item--active"
                            aria-current="page"
                        >
                            {title}
                        </li>
                    </>
                )}

                {title && !category && (
                    <li className="breadcrumb__item breadcrumb__item--active" aria-current="page">
                        {title}
                    </li>
                )}
            </ol>
        </nav>
    );
};

export default Breadcrumb;



