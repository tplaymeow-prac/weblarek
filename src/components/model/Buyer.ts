import {TPayment} from '../../types';
import {IBuyer} from '../../types';
import {TBuyerValidationErrors} from '../../types';

export class Buyer {
    private payment: TPayment | '' = '';
    private email: string = '';
    private phone: string = '';
    private address: string = '';

    setPayment(payment: TPayment): void {
        this.payment = payment;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    setPhone(phone: string): void {
        this.phone = phone;
    }

    setAddress(address: string): void {
        this.address = address;
    }

    getData(): IBuyer {
        return {
            payment: this.payment,
            email: this.email,
            phone: this.phone,
            address: this.address
        };
    }

    clear() {
        this.payment = ''
        this.email = ''
        this.phone = ''
        this.address = ''
    }

    validation(): TBuyerValidationErrors {
        const errors: TBuyerValidationErrors = {};

        if (!this.payment) {
            errors.payment = 'Не выбран способ оплаты';
        }

        if (!this.address.trim()) {
            errors.address = 'Введите адрес доставки';
        }

        if (!this.phone.trim()) {
            errors.phone = 'Укажите телефон';
        }

        if (!this.email.trim()) {
            errors.email = 'Укажите емэйл';
        }

        return errors;
    }
}