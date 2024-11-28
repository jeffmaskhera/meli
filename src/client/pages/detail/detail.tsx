import React, {useEffect, useState} from 'react'
import Header from "../../component/header/header";
import {formatNumberPrice} from "../../../utils/helpers";
import Spinner from "../../component/spinner/spinner";
import {ProductModel} from "../../modules/product/domain/product-model";
import {productUseCase} from "../../modules/product/infrastructure/provider";
import StarsRating from "../../component/stars-rating/stars-rating";
import LabelButton from "../../component/label/label";
import {LabelColorEnum} from "../../component/label/label.enum";
import {UserModel} from "../../modules/user/domain/user-model";
import {userUseCase} from "../../modules/user/infrastructure/provider";
import {TypePurchaseEnum} from "../../modules/user/domain/user-enum";
import Breadcrumb from "../../component/bread-crumb/bread-crumb";
import NotFound from "../../component/not-found/not-found";


interface DetailProps {
    detailId: string;
}


const Detail: React.FC<DetailProps> = ({ detailId }) => {

    const [product, setProduct] = useState<ProductModel>();
    const [userInfo, setUserInfo] = useState<UserModel>();
    const [loading, setLoading] = useState(false);
    const [imageShow, setImageShow] = useState<string>('');

    const getProducts = async (id: string)=> {
        setLoading(true)
        try {
            const product = await productUseCase.get(id)
            setProduct(product)
            setImageShow(product.mainImage)
            setLoading(false)
        } catch (e) {
            console.log("Error", e)
            setLoading(false)
        }
    }

    const getUser = async ()=> {
        const user = await userUseCase.get()
        setUserInfo(user)
    }

    const actionBuild=()=> {
        if (userInfo?.typePurchase) {
            const builderPurchase = {
                productData: product,
                userData: userInfo,
            }
            console.log("se procede la compra con los siguientes datos", builderPurchase)
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue = event.target.value as TypePurchaseEnum;
        if (userInfo) {
            const updatedUserInfo: UserModel = {
                ...userInfo,
                typePurchase: selectedValue,
            };
            setUserInfo(updatedUserInfo)
        }
    };

    const captureNewImage =(e: any)=> {
        setImageShow(e)
    }

    useEffect(()=> {
        getProducts(detailId);
        getUser();
    }, [])

    console.log("detalle en producto", product)

    return (
        <div className="detail">
            <Header/>
            {product && <Breadcrumb products={[product]} isDetail/>}

            <div className="detail__main">
                <div className="detail__main__container">
                    {loading && <Spinner />}
                    {
                        product ?
                        <div className="detail__main__container__grid">
                            <div className="detail__main__container__grid__grid-product">
                                <div className="detail__main__container__grid__grid-product__thumbnails">
                                    {product?.thumbnailImages?.map((item, keyId) => {
                                        const totalThumbnails = product.thumbnailImages?.length || 0;

                                        if (keyId === 8 && totalThumbnails > 9) {
                                            return (
                                                <React.Fragment key={keyId}>
                                                    <div
                                                        className="detail__main__container__grid__grid-product__thumbnails__item-image"
                                                        onMouseEnter={() => captureNewImage(item)}
                                                    >
                                                        <img src={item} alt={product?.title} />
                                                        <div className="detail__main__container__grid__grid-product__thumbnails__item-image__more-items">
                                                            + {totalThumbnails - 9}
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            );
                                        }

                                        if (keyId < 9) {
                                            return (
                                                <div
                                                    className="detail__main__container__grid__grid-product__thumbnails__item-image"
                                                    key={keyId}
                                                    onMouseEnter={() => captureNewImage(item)}
                                                >
                                                    <img src={item} alt={product?.title} />
                                                </div>
                                            );
                                        }

                                        return null;
                                    })}
                                </div>
                                <div className="detail__main__container__grid__grid-product__image">
                                    <img src={imageShow} alt={product.title} />
                                </div>
                                <div className="detail__main__container__grid__grid-product__info-top">
                                    <div className="grid-gap20">
                                        <p>{product.condition} - {product.quantitySold} vendidos</p>
                                        <h2>{product.title}</h2>
                                        <StarsRating rating={product?.rating ?? 0} totalQualification={product?.totalQualification ?? 0} />
                                        {
                                            product?.positionInSales && product?.positionInSales <= 3 &&
                                            <div className="detail__main__container__grid__grid-product__info-top__flex-contain">
                                                <LabelButton color={LabelColorEnum.ORANGE} text={"MÁS VENDIDO"}/>
                                                <p className="detail__main__container__grid__grid-product__info-top__flex-contain__blue-info">{`${product?.positionInSales}° en ${product?.title}`}</p>
                                            </div>
                                        }
                                        {
                                            product?.oldPrice !== product?.price && <h4 className="detail__main__container__grid__grid-product__info-top__old-price">$ {formatNumberPrice(product.oldPrice)}</h4>
                                        }
                                        <h2 className="detail__main__container__grid__grid-product__info-top__price">$ {formatNumberPrice(product?.price)}</h2>
                                        <h3>Lo que tienes que saber de este producto</h3>
                                        {
                                            product?.attributes?.fullInfo.slice(0, 6).map((item, keyId)=> {
                                                return (
                                                    <li key={keyId}>
                                                        {item}
                                                    </li>
                                                )
                                            })
                                        }
                                    </div>
                                </div>

                                <div className="detail__main__container__grid__grid-product__third-column">
                                    <div className="detail__main__container__grid__grid-product__third-column__select1">
                                        <div className="radius-position">
                                            <input
                                                type="radio"
                                                id="1"
                                                name="type-buy"
                                                value={TypePurchaseEnum.CREDIT}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <h3>Cuotas sin interéses</h3>
                                        <h3>$ {formatNumberPrice(product.creditPrice)}</h3>
                                        <p>En <span className="color-green">12 x {formatNumberPrice(product.creditPrice ? product.creditPrice / 12 : 0)} sin interés</span></p>
                                        <p>Vendido por: {product.sellerName}</p>
                                    </div>

                                    <div className="detail__main__container__grid__grid-product__third-column__select2">
                                        <div className="radius-position">
                                            <input
                                                type="radio"
                                                id="2"
                                                name="type-buy"
                                                value={TypePurchaseEnum.CASH}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <h3 className="font15">Precio más conveniente</h3>
                                        <h3 className="detail__main__container__grid__grid-product__third-column__select2__price">$ {formatNumberPrice(product.price)}</h3>
                                        <div className="detail__main__container__grid__grid-product__third-column__select2__inter-grid">
                                            <i className="fas fa-credit-card"/>
                                            <div>
                                                <p>Hasta 36 cuotas con</p>
                                                <p className="font-w300">Con tu {userInfo?.typeBank} terminada en {userInfo?.numberCreditCard}</p>
                                            </div>

                                        </div>
                                        <button
                                            className="button w100"
                                            onClick={actionBuild}
                                            disabled={!userInfo?.typePurchase}
                                        >
                                            Comprar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <NotFound/>
                    }
                </div>
            </div>
        </div>
    );
};

export default Detail;