import { Component } from '../base/Component.ts';
import { ensureElement } from '../../utils/utils.ts';
import { IEvents } from '../base/Events.ts';

interface IModal {
    content: HTMLElement;
}

export class Modal extends Component<IModal> {
    protected readonly closeButton: HTMLButtonElement;
    protected readonly contentElement: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);
        this.contentElement = ensureElement<HTMLElement>('.modal__content', this.container);

        this.closeButton.addEventListener('click', () => {
            this.emitClose();
        });

        this.container.addEventListener('click', (event) => {
            if (event.target === event.currentTarget) {
                this.emitClose();
            }
        });
    }

    set content(value: HTMLElement) {
        this.contentElement.replaceChildren(value);
    }

    open(): void {
        this.container.classList.add('modal_active');
    }

    close(): void {
        this.container.classList.remove('modal_active');
    }

    private emitClose(): void {
        this.events.emit('modal:close');
    }
}