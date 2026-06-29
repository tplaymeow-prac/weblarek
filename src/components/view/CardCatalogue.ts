import { Card } from './Card.ts';
import { ensureElement } from '../../utils/utils.ts';
import { ICardActions } from '../../types/';
import { categoryMap, CDN_URL } from '../../utils/constants.ts';

type CategoryKey = keyof typeof categoryMap;

interface ICardCatalogue {
    image: string;
    category: string;
}

export class CardCatalogue extends Card<ICardCatalogue> {
    protected readonly imageElement: HTMLImageElement;
    protected readonly categoryElement: HTMLElement;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);

        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);

        if (actions?.onClick) {
            this.container.addEventListener('click', actions.onClick);
        }
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
}