import JoditEditor, { JoditProps } from "jodit-react";
import { useRef } from "react";

interface PropsTS extends JoditProps {}

const joditConfig = {
  readonly: false,
  minWidth: "auto",
  removeButtons: [
    "eraser",
    "font",
    "superscript",
    "subscript",
    "file",
    "image",
    "video",
    "speechRecognize",
    "brush",
    "source",
    "print",
    "about",
  ],
};

export const TextAreaInput = ({ ...rest }: PropsTS) => {
  const joditRef = useRef<JoditEditor | null>(null);

  return (
    <div className="max-w-screen-md w-full list-disc">
      <JoditEditor ref={joditRef} config={joditConfig} {...rest} />
    </div>
  );
};
