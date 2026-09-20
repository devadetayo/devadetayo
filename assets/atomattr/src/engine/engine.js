import { parseAttribute } from './parser.js';
import { generateAndInjectRule } from './generator.js';
import { shouldIgnoreAttribute } from '../style-data/variables.js';

let observer = null;
let started = false;

function processElement(element) {
  if (!element || element.nodeType !== 1 || !element.attributes) return;

  for (const attribute of element.attributes) {
    if (shouldIgnoreAttribute(attribute.name)) continue;

    const parsed = parseAttribute(attribute.name, attribute.value);
    if (parsed) generateAndInjectRule(parsed);
  }
}

function processTree(root) {
  if (!root || root.nodeType !== 1) return;

  processElement(root);
  root.querySelectorAll('*').forEach(processElement);
}

export function refreshAtomAttr(root = document.documentElement) {
  if (typeof document === 'undefined') return;
  processTree(root);
}

export function startEngine() {
  if (started || typeof document === 'undefined') return;

  if (!document.body) {
    window.addEventListener('DOMContentLoaded', startEngine, { once: true });
    return;
  }

  started = true;
  refreshAtomAttr(document.documentElement);

  observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes') {
        processElement(mutation.target);
      }

      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) processTree(node);
        });
      }
    }
  });

  observer.observe(document.documentElement, {
    attributes: true,
    childList: true,
    subtree: true,
  });
}

export function stopEngine() {
  if (observer) observer.disconnect();
  observer = null;
  started = false;
}
