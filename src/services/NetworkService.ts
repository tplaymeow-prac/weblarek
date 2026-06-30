import {IApi, IOrder, IOrderResponse, ICatalogueResponse} from '../types';

export class NetworkService {
    constructor(private api: IApi) {}

    async getCatalogue(): Promise<ICatalogueResponse> {
        return await this.api.get<ICatalogueResponse>('/product/');
    }

    async postOrder(order: IOrder): Promise<IOrderResponse> {
        return await this.api.post<IOrderResponse>('/order/', order);
    }
}
