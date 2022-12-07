import { Inspector } from 'react-inspector'
import {
  ConnectionButton,
  DownloadButton,
  PaginationCounterButton,
} from '@components/index'
import * as C from '@styles/ContainerBox'
import CsvDownloadButton from '@components/MiscComponents/CsvDownloadButton'
import { useAuthContext } from '@context/AuthContext'

export interface JsonViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  object: any
  nextPage: () => void
  prevPage: () => void
  infoLoading: boolean
}

const JsonViewer = ({
  title,
  object,
  nextPage,
  prevPage,
  infoLoading,
  ...rest
}: JsonViewerProps) => {
  const { theme } = useAuthContext()

  return (
    <div className="dark:shadow dark:shadow-slate-600">
      <C.Container>
        <C.ContainerTitle>
          <span>{title}</span>
          <PaginationCounterButton
            currentPage={object?.page}
            maxPages={object?.page_count}
            loading={infoLoading}
            nextPage={nextPage}
            prevPage={prevPage}
          />
          <div className="flex gap-1 items-center">
            <CsvDownloadButton object={object} title={title} responsive />
            <DownloadButton object={object} title={title} responsive />
          </div>
        </C.ContainerTitle>
        <div className="bg-white dark:bg-slate-800 json-inspector">
          <C.ContainerBody limit {...rest}>
            {(infoLoading || !object) && (
              <ConnectionButton loading={infoLoading} />
            )}
            {!infoLoading && object && (
              <Inspector
                table={false}
                data={object}
                expandLevel={3}
                theme={theme === 'dark' ? 'chromeDark' : 'chromeLight'}
              />
            )}
          </C.ContainerBody>
        </div>
      </C.Container>
    </div>
  )
}

export default JsonViewer
