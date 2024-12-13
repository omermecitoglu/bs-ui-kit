"use client";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons/faFolderOpen";
import { useRef, useState } from "react";
import ActionButton from "../ActionButton";
import FileBasket from "../FileBasket";
import ImageList from "../ImageList";
import Group from "./Group";
import Label from "./Label";

type ImageUploaderProps = {
  label?: string,
  name: string,
  action: (formData: FormData) => Promise<string>,
  limit?: number,
  buttonText: string,
  publicURL: string,
  imageSizeRatio?: number,
  droppable?: boolean,
  dropCTA?: string,
  defaultValue?: string[],
};

const ImageUploader = ({
  label,
  name,
  action,
  limit = Infinity,
  buttonText,
  publicURL,
  imageSizeRatio,
  droppable = false,
  dropCTA,
  defaultValue = [],
}: ImageUploaderProps) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>(defaultValue);

  const openFileBrowser = () => {
    if (!fileInput.current) return;
    fileInput.current.click();
  };

  const prepareFileForUpload = (file: File) => {
    const formData = new FormData();
    formData.set("file", file);
    return formData;
  };

  const handleFileDrop = async (files: File[]) => {
    try {
      setUploading(true);
      const filesToUpload = files.slice(0, Math.max(0, limit - uploadedFiles.length));
      const storedObjects = await Promise.all(filesToUpload.map(file => action(prepareFileForUpload(file))));
      setUploadedFiles(list => [...list, ...storedObjects].slice(0, limit));
    } catch {
      alert("Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    await handleFileDrop(Array.from(files ?? []));
    e.target.value = "";
  };

  const deleteFile = (itemId: string) => {
    setUploadedFiles(collection => collection.filter(item => item !== itemId));
  };

  return (
    <Group id={name}>
      {label && <Label text={label} />}
      {uploadedFiles.map(file => (
        <input key={file} type="hidden" name={`${name}[]`} value={file} />
      ))}
      <input
        ref={fileInput}
        type="file"
        multiple={limit > 1}
        accept="image/*"
        className="d-none"
        onChange={handleFileInput}
      />
      <div className="d-grid gap-3">
        <ActionButton
          icon={faFolderOpen}
          text={buttonText}
          variant="success"
          onClick={openFileBrowser}
          spinning={uploading}
          disabled={uploadedFiles.length >= limit}
          stretched
        />
      </div>
      {uploadedFiles.length > 0 && (
        <ImageList
          collection={uploadedFiles}
          publicURL={publicURL}
          limit={limit}
          ratio={imageSizeRatio}
          onDelete={deleteFile}
        />
      )}
      {droppable && uploadedFiles.length < limit && (
        <FileBasket cta={dropCTA} onFileDrop={handleFileDrop} />
      )}
    </Group>
  );
};

export default ImageUploader;
