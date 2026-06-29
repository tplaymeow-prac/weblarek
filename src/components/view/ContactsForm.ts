import { Form } from './Form.ts';
import { ensureElement } from '../../utils/utils.ts';
import { IEvents } from '../base/Events.ts';

interface IContactsForm {
    email?: string;
    phone?: string;
}

export class ContactsForm extends Form<IContactsForm> {
    protected readonly emailInput: HTMLInputElement;
    protected readonly phoneInput: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this.emailInput = ensureElement<HTMLInputElement>('input[name=email]', this.container);
        this.phoneInput = ensureElement<HTMLInputElement>('input[name=phone]', this.container);

        this.emailInput.addEventListener('input', () => {
            this.emitChange('email', this.emailInput.value);
        });

        this.phoneInput.addEventListener('input', () => {
            this.emitChange('phone', this.phoneInput.value);
        });

        this.container.addEventListener('submit', () => {
            this.events.emit('contacts:submit');
        });
    }

    set email(value: string) {
        this.emailInput.value = value;
    }

    set phone(value: string) {
        this.phoneInput.value = value;
    }

    private emitChange(key: keyof IContactsForm, value: string): void {
        this.events.emit('form:change', {
            key,
            value,
        });
    }
}