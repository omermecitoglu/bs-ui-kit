"use client";
import "vanillajs-datepicker/css/datepicker.min.css";
import "vanillajs-datepicker/css/datepicker-bs5.min.css";
import { useEffect, useRef } from "react";
import FormControl from "react-bootstrap/FormControl";
import VanillaDatepicker from "vanillajs-datepicker/Datepicker";
import Group from "./Group";
import Label from "./Label";

type DatePickerProps = {
  name: string,
  label: string,
  language: string,
  defaultValue?: string,
};

const DatePicker = ({
  name,
  label,
  language,
  defaultValue,
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
      <FormControl
        ref={input}
        as="input"
        type="text"
        name={name}
        defaultValue={defaultValue}
        readOnly
      />
    </Group>
  );
};

export default DatePicker;
