"use client";
import { useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";

type StatusEmitterProps = {
  onComplete: () => void,
};

const StatusEmitter = ({
  onComplete,
}: StatusEmitterProps) => {
  const { pending } = useFormStatus();
  const pendingStatus = useRef(false);
  useEffect(() => {
    if (pendingStatus.current && !pending) {
      onComplete();
    }
    pendingStatus.current = pending;
  }, [pending]);
  return <></>;
};

export default StatusEmitter;
