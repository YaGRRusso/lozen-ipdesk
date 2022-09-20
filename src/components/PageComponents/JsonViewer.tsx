import { Inspector } from 'react-inspector'
import {
  ConnectionButton,
  DownloadButton,
  PaginationCounterButton,
} from '@components/index'
import * as C from '../../styles/ContainerBox'

export interface JsonViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  object: any
  nextPage: () => void
  prevPage: () => void
  loading: boolean
}

const JsonViewer = ({
  title,
  object,
  nextPage,
  prevPage,
  loading,
  ...rest
}: JsonViewerProps) => {
  return (
    <C.Container>
      <C.ContainerTitle>
        <span>{title}</span>
        <PaginationCounterButton
          currentPage={object?.page}
          maxPages={object?.page_count}
          loading={loading}
          nextPage={nextPage}
          prevPage={prevPage}
        />
        <DownloadButton object={object} title={title} />
      </C.ContainerTitle>
      <C.ContainerBody limit {...rest}>
        {(loading || !object) && <ConnectionButton loading={loading} />}
        {!loading && <Inspector table={false} data={object} expandLevel={3} />}
      </C.ContainerBody>
    </C.Container>
  )
}

export default JsonViewer
