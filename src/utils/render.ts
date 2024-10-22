import { Block } from '../framework/Block';

export const render = (query: string, block: Block<StringIndexed>) => {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error(`root not found by selector "${query}"`);
  }

  root.innerHTML = '';

  if (block.element) {
    root.append(block.element);
  }

  return root;
};
