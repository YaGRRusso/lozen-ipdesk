import {
  ErrorMessage,
  ImagesList,
  ImportedList,
  ProgressBar,
  UploadButton,
  ConvertButton,
} from '@components/index'
import { Inspector } from 'react-inspector'
import * as C from '@styles/ContainerBox'

export interface JsonImporterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  object: {
    value: any
    setValue: React.Dispatch<React.SetStateAction<any>>
    check: string
    parent?: string
  }
  convertObject?: {
    oldId: number
    newId: number
  }[]
  uploadEvent: () => void
  progress: {
    current?: number
    max?: number
  }
  importedList?: {
    title: string
    old: number
    new: number
  }[]
  imagesList?: {
    title: string
    id: number
  }[]
}

const JsonImporter = ({
  title,
  object,
  uploadEvent,
  progress,
  importedList,
  imagesList,
  convertObject,
  ...rest
}: JsonImporterProps) => {
  const importJson = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files && ev.target.files[0]) {
      const fileReader = new FileReader()
      fileReader.readAsText(ev.target.files[0], 'UTF-8')
      fileReader.onload = (e) => {
        const parsedJson = JSON.parse(e.target?.result as string)
        if (object.check in parsedJson) {
          object.setValue(parsedJson)
        } else {
          object.setValue({ error: 'arquivo inválido' })
        }
      }
    } else {
      object.setValue(undefined)
    }
  }

  return (
    <C.Container>
      <C.ContainerTitle>
        <span>{title}</span>
        {convertObject && (
          <ConvertButton
            active={
              object.value && !object.value.error && convertObject.length > 0
            }
            ids={convertObject}
            object={object}
          />
        )}
        <UploadButton
          active={object.value && !object.value.error}
          onClick={uploadEvent}
        />
      </C.ContainerTitle>
      <C.ContainerBody {...rest}>
        <input type="file" onChange={(ev) => importJson(ev)} />
        {object.value && !object.value.error && (
          <Inspector table={false} data={object.value} />
        )}
        {object.value && object.value.error && (
          <ErrorMessage message="Arquivo Inválido" />
        )}
        <ProgressBar current={progress.current} max={progress.max} />
        {importedList && importedList?.length > 0 && (
          <ImportedList importedList={importedList} />
        )}
        {imagesList && imagesList.length > 0 && (
          <ImagesList imagesList={imagesList} />
        )}
      </C.ContainerBody>
    </C.Container>
  )
}

export default JsonImporter
