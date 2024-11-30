import React, {useEffect, useState} from 'react'
import Header from "../../component/header/header";
import SearchResult from "../../component/search-result/searchResult";
import Spinner from "../../component/spinner/spinner";
import NotFound from "../../component/not-found/not-found";
import Breadcrumb from "../../component/bread-crumb/bread-crumb";
import {CategoriesProductModel, ProductModel} from "../../modules/product/domain/product-model";
import {productUseCase} from "../../modules/product/infrastructure/provider";
import {setCache} from "../../cache/local-storage";
import {LocalStorageEnum} from "../../cache/local-storage.enum";


interface ItemsProps {
    params: any;
}
const Search: React.FC<ItemsProps> = ({ params }) => {
    const query = params
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [categories, setCategories] = useState<CategoriesProductModel[]>([]);
    const [loading, setLoading] = useState(false);

    const getProducts = async (value: string) => {
        setLoading(true)
        const { products, categories } = await productUseCase.searchPaginate(value)
        setProducts(products);
        setCategories(categories)
        setLoading(false)
    };

    const sendDetail =(value: string, seller: string)=> {
        setCache(LocalStorageEnum.SELLER, seller)
        window.location.href = (`/detail/${value}`)
    }

    useEffect(()=> {
        getProducts(query)
    }, [query])

    return (
        <div className="search">
            {loading && <Spinner />}
            <Header/>
            <Breadcrumb categories={categories} query={query} />
            <div>
                {products && products.length > 0 ?
                    <SearchResult products={products} selectorIdProduct={sendDetail}/>
                    :
                    <>
                        {
                            !loading &&
                            <div>
                                <NotFound/>
                            </div>
                        }
                    </>
                }
            </div>
        </div>
    );
};

export default Search;
