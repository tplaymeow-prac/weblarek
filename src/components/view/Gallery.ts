import { Component } from '../base/Component.ts';

interface IGallery {
    gallery: HTMLElement[];
}

export class Gallery extends Component<IGallery> {

    constructor(container: HTMLElement) {
        super(container);
    };

    set gallery(items: HTMLElement[]) {
        this.container.replaceChildren(...items);
    }
}