import { setAttribute, removeAttribute, hasAttribute } from '../utils/elements';
import {curry, forEach} from '../utils/functional';

/**
 * @type {function}
 */
const disable = setAttribute('disabled', '');

/**
 * @type {function}
 */
const enable = removeAttribute('disabled');

/**
 * @param {HTMLElement} element
 * @param {boolean} enabled
 */
const toggleEnabled = (element, enabled) => (enabled ? enable : disable)(element);

/**
 * @type {function}
 */
const hide = setAttribute('aria-hidden', 'true');

/**
 * @type {function}
 */
const show = setAttribute('aria-hidden', 'false');

/**
 * @type {function}
 */
const isDisabled = hasAttribute('disabled');
/**
 * Initializes a panel
 *
 * @param {HTMLElement} element
 * @return {HTMLElement}
 */
export default function init(element) {
  const imagesShown = 5;
  const prevButton = element.querySelector('.previous');
  const nextButton = element.querySelector('.next');
  const list = element.querySelector('ul');
  const items = element.querySelectorAll('li');
  const imageCount = list.childElementCount; // 7
  const totalListWidth = 100 / imagesShown * imageCount;
  let listItemWidth = (100 / imageCount);
  let position = 0;

  // initialize size
  list.style.width = `${totalListWidth}%`;
  items.forEach(element => element.style.width = `${listItemWidth}%`);

  // update function
  const updatePosition = () => {
    list.style.marginLeft = `${position * (100 / imagesShown)}%`;

    toggleEnabled(prevButton, position > (imagesShown - imageCount));
    toggleEnabled(nextButton, position < 0);
  };

  // show buttons if overflowing
  if(imageCount > imagesShown){
    show(prevButton);
    show(nextButton);
  }

  prevButton.addEventListener('click', function(event) {
    if(!isDisabled(event.target)){
      position--;
      updatePosition();
    }
  });

  nextButton.addEventListener('click', function(event) {
    if(!isDisabled(event.target)) {
      position++;
      updatePosition();
    }
  });

  // initialize position
  updatePosition();

  return element;
}