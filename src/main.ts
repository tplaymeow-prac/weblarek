import './scss/styles.scss';

import {API_URL} from './utils/constants.ts';
import {apiProducts} from './utils/data.ts';
import {cloneTemplate, ensureElement} from './utils/utils.ts';

import {Api} from './components/base/Api.ts';
import {EventEmitter} from './components/base/Events.ts';
import {NetworkService} from './services/NetworkService.ts';

import {Buyer} from './components/model/Buyer.ts';
import {Cart} from './components/model/Cart.ts';
import {Catalogue} from './components/model/Catalogue.ts';

import {Header} from './components/view/Header.ts';
import {Gallery} from './components/view/Gallery.ts';
import {Modal} from './components/view/Modal.ts';
import {Basket} from './components/view/Basket.ts';
import {OrderSuccess} from './components/view/OrderSuccess.ts';

import {CardBasket} from './components/view/CardBasket.ts';
import {CardCatalogue} from './components/view/CardCatalogue.ts';
import {CardPreview} from './components/view/CardPreview.ts';

import {OrderForm} from './components/view/OrderForm.ts';
import {ContactsForm} from './components/view/ContactsForm.ts';

import {
    IBuyer,
    IOrder,
    IProduct,
    TBuyerValidationErrors,
    TPayment,
} from './types';

type FormChange = {
    key: keyof IBuyer;
    value: IBuyer[keyof IBuyer];
};

const events = new EventEmitter();

const api = new Api(API_URL);
const networkService = new NetworkService(api);

const catalogue = new Catalogue(events);
const cart = new Cart(events);
const buyer = new Buyer(events);

const header = new Header(ensureElement<HTMLFormElement>('.header'), events);
const gallery = new Gallery(ensureElement<HTMLFormElement>('.gallery'));
const modal = new Modal(ensureElement<HTMLFormElement>('.modal'), events);

const catalogueTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const previewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');

const basket = new Basket(cloneTemplate<HTMLFormElement>('#basket'), events);
const orderSuccess = new OrderSuccess(cloneTemplate<HTMLFormElement>('#success'), events);
const previewCard = new CardPreview(cloneTemplate<HTMLFormElement>(previewTemplate), events);

const orderForm = new OrderForm(cloneTemplate<HTMLFormElement>('#order'), events);
const contactsForm = new ContactsForm(cloneTemplate<HTMLFormElement>('#contacts'), events);

const getErrorsText = (
    errors: TBuyerValidationErrors,
    fields: Array<keyof TBuyerValidationErrors>
): string => {
    return fields
        .map((field) => errors[field])
        .filter(Boolean)
        .join('; ');
};

const updatePreviewButton = (item: IProduct | null): void => {
    if (!item) {
        return;
    }

    if (item.price === null) {
        previewCard.buttonText = 'Недоступно';
        previewCard.unavailable = true;
        return;
    }

    const isInCart = cart.itemExist(item.id);

    previewCard.buttonText = isInCart ? 'Удалить из корзины' : 'Купить';
    previewCard.unavailable = false;
};

const fillOrderForm = (): void => {
    const data = buyer.getData();
    const errors = buyer.validation();

    orderForm.payment = data.payment as TPayment;
    orderForm.address = data.address;
    orderForm.errors = '';
    orderForm.valid = !errors.payment && !errors.address;
};

const fillContactsForm = (): void => {
    const data = buyer.getData();
    const errors = buyer.validation();

    contactsForm.email = data.email;
    contactsForm.phone = data.phone;
    contactsForm.errors = '';
    contactsForm.valid = !errors.email && !errors.phone;
};

networkService.getCatalogue()
    .then((response) => {
        catalogue.save(response.items);
    })
    .catch((error) => {
        console.error('Не удалось получить товары с сервера:', error);
        catalogue.save(apiProducts.items);
    });

events.on('catalog:change', () => {
    const cards = catalogue.getItems().map((item) => {
        const card = new CardCatalogue(cloneTemplate<HTMLFormElement>(catalogueTemplate), {
            onClick: () => catalogue.saveSelectedItem(item),
        });

        return card.render(item);
    });

    gallery.gallery = cards;
});

events.on('item:select', (item: IProduct) => {
    const content = previewCard.render(item);

    updatePreviewButton(item);

    modal.content = content;
    modal.open();
});

events.on('item:toggle', () => {
    const item = catalogue.getSelectedItem();

    if (!item || item.price === null) {
        return;
    }

    if (cart.itemExist(item.id)) {
        cart.deleteItem(item.id);
    } else {
        cart.addItem(item);
    }

    updatePreviewButton(item);
});

events.on('item:delete', (id: string) => {
    cart.deleteItem(id);
});

events.on('basket:change', () => {
    const cards = cart.getSelectedItems().map((item, index) => {
        const card = new CardBasket(cloneTemplate<HTMLFormElement>(basketTemplate), {
            onClick: () => events.emit('item:delete', item.id),
        });

        return card.render({
            ...item,
            index: index + 1,
        });
    });

    header.counter = cart.getNumberOfItems();

    basket.items = cards;
    basket.total = cart.getTotalPrice();
    basket.submitDisabled = cart.getNumberOfItems() === 0;

    updatePreviewButton(catalogue.getSelectedItem());
});

events.on('basket:open', () => {
    modal.content = basket.render();
    modal.open();
});

events.on('basket:submit', () => {
    fillOrderForm();

    modal.content = orderForm.render();
    modal.open();
});

events.on('buyer:change', (data: IBuyer) => {
    const errors = buyer.validation();

    orderForm.payment = data.payment as TPayment;
    orderForm.address = data.address;
    orderForm.errors = getErrorsText(errors, ['payment', 'address']);
    orderForm.valid = !errors.payment && !errors.address;

    contactsForm.email = data.email;
    contactsForm.phone = data.phone;
    contactsForm.errors = getErrorsText(errors, ['email', 'phone']);
    contactsForm.valid = !errors.email && !errors.phone;
});

events.on('form:change', (data: FormChange) => {
    buyer.setData({
        [data.key]: data.value,
    } as Partial<IBuyer>);
});

events.on('order:submit', () => {
    const errors = buyer.validation();

    if (errors.payment || errors.address) {
        orderForm.errors = getErrorsText(errors, ['payment', 'address']);
        return;
    }

    fillContactsForm();

    modal.content = contactsForm.render();
});

events.on('contacts:submit', () => {
    const errors = buyer.validation();

    if (errors.email || errors.phone) {
        contactsForm.errors = getErrorsText(errors, ['email', 'phone']);
        return;
    }

    const order: IOrder = {
        ...buyer.getData(),
        total: cart.getTotalPrice(),
        items: cart.getSelectedItems().map((item) => item.id),
    };

    networkService.postOrder(order)
        .then((result) => {
            orderSuccess.sum = result.total;

            modal.content = orderSuccess.render();

            buyer.clear();
            cart.clear();
        })
        .catch((error) => {
            console.error('Ошибка оформления заказа:', error);
            contactsForm.errors = 'Не удалось оформить заказ';
        });
});

events.on('succsess-modal:close', () => {
    modal.close();
});

header.counter = cart.getNumberOfItems();
basket.total = cart.getTotalPrice();
basket.submitDisabled = true;
