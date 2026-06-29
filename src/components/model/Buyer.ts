import {IBuyer} from '../../types';
import {TBuyerValidationErrors} from '../../types';
import {IEvents} from '../base/Events.ts';

export class Buyer {
    data: IBuyer = {
        payment: '',
        email: '',
        phone:'',
        address: '',
    };

    constructor(protected events: IEvents) {};

    setData(data: Partial<IBuyer>): void {
        this.data = {
            ...this.data,
            ...data,
        };

        this.events.emit('buyer:change', this.data);
    };

    getData(): IBuyer {
        return this.data;
    };

    clear() {
        this.data = {
            payment: '',
            email: '',
            phone: '',
            address: '',
        };

        this.events.emit('buyer:change', this.data);
    }

    validation(): TBuyerValidationErrors {
        const errors: TBuyerValidationErrors = {};

        if (!this.data.payment) {
            errors.payment = 'Не выбран способ оплаты';
        }

        if (!this.data.address.trim()) {
            errors.address = 'Введите адрес доставки';
        }

        if (!this.data.phone.trim()) {
            errors.phone = 'Укажите телефон';
        }

        if (!this.data.email.trim()) {
            errors.email = 'Укажите емэйл';
        }

        return errors;
    }
}