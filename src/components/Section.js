export default class Section {
    constructor({ renderer }, container) {
        this._renderer = renderer;
        this._container = document.querySelector(container);
    }

    appendItem(item) {
        this._container.append(item);
    }

    prependItem(item) {
        this._container.prepend(item);
    }

    renderItems(items) {
        items.forEach(item => {
            this._renderer(item);
        });
    }

}