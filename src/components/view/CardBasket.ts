import { Card } from './Card.ts';
import { ensureElement } from '../../utils/utils.ts';
import { ICardActions } from '../../types';

interface ICardBasket {
    index: number;
}

export class CardBasket extends Card<ICardBasket> {
    protected readonly indexElement: HTMLElement;
    protected readonly deleteButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);

        this.indexElement = ensureElement<HTMLElement>('.basket__item-index', this.container);
        this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);

        const onClick = actions?.onClick;

        if (onClick) {
            this.deleteButton.addEventListener('click', onClick);
        }
    }

    set index(value: number) {
        this.indexElement.textContent = String(value);
    }
}