"use client";
import { useEffect, useState } from "react";
import getTransferredFiles from "../core/drag-n-drop";

type FileBasketProps = {
  cta?: string,
  onFileDrop: (files: File[]) => void,
};

const FileBasket = ({
  cta = "Drop your files here",
  onFileDrop,
}: FileBasketProps) => {
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      if (!e.dataTransfer || !e.dataTransfer.items.length) return;
      if (!Array.from(e.dataTransfer.items).find(i => i.kind === "file")) return;
      setDragging(true);
    };
    document.addEventListener("dragover", handleDragOver);
    return () => {
      document.removeEventListener("dragover", handleDragOver);
    };
  }, []);

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = await getTransferredFiles(e.dataTransfer);
    onFileDrop(files);
  };

  return (
    <>
      {dragging && (
        <div
          className="fixed-top vw-100 vh-100 p-5"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(10px)",
          }}
          onDragOver={e => e.preventDefault()}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <div
            className="h-100 d-flex justify-content-center align-items-center text-dark fs-1"
            style={{
              backgroundColor: "rgba(255,255,255,0.5)",
              border: "dashed 5px black",
              pointerEvents: "none",
            }}
          >
            <div>{cta}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default FileBasket;
