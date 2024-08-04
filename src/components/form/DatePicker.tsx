"use client";
import "../../../node_modules/vanillajs-datepicker/dist/css/datepicker.min.css";
import "../../../node_modules/vanillajs-datepicker/dist/css/datepicker-bs5.min.css";
import { useEffect, useRef } from "react";
import FormControl from "react-bootstrap/FormControl";
import VanillaDatepicker from "vanillajs-datepicker/Datepicker";
import Group from "./Group";
import Label from "./Label";

type DatePickerProps = {
  name: string,
  label: string,
  language: string,
};

const DatePicker = ({
  name,
  label,
  language,
}: DatePickerProps) => {
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!input.current) return;
    const datepicker = new VanillaDatepicker(input.current, {
      buttonClass: "btn",
      clearButton: true,
      todayButton: true,
      todayButtonMode: 1,
      todayHighlight: true,
      language,
      format: "yyyy-mm-dd",
    });

    return () => {
      datepicker.destroy();
    };
  }, []);

  return (
    <Group id={name}>
      <Label text={label} />
      <FormControl ref={input} as="input" type="text" readOnly />
    </Group>
  );
};

export default DatePicker;
