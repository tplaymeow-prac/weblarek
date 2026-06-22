import './scss/styles.scss';

import {API_URL} from './utils/constants.ts';
import {apiProducts} from './utils/data.ts';

import {Api} from './components/base/Api.ts';

import { Buyer } from './components/model/Buyer.ts';
import { Cart } from './components/model/Cart.ts';
import { Catalogue } from './components/model/Catalogue.ts';

import {NetworkService} from './services/NetworkService.ts';

// Создание экземпляров всех созданных классов.

const catalogue = new Catalogue();
const cart = new Cart();
const buyer = new Buyer();

// Тестирование всех методов моделей данных

// Catalogue

const element = catalogue.getItemById(apiProducts.items[2].id);
console.log('catalogue.getItem: ', element);

catalogue.saveSelectedItem(apiProducts.items[0]);
console.log('Selected item: ', catalogue.getSelectedItem());

catalogue.save(apiProducts.items);
console.log('Catalogue: ', catalogue.getItems());

//  Cart
apiProducts.items.forEach(item => {
    cart.addItem(item)
});
console.log('cart.getItems: ', cart.getSelectedItems());

cart.deleteItem(apiProducts.items[1]);
console.log('cart.getItems: ', cart.getSelectedItems());

console.log('cart.getTotalPrice: ', cart.getTotalPrice());

console.log('cart.getTotalAmount: ', cart.getTotalPrice());

console.log('cart.isAvailable ', cart.itemExist(apiProducts.items[1].id))

cart.clear();
console.log(cart.getSelectedItems());

// Buyer

buyer.setPayment('card');
buyer.setEmail('test@ya.ru');
buyer.setPhone('+11111111111');
buyer.setAddress('Random address');
console.log('buyer.getData:', buyer.getData());

const validationErrors = buyer.validation();
console.log('validationErrors:', validationErrors);

buyer.clear();
console.log('buyer.getData:', buyer.getData());

// Networking
// Запрос к серверу за объектом с данными каталога.
const api = new Api(API_URL);
const networkService = new NetworkService(api);
const catalogue1 = new Catalogue();

// ранение массива в модели данных и вывод массива в консоль.
networkService.getCatalogue()
    .then(items => {
        catalogue1.save(items);
        console.log('catalogue1.getItems:', catalogue1.getItems());
    })
    .catch(error => {
        console.error('Error:', error);
    });