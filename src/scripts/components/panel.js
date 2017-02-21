import {getAttribute, setAttribute, removeAttribute, attributeEquals, querySelector} from '../utils/elements';

/**
 * @type {function}
 */
const selectExpandable = querySelector('[aria-expanded]');

/**
 * @type {function}
 */
const isExpanded = attributeEquals('aria-expanded', 'true');

/**
 * Initializes a panel
 *
 * @param {HTMLElement} element
 * @return {HTMLElement}
 */
export default function init(element) {
  const titleElement = selectExpandable(element);


  if(titleElement) {
    // hide all others
    let target = document.getElementById('some-id');

    let observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        console.log(mutation.type);
      });
    });

    let config = { attributes: true, childList: true, characterData: true };

    observer.observe(titleElement, config);
  }

  return element;
}