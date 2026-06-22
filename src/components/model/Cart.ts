import {IProduct} from '../../types';

export class Cart {
    private  selectedItems: IProduct[];

    constructor() {
        this.selectedItems = [];
    }

    getSelectedItems(): IProduct[] {
        return this.selectedItems
    }

    addItem(item: IProduct) {
        this.selectedItems.push(item);
    }

    deleteItem(item: IProduct) {
        this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
    }

    clear() {
        this.selectedItems = [];
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