import {setAttribute, attributeEquals, toggleAttribute} from '../utils/elements';
import {curry, forEach} from '../utils/functional';

/**
 * @type {function}
 */
const isExpanded = attributeEquals("aria-expanded", 'true');

/**
 * @type {function}
 */
const hide = setAttribute('aria-hidden', 'true');

/**
 * @type {function}
 */
const show = setAttribute('aria-hidden', 'false');

/**
 * Toggles the body visibility
 *
 * @param {HTMLElement} bodyElement
 * @param {boolean} isExpanded
 */
const toggleBodyVisibility = function(bodyElement, isExpanded) {
  if(!isExpanded) {
    hide(bodyElement);
    bodyElement.style.height = "0";
  }
  else if(bodyElement.scrollHeight > 0) {
    show(bodyElement);
    bodyElement.style.height = `${bodyElement.scrollHeight}px`;
  }
};

/**
 * Handles changes to aria-expanded
 *
 * @param {HTMLElement} bodyElement
 * @param {MutationRecord} event
 *
 * @function
 */
const onAriaExpandedChange = curry(function(bodyElement, event) {
  toggleBodyVisibility(bodyElement, isExpanded(event.target));
});

/**
 * Initializes a panel
 *
 * @param {HTMLElement} element
 * @return {HTMLElement}
 */
export default function init(element) {
  const titleEl = element.querySelector('[aria-expanded]');
  const bodyId = titleEl.getAttribute('aria-controls');
  const bodyEl = element.querySelector(`#${bodyId}`);

  if(titleEl) {
    // set observer on title for aria-expanded
    let observer = new MutationObserver(forEach(onAriaExpandedChange(bodyEl)));

    observer.observe(titleEl, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ["aria-expanded"]
    });

    // Set click listener that toggles aria-expanded
    titleEl.addEventListener('click', function(event) {
      toggleAttribute("aria-expanded", event.target);
    });

    toggleBodyVisibility(bodyEl, isExpanded(titleEl));
  }

  return element;
}