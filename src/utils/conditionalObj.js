const conditionalObj = ({ obj, condition, conditionlObj }) => ({
  ...(condition ? conditionlObj : {}),
  ...obj,
});

export default conditionalObj;
