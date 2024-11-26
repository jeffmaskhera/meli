import {TypePurchaseEnum} from "./user-enum";

export interface UserModel {
    id: string;
    numberCreditCard: number;
    typeBank: string;
    typePurchase?: TypePurchaseEnum
}