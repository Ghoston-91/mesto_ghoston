export default class Section {
  constructor({renderer}, containerSelector) {

    this._renderer = renderer;
    this._container = containerSelector;
  }
  
  renderItems(renderedCards) {
    renderedCards.forEach(this._renderer) 
  }

  addItem(element) {
    this._container.prepend(element);
  }
}