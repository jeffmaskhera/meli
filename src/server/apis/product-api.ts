import { Request, Response } from 'express';
import {ApiResponseInterface, QueryParamsInterface} from "../interfaces/interfaces";
import {searchProduct} from "../actions/products/products";
import {getDecimalCount} from "../../utils/helpers";

export const getProductApi = async (req: Request<{}, {}, {}, QueryParamsInterface>, res: Response) => {
    try {
        const { id } = req.query;
        if (!id) {
            return;
        }
        const productResults = await searchProduct(id);

        const formattedResponse: ApiResponseInterface = {
            author: {
                name: 'Jefrey',
                lastname: 'Sánchez'
            },
            items: [{
                id: productResults?.id || '',
                query: req.query.query || '',
                title: productResults?.title || '',
                picture: productResults?.thumbnail || '',
                price: {
                    currency: productResults?.currency_id || '',
                    amount: productResults?.price || 0,
                    decimals: getDecimalCount(productResults?.price)
                },
                condition: productResults?.condition || '',
                free_shipping: productResults?.shipping?.free_shipping || false,
                sellerName: productResults?.seller?.nickname || '',
                attributes: productResults?.attributes || [],
            }]
        };
        res.json(formattedResponse);
    } catch (error: unknown) {
        console.error('Error searching product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
