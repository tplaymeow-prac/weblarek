import { Component } from '../base/Component.ts';
import { ensureElement } from '../../utils/utils.ts';
import { IEvents } from '../base/Events.ts';

interface IOrderSuccess {
    sum: number;
}

export class OrderSuccess extends Component<IOrderSuccess> {
    protected readonly description: HTMLElement;
    protected readonly successButton: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.description = ensureElement<HTMLElement>('.order-success__description', this.container);
        this.successButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

        this.successButton.addEventListener('click', () => {
            this.events.emit('modal:close');
        });
    }

    set sum(value: number) {
        this.description.textContent = `Списано ${value} синапсов.`;
    }
}