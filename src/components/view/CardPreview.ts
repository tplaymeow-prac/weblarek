import { Card } from './Card.ts';
import { ensureElement } from '../../utils/utils.ts';
import { IEvents } from '../base/Events.ts';
import { categoryMap, CDN_URL } from '../../utils/constants.ts';

type CategoryKey = keyof typeof categoryMap;

interface ICardPreview {
    image: string;
    category: string;
    description: string;
    buttonText: string;
    unavailable: boolean;
}

export class CardPreview extends Card<ICardPreview> {
    protected readonly imageElement: HTMLImageElement;
    protected readonly categoryElement: HTMLElement;
    protected readonly descriptionElement: HTMLElement;
    protected readonly buttonElement: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this.descriptionElement = ensureElement<HTMLElement>('.card__text', this.container);
        this.buttonElement = ensureElement<HTMLButtonElement>('.card__button', this.container);

        this.buttonElement.addEventListener('click', () => {
            this.events.emit('item:toggle');
        });
    }

    set image(src: string) {
        const format = src.replace(/\.svg$/, '.png');

        this.imageElement.src = `${CDN_URL}/${format}`;
        this.imageElement.alt = this.titleElement.textContent || 'Здесь должно быть изображение';
    }

    set category(value: string) {
        this.categoryElement.textContent = value;

        Object.keys(categoryMap).forEach((key) => {
            const categoryKey = key as CategoryKey;

            this.categoryElement.classList.toggle(
                categoryMap[categoryKey],
                categoryKey === value
            );
        });
    }

    set description(value: string) {
        this.descriptionElement.textContent = value;
    }

    set buttonText(value: string) {
        this.buttonElement.textContent = value;
    }

    set unavailable(value: boolean) {
        this.buttonElement.disabled = value;
    }
}