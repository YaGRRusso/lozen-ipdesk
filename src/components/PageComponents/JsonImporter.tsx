import {
  ErrorMessage,
  ImagesList,
  ImagesListProps,
  ImportedList,
  ProgressBar,
  ProgressBarProps,
  UploadButton,
  ConvertButton,
  FormFile,
  FileImportResponseProps,
} from '@components/index'
import { Inspector } from 'react-inspector'
import * as C from '@styles/ContainerBox'
import { NewOldIdProps } from '@context/ImportContext'
import { useMemo } from 'react'

export type ImportObjectProps = {
  value: any
  setValue: React.Dispatch<React.SetStateAction<any>>
  target: string
  setIds?: React.Dispatch<React.SetStateAction<NewOldIdProps>>
  parent?: string
}

export interface JsonImporterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  uploadFunction: () => void
  infoLoading: boolean
  title: string
  object: ImportObjectProps
  progress: ProgressBarProps
  importedListNewOldIds: NewOldIdProps
  parentNewOldIds?: NewOldIdProps
  importedImagesList?:
    | {
        title: string
      }[]
    | undefined
}

const JsonImporter = ({
  infoLoading,
  uploadFunction,
  title,
  object,
  progress,
  parentNewOldIds,
  importedListNewOldIds,
  importedImagesList,
  ...rest
}: JsonImporterProps) => {
  const importJson = ({ file, error }: FileImportResponseProps) => {
    if (error) {
      if (object.setIds)
        object.setIds((oldValue) => ({ ...oldValue, newOldIds: [] }))
      object.setValue({ error })
      return
    }
    if (file === null) {
      if (object.setIds)
        object.setIds((oldValue) => ({ ...oldValue, newOldIds: [] }))
      object.setValue(undefined)
      return
    }
    const fileReader = new FileReader()
    fileReader.readAsText(file, 'UTF-8')
    fileReader.onload = (ev) => {
      const parsedJson = JSON.parse(ev.target?.result as string)
      if (object.target in parsedJson) {
        if (object.setIds) {
          object.setIds((oldValue) => ({ ...oldValue, newOldIds: [] }))
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
          object.setIds((oldValue) => ({ ...oldValue, newOldIds: [] }))
        }
        object.setValue({ error: 'Arquivo incorreto' })
      }
    }
  }

  const activeConvertButton = useMemo(() => {
    if (
      object.value &&
      !object.value.error &&
      parentNewOldIds &&
      parentNewOldIds?.newOldIds.length > 0
    ) {
      return true
    } else {
      return false
    }
  }, [object.value, parentNewOldIds?.newOldIds])

  const activeUploadButton = useMemo(() => {
    if (object.value && !object.value.error && !infoLoading) {
      return true
    } else {
      return false
    }
  }, [object.value, infoLoading])

  return (
    <C.Container>
      <C.ContainerTitle>
        <span>{title}</span>
        {parentNewOldIds?.newOldIds && (
          <ConvertButton
            active={activeConvertButton}
            newOldIds={parentNewOldIds}
            object={object}
          />
        )}
        <UploadButton active={activeUploadButton} onClick={uploadFunction} />
      </C.ContainerTitle>
      <C.ContainerBody {...rest}>
        <FormFile
          fileImport={importJson}
          infoLoading={infoLoading}
          fileTypes={['application/json']}
        />
        {object.value && object.value.error && (
          <ErrorMessage message={object.value.error} />
        )}
        {object.value && !object.value.error && (
          <Inspector table={false} data={object.value} />
        )}
        <ProgressBar current={progress.current} max={progress.max} />
        {importedListNewOldIds.newOldIds &&
          importedListNewOldIds.newOldIds.length > 0 && (
            <ImportedList data={importedListNewOldIds} />
          )}
        {importedImagesList && importedImagesList.length > 0 && (
          <ImagesList data={importedImagesList} />
        )}
      </C.ContainerBody>
    </C.Container>
  )
}

export default JsonImporter
