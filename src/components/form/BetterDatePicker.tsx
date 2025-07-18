"use client";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons/faArrowRotateLeft";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons/faCalendarCheck";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons/faCaretLeft";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons/faCaretRight";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons/faThumbsUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useEffect, useMemo, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import { useOnClickOutside } from "../../hooks";
import { adjustDate, formatDate, getFirstDayOfWeek, isSameDay, isSameMonth } from "../../utils/date";
import Group from "./Group";
import InputWithFeedback, { type InputWithFeedbackProps } from "./InputWithFeedback";
import Label from "./Label";
import SimpleInput, { type HtmlInputProps } from "./SimpleInput";

type BetterDatePickerProps = {
  label?: string,
  locale: string,
  defaultValue?: string,
};

const BetterDatePicker = ({
  name,
  label,
  messages,
  locale,
  defaultValue,
  ...props
}: BetterDatePickerProps & HtmlInputProps & InputWithFeedbackProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const popupContainer = useRef<HTMLDivElement>(null);
  const [isShowingPopup, setIsShowingPopup] = useState(false);
  const [today, setToday] = useState(new Date(1, 0, 1));
  const [displayedMonth, setDisplayedMonth] = useState(new Date(1, 0, 1));
  const [selectedDate, setSelectedDate] = useState(new Date(1, 0, 1));
  const [isChoosingYear, setIsChoosingYear] = useState(false);

  useEffect(() => {
    const todayDate = new Date();
    setToday(todayDate);
    if (defaultValue) {
      const defaultDate = new Date(defaultValue);
      setDisplayedMonth(adjustDate(defaultDate, -1 * (defaultDate.getDate() - 1)));
      setSelectedDate(defaultDate);
    } else {
      setDisplayedMonth(adjustDate(todayDate, -1 * (todayDate.getDate() - 1)));
      setSelectedDate(new Date(todayDate));
    }
  }, []);

  const days = useMemo(() => {
    const firstDayOfWeek = getFirstDayOfWeek(displayedMonth, "monday");
    return Array(7 * 6).fill(null).map((_, index) => adjustDate(firstDayOfWeek, index + 0));
  }, [displayedMonth]);

  const title = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(displayedMonth);

  const goToNextMonth = () => {
    setDisplayedMonth(d => {
      const date = new Date(d.getTime());
      date.setMonth(d.getMonth() + 1);
      return date;
    });
    setIsChoosingYear(false);
  };

  const goToLastMonth = () => {
    setDisplayedMonth(d => {
      const date = new Date(d.getTime());
      date.setMonth(d.getMonth() - 1);
      return date;
    });
    setIsChoosingYear(false);
  };

  const getVariant = (day: Date) => {
    if (isSameDay(day, selectedDate)) {
      return "primary";
    }
    if (isSameDay(day, today)) {
      return "success";
    }
    if (isSameMonth(day, displayedMonth)) {
      return "outline-secondary";
    }
    return "link";
  };

  const updateDisplayedYear = (value: string) => {
    if (value.length > 4) return;
    const year = value ? parseInt(value) : 0;
    if (isNaN(year)) return;
    setDisplayedMonth(d => {
      const date = new Date(d.getTime());
      date.setFullYear(year);
      return date;
    });
  };

  const close = () => {
    setIsShowingPopup(false);
  };

  const selectToday = () => {
    setDisplayedMonth(adjustDate(today, -1 * (today.getDate() - 1)));
    setSelectedDate(new Date(today.getTime()));
  };

  const selectDefault = () => {
    if (!defaultValue) return;
    const defaultDate = new Date(defaultValue);
    setDisplayedMonth(adjustDate(defaultDate, -1 * (defaultDate.getDate() - 1)));
    setSelectedDate(defaultDate);
  };

  useOnClickOutside([popupRef, inputRef], close);

  const formatOutput = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <Group id={name}>
      {label && <Label text={label} />}
      <div className="position-relative">
        {messages ? (
          <InputWithFeedback
            ref={inputRef}
            name={name}
            messages={messages}
            {...props}
            value={formatOutput(selectedDate)}
            displayValue={formatDate(selectedDate.toISOString(), locale)}
            readOnly
            onFocus={() => setIsShowingPopup(true)}
          />
        ) : (
          <SimpleInput
            ref={inputRef}
            name={name}
            {...props}
            value={formatOutput(selectedDate)}
            displayValue={formatDate(selectedDate.toISOString(), locale)}
            readOnly
            onFocus={() => setIsShowingPopup(true)}
          />
        )}
        <div ref={popupContainer} className="position-absolute top-0 bottom-0 start-0 end-0 pe-none" />
      </div>
      <Overlay
        target={popupContainer.current}
        show={isShowingPopup}
        placement="top"
        flip
      >
        {popoverProps => (
          <Popover id="date-picker-popup" className="border border-0" {...popoverProps}>
            <div ref={popupRef} className="rounded rounded-2 border overflow-hidden">
              <div className="d-flex justify-content-between align-items-center py-2 px-1 bg-body-secondary">
                <Button size="sm" variant="link" onClick={goToLastMonth}>
                  <FontAwesomeIcon icon={faCaretLeft} size="lg" className="fa-fw" />
                </Button>
                <Button
                  size="sm"
                  variant="outline-secondary"
                  className="fw-bold"
                  onClick={() => setIsChoosingYear(currentValue => !currentValue)}
                >
                  {title}
                </Button>
                <Button size="sm" variant="link" onClick={goToNextMonth}>
                  <FontAwesomeIcon icon={faCaretRight} size="lg" className="fa-fw" />
                </Button>
              </div>
              <div className="py-2 px-3 position-relative">
                <div
                  className={classNames("d-grid gap-1", {
                    invisible: isChoosingYear,
                  })}
                  style={{ gridTemplateColumns: "repeat(7, 1fr)" }}
                >
                  {days.map((day, dayIndex) => (
                    <div key={dayIndex}>
                      <Button
                        size="sm"
                        className="w-100 py-0 px-1 text-decoration-none"
                        variant={getVariant(day)}
                        onClick={() => setSelectedDate(day)}
                      >
                        {day.getDate()}
                      </Button>
                    </div>
                  ))}
                </div>
                <div
                  className={classNames("position-absolute top-0 bottom-0 start-0 end-0 p-3", {
                    "d-none": !isChoosingYear,
                  })}
                >
                  <div className="d-grid gap-3">
                    <SimpleInput
                      autoFocus
                      name="date-picker-choose-year"
                      value={`${displayedMonth.getFullYear() || ""}`}
                      onChange={e => updateDisplayedYear(e.target.value)}
                    />
                    <Button onClick={() => setIsChoosingYear(false)}>
                      <FontAwesomeIcon icon={faCheck} size="lg" className="fa-fw" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="py-2 px-3 bg-body-tertiary">
                <div
                  className={classNames("d-grid gap-3", {
                    invisible: isChoosingYear,
                  })}
                  style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
                >
                  <Button size="sm" variant="primary" onClick={close}>
                    <FontAwesomeIcon icon={faThumbsUp} size="lg" className="fa-fw" />
                  </Button>
                  <Button size="sm" variant="success" onClick={selectToday}>
                    <FontAwesomeIcon icon={faCalendarCheck} size="lg" className="fa-fw" />
                  </Button>
                  <Button size="sm" variant="secondary" onClick={selectDefault} disabled={!defaultValue}>
                    <FontAwesomeIcon icon={faArrowRotateLeft} size="lg" className="fa-fw" />
                  </Button>
                </div>
              </div>
            </div>
          </Popover>
        )}
      </Overlay>
    </Group>
  );
};

export default BetterDatePicker;
