import {
  ErrorMessage,
  ImagesList,
  ImportedList,
  ProgressBar,
  UploadButton,
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
  }
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
  warningList?: {
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
  warningList,
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
        {warningList && warningList.length > 0 && (
          <ImagesList imagesList={warningList} />
        )}
      </C.ContainerBody>
    </C.Container>
  )
}

export default JsonImporter
