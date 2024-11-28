import React, {useEffect, useState} from 'react'
import Header from "../../component/header/header";
import SearchResult from "../../component/search-result/searchResult";
import Spinner from "../../component/spinner/spinner";
import NotFound from "../../component/not-found/not-found";
import Breadcrumb from "../../component/bread-crumb/bread-crumb";
import {ProductModel} from "../../modules/product/domain/product-model";
import {productUseCase} from "../../modules/product/infrastructure/provider";


interface ItemsProps {
    params: any;
}
const Search: React.FC<ItemsProps> = ({ params }) => {
    const [search, setSearch] = useState<string>(params);
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [loading, setLoading] = useState(false);

    const getProducts = async (value: string) => {
        setLoading(true)
        const products = await productUseCase.searchPaginate(value)
        setProducts(products);
        setLoading(false)
    };

    const sendDetail =(value: string)=> {
        window.location.href = (`/detail/${value}`)
    }

    useEffect(()=> {
        getProducts(search)
    }, [search])

    return (
        <div className="search">
            {loading && <Spinner />}
            <Header/>
            <Breadcrumb products={products}/>
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
