import { ImportObjectProps } from '@components/PageComponents/JsonImporter'
import { NewOldIdProps } from '@context/ImportContext'
import { ArrowsClockwise, Check } from 'phosphor-react'
import { useEffect, useState } from 'react'

export interface ConvertButtonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  active: boolean
  newOldIds: NewOldIdProps
  object: ImportObjectProps
}

const ConvertButton = ({
  active,
  newOldIds,
  object,
  ...rest
}: ConvertButtonProps) => {
  const [converted, setConverted] = useState(false)

  useEffect(() => {
    if (active) {
      handleConvert()
    } else {
      setConverted(false)
    }
  }, [object.value, newOldIds])

  const handleConvert = () => {
    if (object.parent && newOldIds?.newOldIds.length > 1) {
      let temp = object.value[object.target]
      for (let i in newOldIds.newOldIds) {
        for (let ii in temp) {
          temp[ii][object.parent] = parseInt(
            temp[ii][object.parent]
              .toString()
              .replace(
                newOldIds?.newOldIds[i].oldId.toString(),
                newOldIds?.newOldIds[i].newId.toString()
              )
          )
        }
      }
      console.log('oi')
      let parsedObject = object.value
      parsedObject[object.target] = temp
      object.setValue(parsedObject)
      setConverted(true)
    }
  }

  return (
    <div
      className={converted ? 'text-slate-800' : 'text-sky-900'}
      title="Converter"
      {...rest}
    >
      {!converted && <ArrowsClockwise weight="bold" size={20} />}
      {converted && <Check weight="bold" size={20} />}
    </div>
  )
}

export default ConvertButton
