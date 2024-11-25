import React, {useState, useEffect} from 'react'
import Header from "../../component/header/header";
import {formatNumberPrice} from "../../../utils/helpers";
/*import BreadCrumb from "../../component/bread-crumb/breadCrumb";*/
import Spinner from "../../component/spinner/spinner";
import {ProductModel} from "../../modules/product/domain/product-model";
import {productUseCase} from "../../modules/product/infrastructure/provider";


interface DetailProps {
    detailId: string; // params es 'any' como mencionaste
}


const Detail: React.FC<DetailProps> = ({ detailId }) => {

    const [product, setProduct] = useState<ProductModel>();
/*    const [breadCrumb, setBreadCrumb] =useState([])*/
    const [loading, setLoading] = useState(false);


   /* const loadBreadCrumb =(products)=> {
        const newBreadCrumb = [
            {
                query: products.query,
                attributes: products.attributes
            }
        ];

        setBreadCrumb(newBreadCrumb);
    }*/



    const getProducts = async (id: string)=> {
        setLoading(true)
        const product = await productUseCase.get(id)
        setProduct(product)
      /*  loadBreadCrumb(items)*/
        setLoading(false)
    }

    const actionBuild=()=> {
        console.log("comprar")
    }

    useEffect(()=> {
        getProducts(detailId)
    }, [])

    return (
        <div className="detail">
            <Header/>
      {/*      {breadCrumb &&
            breadCrumb.length > 0 && <BreadCrumb product={breadCrumb}/>
            }*/}
            <div className="detail__main">
                <div className="detail__main__container">
                    {
                        loading && <Spinner />
                    }
                    {
                        product &&
                        <div className="detail__main__container__grid">
                            <div className="detail__main__container__grid__grid-product">
                                <div className="detail__main__container__grid__grid-product__image">
                                    <img src={product.image} alt={product.title} />
                                </div>

                                <div className="detail__main__container__grid__grid-product__info-top">
                                    <p>{product.condition} - {product.quantitySold} vendidos</p>
                                    <h2>{product.title}</h2>
                                    <h2>$ {formatNumberPrice(product?.price)}</h2>
                                    <button className="button" onClick={actionBuild}>
                                        Comprar
                                    </button>
                                </div>

                                <div className="detail__main__container__grid__grid-product__info-down">
                                    <h2>Descripción del producto</h2>
                                    <p>{product.title}</p>
                                </div>
                            </div>

                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Detail;