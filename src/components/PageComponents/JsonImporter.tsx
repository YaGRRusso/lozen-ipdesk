import {
  ErrorMessage,
  ImagesList,
  ImagesListProps,
  ImportedList,
  ProgressBar,
  ProgressBarProps,
  UploadButton,
  ConvertButton,
} from '@components/index'
import { Inspector } from 'react-inspector'
import * as C from '@styles/ContainerBox'
import { NewOldIdProps } from '@context/ImportContext'

export type ImportObjectProps = {
  value: any
  setValue: React.Dispatch<React.SetStateAction<any>>
  target: string
  setIds?: React.Dispatch<React.SetStateAction<NewOldIdProps>>
  parent?: string
}

export interface JsonImporterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  uploadEvent: {
    onClick: () => void
    loading: boolean
  }
  title: string
  object: ImportObjectProps
  progress: ProgressBarProps
  importedListNewOldIds: NewOldIdProps
  parentNewOldIds?: NewOldIdProps
  importedImagesList?: Pick<ImagesListProps, 'data'>
}

const JsonImporter = ({
  uploadEvent,
  title,
  object,
  progress,
  parentNewOldIds,
  importedListNewOldIds,
  importedImagesList,
  ...rest
}: JsonImporterProps) => {
  const importJson = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files && ev.target.files[0]) {
      const fileReader = new FileReader()
      fileReader.readAsText(ev.target.files[0], 'UTF-8')
      fileReader.onload = (e) => {
        const parsedJson = JSON.parse(e.target?.result as string)
        if (object.target in parsedJson) {
          if (object.setIds) {
            object.setIds((oldArray) => ({ ...oldArray, newOldIds: [] }))
          }
          object.setValue(parsedJson)
        } else if (
          object.setIds &&
          'newOldIds' in parsedJson &&
          object.target === parsedJson.target
        ) {
          object.setIds(parsedJson)
          object.setValue(undefined)
        } else {
          if (object.setIds) {
            object.setIds((oldArray) => ({ ...oldArray, newOldIds: [] }))
          }
          object.setValue({ error: 'Arquivo inválido' })
        }
      }
    } else {
      if (object.setIds) {
        object.setIds((oldArray) => ({ ...oldArray, newOldIds: [] }))
      }
      object.setValue(undefined)
    }
  }

  return (
    <C.Container>
      <C.ContainerTitle>
        <span>{title}</span>
        {parentNewOldIds?.newOldIds && (
          <ConvertButton
            active={
              object.value &&
              !object.value.error &&
              parentNewOldIds?.newOldIds.length > 0
            }
            newOldIds={parentNewOldIds}
            object={object}
          />
        )}
        <UploadButton
          active={object.value && !object.value.error && !uploadEvent.loading}
          onClick={uploadEvent.onClick}
        />
      </C.ContainerTitle>
      <C.ContainerBody {...rest}>
        <input
          className="bg-slate-50 disabled:p-2 rounded disabled:pointer-events-none hover:bg-slate-100 cursor-pointer transition-all duration-500 border-dashed border-2 border-slate-300 hover:border-slate-400 text-slate-900 disabled:text-slate-400 hover:text-slate-800 w-full p-6"
          type="file"
          onChange={(ev) => importJson(ev)}
          disabled={uploadEvent.loading}
        />
        {object.value && !object.value.error && (
          <Inspector table={false} data={object.value} />
        )}
        {object.value && object.value.error && (
          <ErrorMessage message={object.value.error} />
        )}
        <ProgressBar current={progress.current} max={progress.max} />
        {importedListNewOldIds.newOldIds &&
          importedListNewOldIds.newOldIds.length > 0 && (
            <ImportedList data={importedListNewOldIds} />
          )}
        {importedImagesList?.data && importedImagesList.data.length > 0 && (
          <ImagesList data={importedImagesList.data} />
        )}
      </C.ContainerBody>
    </C.Container>
  )
}

export default JsonImporter
