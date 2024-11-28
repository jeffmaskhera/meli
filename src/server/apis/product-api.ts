import {Request, Response} from 'express';
import {ApiResponseProductInterface, QueryParamsInterface} from "../interfaces/interfaces";
import {searchProduct} from "../actions/products/products";
import {getDecimalCount} from "../../utils/helpers";

export const getProductApi = async (req: Request<{}, {}, {}, QueryParamsInterface>, res: Response) => {
    try {
        const { id } = req.query;
        if (!id) {
            return;
        }
        const productResults = await searchProduct(id);

        const formattedResponse: ApiResponseProductInterface = {
            author: {
                name: 'Jefrey',
                lastname: 'Sánchez'
            },
            items: [{
                id: productResults?.id || '',
                query: req.query.query || '',
                title: productResults?.title || '',
                picture: productResults?.pictures[0].url || '',
                pictures: productResults?.pictures,
                price: {
                    currency: productResults?.currency_id || '',
                    amount: productResults?.price || 0,
                    decimals: getDecimalCount(productResults?.price)
                },
                condition: productResults?.condition || '',
                free_shipping: productResults?.shipping?.free_shipping || false,
                sellerName: productResults?.seller?.nickname || '',
                attributes: productResults?.attributes || [],
                soldQuantity: productResults?.initial_quantity || 0,
                status: productResults?.status
            }]
        };
        res.json(formattedResponse);
    } catch (error: unknown) {
        console.error('Error searching product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
