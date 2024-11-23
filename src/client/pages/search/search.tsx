import React, {useState, useEffect} from 'react'
import Finder from "../../component/finder/finder";
import SearchResult from "../../component/search-result/searchResult";
/*import BreadCrumb from "../../component/bread-crumb/breadCrumb";*/
import Spinner from "../../component/spinner/spinner";
import {ProductModel} from "../../modules/product/domain/product-model";
import {productUseCase} from "../../modules/product/infrastructure/provider";
import NotFound from "../../component/not-found/not-found";



// Interfaz para el parámetro 'params'
interface ItemsProps {
    params: any; // params es 'any' como mencionaste
}


const Search: React.FC<ItemsProps> = ({ params }) => {
    const [search, setSearch] = useState<string>(params);
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [breadCrumb, setBreadCrumb] =useState([])
    const [loading, setLoading] = useState(false);


    /*const loadBreadCrumb =(products)=> {
        const transformedArray = products.map(item => {
            return {
                query: item.query,
                attributes: item.attributes
            };
        });
        setBreadCrumb(transformedArray);
    }*/


    const searching =(info: string)=> {
        setSearch(info)
        const url = new URL(window.location.href);
        url.searchParams.set('search', info);
        window.history.pushState({}, '', url.toString());
    }

    const getProducts = async (value: string) => {
        setLoading(true)
        const products = await productUseCase.searchPaginate(value)
        setProducts(products);
        setLoading(false)
        /*loadBreadCrumb(items.map(formatProductData))*/
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
            <Finder/>

       {/*     {breadCrumb &&
            breadCrumb.length > 0 && <BreadCrumb product={breadCrumb}/>
            }*/}

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
