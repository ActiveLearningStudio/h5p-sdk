import {setAttribute} from '../utils/elements';
import {forEach} from '../utils/functional';

/**
 * @type {function}
 */
const show = setAttribute('aria-hidden', 'false');

/**
 * @type {function}
 */
const unSelectAll = forEach(setAttribute('aria-selected', 'false'));

/**
 * Initiates a tab panel
 *
 * @param {HTMLElement} element
 */
export default function init(element) {
  const menuItems = element.querySelectorAll('[role="menuitem"]');

  menuItems.forEach(menuItem => {
    menuItem.addEventListener('click', function (event) {
      console.log('click');
      unSelectAll(menuItems);
      event.target.setAttribute('aria-selected', 'true');
    });
  })
}
