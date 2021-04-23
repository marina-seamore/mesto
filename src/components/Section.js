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
            const renderedItem = this._renderer(item);
            this.addItem(renderedItem);
        });
    }

}