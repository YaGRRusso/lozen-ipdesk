import JoditEditor, { JoditProps } from 'jodit-react'
import { useRef } from 'react'

export interface FormTextAreaInputProps extends JoditProps {}

const joditConfig = {
  readonly: false,
  minWidth: 'auto',
  removeButtons: [
    'eraser',
    'font',
    'superscript',
    'subscript',
    'file',
    'image',
    'video',
    'speechRecognize',
    'brush',
    'source',
    'print',
    'about',
  ],
  // theme: 'dark',
}

const FormTextAreaInput = ({ ...rest }: FormTextAreaInputProps) => {
  const joditRef = useRef<JoditEditor | null>(null)

  return (
    <div className="max-w-screen-md w-full list-disc rounded bg-white">
      <JoditEditor ref={joditRef} config={joditConfig} {...rest} />
    </div>
  )
}

export default FormTextAreaInput
