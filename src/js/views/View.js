import { mark } from 'regenerator-runtime';
import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class View {
  data;

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data // The data to be rendered
   * @param {boolean} [render = true] if false create markup string instead of renering to the DOM
   * @returns {undefined | string} A markup is returned if render = false
   * @this {Object} view instance
   * @author Bright Amoi
   * @todo Finish implementaton
   */

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this.data = data;
    const markup = this.generateMarkup();

    if (!render) return markup;

    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this.data = data;
    const newMarkup = this.generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = newDOM.querySelectorAll('*');
    const curElements = this.parentElement.querySelectorAll('*');

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      //Update changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('👋', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      //updade changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl));
      Array.from(newEl.attributes).forEach(attr =>
        curEl.setAttribute(attr.name, attr.value)
      );
    });
  }

  clear() {
    this.parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
      <svg>
      <use href="${icons}#icon-loader"></use>
      </svg>
      </div>`;
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this.errorMessage) {
    const markup = `
<div class="error">
            <div>
              <svg>
                <use href=${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}!</p>
          </div>`;
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this.message) {
    const markup = `
<div class="message">
            <div>
              <svg>
                <use href=${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}!</p>
          </div>`;
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
