import { createContext } from "react";

type FormErrors = Record<string, string>;

const FormContext = createContext<FormErrors>({});

export default FormContext;
