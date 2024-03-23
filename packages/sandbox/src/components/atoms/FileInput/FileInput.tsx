import React, { useState } from "react";
import { clsx } from "clsx";

import { Button } from "@/components/atoms";

import { fileInputStyles, FileInputVariant } from "./FileInput.styles";

export type FileInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "onChange" | keyof FileInputVariant
> & {
  onChange?: (
    files: FileList | null,
    e: React.ChangeEvent<HTMLInputElement> | undefined
  ) => void;
} & FileInputVariant;

export function FileInput({
  className,
  size = "md",
  onChange,
  ...props
}: FileInputProps) {
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const classes = fileInputStyles({ size, className });

  const onClick = () => {
    inputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles([...(e.target.files ?? [])]);
    onChange?.(e.target.files, e);
  };

  return (
    <div className="flex">
      <Button
        size={size}
        className="rounded-tr-none rounded-br-none border-r-0"
        onClick={onClick}
      >
        Upload
      </Button>
      <input
        type="text"
        className={clsx(classes, "rounded-tl-none rounded-bl-none")}
        {...props}
        readOnly={true}
        onClick={onClick}
        value={getFieldLabel(files)}
      />
      <input
        type="file"
        className="hidden"
        ref={inputRef}
        {...props}
        onChange={onFileChange}
      />
    </div>
  );
}

/**
 * Get the label for the file list field.
 * Max 2 files are shown in the label. If more than 2 files are selected, the label will be "X files selected".
 * @param files The file list
 * @returns The label of the field
 */
const getFieldLabel = (files: File[]) => {
  if (files.length > 0) {
    if (files.length > 2) {
      return `${files.length} files selected`;
    }
    return Array.from(files)
      .map((file) => file.name)
      .join(", ");
  }

  return "No file chosen";
};
