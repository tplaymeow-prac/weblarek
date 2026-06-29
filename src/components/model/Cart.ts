import {IProduct} from '../../types';
import {IEvents} from '../base/Events.ts';

export class Cart {
    private selectedItems: IProduct[];

    constructor(protected events: IEvents) {
        this.selectedItems = [];
    }

    getSelectedItems(): IProduct[] {
        return this.selectedItems
    }

    addItem(item: IProduct) {
        this.selectedItems.push(item);
        this.events.emit('basket:change', this.selectedItems);
    }

    deleteItem(id: string): void {
        this.selectedItems = this.selectedItems.filter(item => item.id !== id);
        this.events.emit('basket:change', this.selectedItems);
    }

    clear() {
        this.selectedItems = [];
        this.events.emit('basket:change', this.selectedItems);
    }

    getTotalPrice(): number {
        return this.selectedItems
            .map((item) => item.price ?? 0)
            .reduce((total, current)=>(total + current), 0);
    }

    getNumberOfItems(): number {
        return this.selectedItems.length;
    }

    itemExist(id: string): boolean {
        return this.selectedItems.some(item => item.id === id);
    }
}