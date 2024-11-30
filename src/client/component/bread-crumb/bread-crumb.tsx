import React, {useEffect, useState} from 'react';
import {getCache, setCache} from "../../cache/local-storage";
import {LocalStorageEnum} from "../../cache/local-storage.enum";
import {CategoriesProductModel} from "../../modules/product/domain/product-model";

interface BreadcrumbProps {
    categories?: CategoriesProductModel[];
    query?: string;
    titleProduct?: string;
}

// BreadCrumb Strategies
const strategyMap = {
    titleProduct: (titleProduct: string) => {
        const storedCategory = getCache(LocalStorageEnum.BREADCRUMB);
        if (storedCategory) {
            return [storedCategory, titleProduct];
        }
        return [titleProduct];
    },
    categories: (categories: CategoriesProductModel[]) => {
        const countMap: { [key: string]: number } = {};

        categories.forEach((category) => {
            const { valueName } = category;
            countMap[valueName] = (countMap[valueName] || 0) + 1;
        });

        return Object.entries(countMap)
            .filter(([key, count]) => count > 1)
            .sort((a, b) => b[1] - a[1])
            .map((entry) => entry[0]);
    },
    query: (query: string) => {
        return [query];
    },
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ categories = [], query, titleProduct }) => {
    const [breadcrumbItems, setBreadcrumbItems] = useState<string[]>([]);

    // Determine strategies
    const getBreadcrumbItems = () => {
        if (titleProduct) {
            return strategyMap.titleProduct(titleProduct);
        }
        if (categories?.length) {
            setCache(LocalStorageEnum.BREADCRUMB, query);
            return strategyMap.categories(categories);
        }
        if (query) {
            return strategyMap.query(query);
        }
        return [];
    };

    useEffect(() => {
        setBreadcrumbItems(getBreadcrumbItems());
    }, [categories, titleProduct, query]);

    const handleSearch = (category: string) => {
        window.location.href = `/items?search=${category}`;
    };

    if (breadcrumbItems.length === 0) return null;

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb__item">
                    <a href="/" className="breadcrumb__link">Volver al listado</a>
                </li>

                {breadcrumbItems.map((item, index) => (
                    <li
                        key={index}
                        className={`breadcrumb__item ${titleProduct && index === breadcrumbItems.length - 1 ? 'breadcrumb__item--active' : ''}`}
                        aria-current={index === breadcrumbItems.length - 1 ? 'page' : undefined}
                    >
                        {index === breadcrumbItems.length - 1 ? (
                            item
                        ) : (
                            <span className="breadcrumb__link" onClick={() => handleSearch(item)}>{item}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
