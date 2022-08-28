import { validateEmail } from "../../utils/validateEmail";

// get definition for input validations
export function getInputValidates(methods) {
  return (name) => {
    const obj = {
      email: {
        validEmail: (value) => validateEmail(value) || "Email no válido",
      },
      password: {
        equalPass: (value) => {
          if (methods.watch("password2") === value) {
            methods.clearErrors("password2");
            return true;
          } else {
            return "Las contraseñas no coinciden";
          }
        },
      },
      password2: {
        equalPass: (value) => {
          if (methods.watch("password") === value) {
            methods.clearErrors("password");
            return true;
          } else {
            return "Las contraseñas no coinciden";
          }
        },
      },
    };

    return obj[name];
  };
}
