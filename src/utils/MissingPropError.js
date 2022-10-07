

export class MissingPropError extends Error {
  constructor({ propName, componentName }, ...args) {
    const message = `HaircutCard.${componentName} component must has a ${propName} prop`;
    super(message, ...args);
  }
}
