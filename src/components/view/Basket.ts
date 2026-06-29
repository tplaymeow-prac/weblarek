import {Component} from '../base/Component.ts';
import {ensureElement} from '../../utils/utils.ts';
import {IEvents} from '../base/Events.ts';

interface IBasket {
    items: HTMLElement[];
    total: number;
    submitDisabled: boolean;
}

export class Basket extends Component<IBasket> {
    protected listElement: HTMLElement;
    protected submitButton: HTMLButtonElement;
    protected totalElement: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.listElement = ensureElement<HTMLElement>('.basket__list', this.container);
        this.submitButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);
        this.totalElement = ensureElement<HTMLElement>('.basket__price', this.container);

        this.submitButton.addEventListener('click', () => this.events.emit('basket:submit'));
    }

    set items(value: HTMLElement[]) {
        this.listElement.replaceChildren(...value);
    }

    set total(value: number) {
        this.totalElement.textContent = `${value} синапсов`;
    }

    set submitDisabled(value: boolean) {
        this.submitButton.disabled = value;
    }
}