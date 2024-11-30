import {Request, Response} from 'express';
import {searchItems} from "../actions/products/products";
import {formatNumberPrice} from "../../utils/helpers";
import {ApiResponseItemsInterface, QueryParamsInterface} from "../interfaces/interfaces";

export const getItemsApi = async (req: Request<{}, {}, {}, QueryParamsInterface>, res: Response) => {
    try {
        const { query } = req.query;
        const searchResults = await searchItems(query);
        const formattedResponse: ApiResponseItemsInterface = {
            author: {
                name: 'Jefrey',
                lastname: 'Sánchez'
            },
            items: searchResults.map(item => ({
                id: item?.id,
                query: query,
                title: item?.title,
                picture: item?.thumbnail,
                price: {
                    currency: item?.currency_id,
                    amount: item?.price,
                    price: item?.price,
                    priceFormat: formatNumberPrice(item?.price),
                },
                condition: item?.condition,
                free_shipping: item?.shipping?.free_shipping || false,
                sellerName: item?.seller?.nickname || '',
                attributes: item?.attributes || [],
            }))
        };
        res.json(formattedResponse);
    } catch (error: unknown) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
