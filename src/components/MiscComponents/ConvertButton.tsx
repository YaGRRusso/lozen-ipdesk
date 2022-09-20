import { ArrowsClockwise, Check } from 'phosphor-react'
import { useEffect, useState } from 'react'

export interface ConvertButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active: boolean
  ids: {
    oldId: number
    newId: number
  }[]
  object: {
    value: any[]
    setValue: React.Dispatch<React.SetStateAction<any>>
    check: string
    parent?: string
  }
}

const ConvertButton = ({
  active,
  ids,
  object,
  ...rest
}: ConvertButtonProps) => {
  const [converted, setConverted] = useState(false)

  useEffect(() => {
    if (active) {
      handleConvert()
    }
  }, [active])

  const handleConvert = () => {
    let temp = object.value[object.check as any]
    for (let i in ids) {
      for (let ii in temp) {
        temp[ii][object?.parent as any] = temp[ii][object?.parent as any]
          .toString()
          .replace(ids[i].oldId.toString(), ids[i].newId)
      }
    }
    let parsedObject = object.value
    parsedObject[object.check as any] = temp
    object.setValue(parsedObject)
    setConverted(true)
  }

  return (
    <>
      {!converted && (
        <button
          className={`${
            active ? '' : 'text-sky-900 pointer-events-none'
          } flex text-sm items-center gap-1 justify-center px-2 py-1 rounded hover:bg-sky-700 transition-all cursor-pointer`}
          onClick={handleConvert}
          {...rest}
        >
          <ArrowsClockwise weight="bold" size={20} />
          <span className="hidden sm:block">Converter</span>
        </button>
      )}
      {converted && (
        <div className="flex text-sm items-center gap-1 justify-center text-sky-900">
          <Check weight="bold" size={20} />
          <span className="hidden sm:block">Convertido</span>
        </div>
      )}
    </>
  )
}

export default ConvertButton
