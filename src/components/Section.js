export default class Section{
    constructor ({items, renderer}, container){
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(container);
    }

    addItem(item) {
        this._container.append(item);
    }

    renderItems() {
        this._items.forEach(item => {
            this._renderer(item);
        });
    }

}