import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class AddRecipeView extends View {
  parentElement = document.querySelector('.upload');
  message = 'Recipe was succesfully uploaded :)';

  window = document.querySelector('.add-recipe-window');
  overlay = document.querySelector('.overlay');
  btnOpen = document.querySelector('.nav__btn--add-recipe');
  btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this.addHandllerShowWindow();
    this.addHandlerHideWindow();
  }

  toggleWindow() {
    this.overlay.classList.toggle('hidden');
    this.window.classList.toggle('hidden');
  }

  addHandllerShowWindow() {
    this.btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerHideWindow() {
    this.btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    this.overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this.parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  generateMarkup() {}
}

export default new AddRecipeView();
