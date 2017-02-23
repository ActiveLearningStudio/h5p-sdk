import {getAttribute, setAttribute, removeAttribute, attributeEquals, querySelector, toggleAttribute} from '../utils/elements';
import {curry, forEach, inverseBooleanString} from '../utils/functional';

/**
 * @const
 * @type {string}
 */
const ATTRIBUTE_ARIA_EXPANDED = "aria-expanded";

/**
 * @type {function}
 */
const selectExpandable = querySelector('[aria-expanded]');

/**
 * @type {function}
 */
const getAriaControls = getAttribute('aria-controls');

/**
 * @type {function}
 */
const isExpanded = attributeEquals(ATTRIBUTE_ARIA_EXPANDED, 'true');

/**
 * @type {function}
 */
const setAriaHiddenTrue = setAttribute('aria-hidden', 'true');

/**
 * @type {function}
 */
const setAriaHiddenFalse = setAttribute('aria-hidden', 'false');

/**
 * @type {Function}
 */
const toggleBodyVisibility = curry(function(bodyElement, mutation) {
  const titleEl = mutation.target;

  if(isExpanded(titleEl)) {
    setAriaHiddenFalse(bodyElement);
    bodyElement.style.height = `${bodyElement.scrollHeight}px`;
  }
  else {
    setAriaHiddenTrue(bodyElement);
    bodyElement.style.height = "0";
  }
});

/**
 * Initializes a panel
 *
 * @param {HTMLElement} element
 * @return {HTMLElement}
 */
export default function init(element) {
  const titleEl = selectExpandable(element);
  const bodyId = getAriaControls(titleEl);
  const bodyEl = element.querySelector(`#${bodyId}`);

  if(titleEl) {
    // set observer on title for aria-expanded
    let observer = new MutationObserver(forEach(toggleBodyVisibility(bodyEl)));

    observer.observe(titleEl, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: [ATTRIBUTE_ARIA_EXPANDED]
    });

    // Set click listener that toggles aria-expanded
    titleEl.addEventListener('click', function(event) {
      toggleAttribute(ATTRIBUTE_ARIA_EXPANDED, event.target);
    });
  }

  return element;
}