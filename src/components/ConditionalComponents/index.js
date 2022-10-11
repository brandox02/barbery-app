import React from "react";

export function Conditional({ children }) {
  const arr = [
    ...(Array.isArray(children) ? children : children ? [children] : []),
  ];
  const elseComp = arr.find((x) => x.type.name === "Else");

  const matched = arr
    .filter((comp) => comp.type.name === "If")
    .find((comp) => comp.props.condition === true);

  return matched || elseComp;
}

Conditional.If = function If({ children, condition }) {
  return <>{children}</>;
};

Conditional.Else = function Else({ children, condition }) {
  return <>{children}</>;
};

export const Switch = ({ children, when }) => {
  const arr = [
    ...(Array.isArray(children) ? children : children ? [children] : []),
  ];

  const DefaulCase = arr.find((comp) => comp.type.name === "Default");

  if (!arr.length) return;
  if (!when && !DefaulCase) return;

  const matched = arr
    .filter((comp) => comp.type.name === "Case")
    .find((comp) => comp.props?.switchCase === when);

  if (matched) return matched;
  if (DefaulCase) return DefaulCase;
};

Switch.Case = function Case({ children, switchCase }) {
  return children;
};

Switch.Default = function Default({ children }) {
  return children;
};
