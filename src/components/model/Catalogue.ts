import {IProduct} from '../../types';
import {IEvents} from '../base/Events.ts';

export class Catalogue {
    items: IProduct[];
    selectedItem: IProduct | null;

    constructor(protected events: IEvents) {
        this.items = [];
        this.selectedItem = null;
    }

    save(items: IProduct[]) {
        this.items = items;
        this.events.emit('catalog:change', this.items);
    }

    getItems(): IProduct[] {
        return this.items
    }

    getItemById(id: string): IProduct | null {
        return this.items.find(item => item.id === id) || null;
    }

    saveSelectedItem(selectedItem: IProduct) {
        this.selectedItem = selectedItem;
        this.events.emit('item:select', selectedItem);
    }

    getSelectedItem() {
        return this.selectedItem;
    }
}