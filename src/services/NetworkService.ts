import {IApi, IProduct, IOrder, IOrderResponse, ICatalogueResponse} from '../types';

export class NetworkService {
    constructor(private api: IApi) {}

    async getCatalogue(): Promise<IProduct[]> {
        const response = await this.api.get<ICatalogueResponse>('/product/');
        return response.items;
    }

    async postOrder(order: IOrder): Promise<IOrderResponse> {
        return await this.api.post<IOrderResponse>('/order/', order);
    }
}