import {Component} from '../base/Component.ts';
import {ensureElement} from '../../utils/utils.ts';
import {IEvents} from '../base/Events.ts';

interface IForm {
    errors?: string;
    valid?: boolean;
};

export abstract class Form<T extends object = object> extends Component<IForm & T> {
    protected readonly formButton: HTMLButtonElement;
    protected readonly errorsElement: HTMLElement;

    protected constructor(container: HTMLFormElement, protected events: IEvents) {
        super(container);

        this.formButton = ensureElement<HTMLButtonElement>('button[type="submit"]', this.container);
        this.errorsElement = ensureElement<HTMLElement>('.form__errors', this.container);

        this.container.addEventListener('submit', (event) => {
            event.preventDefault();
        });
    }

    set errors(value: string) {
        this.errorsElement.textContent = value;
    }

    set valid(value: boolean) {
        this.formButton.disabled = !value;
    }
}