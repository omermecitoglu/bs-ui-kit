import { createContext } from "react";

type Context = {
  errors: Record<string, string>,
  messages: Record<string, string | undefined>,
};

const FormContext = createContext<Context>({
  errors: {},
  messages: {},
});

export default FormContext;
