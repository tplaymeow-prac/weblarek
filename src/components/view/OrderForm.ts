import { Form } from './Form.ts';
import { TPayment } from '../../types/';
import { ensureElement, ensureAllElements } from '../../utils/utils.ts';
import { IEvents } from '../base/Events.ts';

interface IOrderForm {
    payment?: TPayment;
    address?: string;
}

export class OrderForm extends Form<IOrderForm> {
    protected readonly paymentButton: HTMLButtonElement[];
    protected readonly addressInput: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this.paymentButton = ensureAllElements<HTMLButtonElement>('.button_alt', this.container);
        this.addressInput = ensureElement<HTMLInputElement>('input[name=address]', this.container);

        this.paymentButton.forEach((button) => {
            button.addEventListener('click', () => {
                if (button.name) {
                    this.emitChange('payment', button.name as TPayment);
                }
            });
        });

        this.addressInput.addEventListener('input', () => {
            this.emitChange('address', this.addressInput.value);
        });

        this.container.addEventListener('submit', () => {
            this.events.emit('order:submit');
        });
    }

    set payment(value: TPayment) {
        this.paymentButton.forEach((button) => {
            const buttonName = button.name as TPayment;
            button.classList.toggle('button_alt-active', buttonName === value);
        });
    }

    set address(value: string) {
        this.addressInput.value = value;
    }

    private emitChange(key: keyof IOrderForm, value: IOrderForm[keyof IOrderForm]): void {
        this.events.emit('form:change', {
            key,
            value,
        });
    }
}