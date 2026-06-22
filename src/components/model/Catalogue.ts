import {IProduct} from '../../types';

export class Catalogue {
    private  items: IProduct[];
    private selectedItem: IProduct | null;

    constructor() {
        this.items = [];
        this.selectedItem = null;
    }

    save(items: IProduct[]) {
        this.items = items;
    }

    getItems() {
        return this.items;
    }

    getItemById(id: string) {
        return this.items.find((item) => item.id === id);
    }

    saveSelectedItem(selectedItem: IProduct) {
        this.selectedItem = selectedItem;
    }

    getSelectedItem() {
        return this.selectedItem;
    }
}