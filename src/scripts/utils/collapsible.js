import {attributeEquals, toggleAttribute, toggleVisibility, querySelectorAll } from '../utils/elements';

/**
 * Returns true if aria-expanded=true on element
 *
 * @param {HTMLElement} element
 * @function
 */
const isExpanded = attributeEquals("aria-expanded", 'true');

/**
 * Toggles hidden class on 'collapsible' when aria-expanded changes on 'toggler',
 * and toggles aria-expanded on 'toggler' on click
 *
 * @param {HTMLElement} element
 * @param {function} [targetHandler] falls back to toggleVisibility with hidden class
 * @param {string} [togglerSelector]
 */
export const initCollapsible = (element, targetHandler = toggleVisibility, togglerSelector = '[aria-controls][aria-expanded]') => {
  // elements
  const togglers = querySelectorAll(togglerSelector, element);

  togglers.forEach(toggler => {
    const collapsibleId = toggler.getAttribute('aria-controls');
    const collapsible = element.querySelector(`#${collapsibleId}`);

    // set observer on title for aria-expanded
    let observer = new MutationObserver(() => targetHandler(isExpanded(toggler), collapsible));

    observer.observe(toggler, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ["aria-expanded"]
    });

    // Set click listener that toggles aria-expanded
    toggler.addEventListener('click', () => toggleAttribute('aria-expanded', toggler));

    // Handling keydown, space & enter)
    toggler.addEventListener('keydown', event => {
      if (event.which === 13 || event.which === 32) {
        toggleAttribute('aria-expanded', toggler);
        event.preventDefault();
      }
    });

    // initialize
    targetHandler(isExpanded(toggler), collapsible);
  });
};
