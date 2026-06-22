import {TPayment} from '../../types';
import {IBuyer} from '../../types';

export class Buyer {
    private payment: TPayment = '';
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

    validatePaymentAndAddress(): { payment?: string; address?: string } {
        const errors: { payment?: string; address?: string } = {};

        if (!this.payment) errors.payment = 'Не выбран способ оплаты';
        if (!this.address.trim()) errors.address = 'Введите адрес доставки';
        return errors;
    }

    validateContactInfo(): { email?: string; phone?: string } {
        const error: { email?: string; phone?: string } = {};

        if (!this.email.trim()) {
            error.email = 'Укажите емэйл';
        }
        if (!this.phone.trim()) {
            error.phone = 'Укажите телефон';
        }
        return error;
    }

    validation(): { payment?: string; address?: string; email?: string; phone?: string } {
        const errors: { payment?: string; address?: string; email?: string; phone?: string } = {};

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