import { useAuthContext } from '@context/AuthContext'
import { useZendeskContext } from '@context/ZendeskContext'
import { LockOpen, Lock, X } from 'phosphor-react'
import { useMemo, useState } from 'react'

export interface EasyDeleteProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const EasyDelete = ({ ...rest }: EasyDeleteProps) => {
  const { easyDelete, setEasyDelete } = useZendeskContext()
  const { loggedAccount } = useAuthContext()

  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const [popupText, setPopupText] = useState('')

  const handleClosePopup = () => {
    setPopupText('')
    setIsOpenPopup(false)
  }

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    if (popupText.replace(/(^\w+:|^)\/\//, '') === loggedAccount?.domain) {
      setEasyDelete(true)
    }
    handleClosePopup()
  }

  const handleEasyDelete = () => {
    if (easyDelete) {
      setEasyDelete(false)
    } else {
      setIsOpenPopup(true)
    }
  }

  const inputColor = useMemo(() => {
    if (!popupText) return 'bg-sky-50'
    return popupText.replace(/(^\w+:|^)\/\//, '') === loggedAccount?.domain
      ? 'bg-green-50'
      : 'bg-red-50'
  }, [popupText, loggedAccount?.domain])

  return (
    <div className="relative flex items-start justify-center ">
      {isOpenPopup && (
        <>
          <div
            onClick={handleClosePopup}
            className="fixed top-0 left-0 bg-slate-900 opacity-20 h-screen w-screen"
          ></div>
          <div className="bg-white p-2 text-sm border border-slate-300 rounded bottom-10 z-10 absolute shadow-lg text-slate-900">
            <div className="relative">
              <X
                onClick={handleClosePopup}
                className="absolute right-0 cursor-pointer transition-all hover:text-sky-800"
              />
              <form onSubmit={(ev) => handleSubmit(ev)}>
                <label>Confirme o Domínio:</label>
                <input
                  value={popupText}
                  onChange={(ev) => setPopupText(ev.target.value)}
                  className={`${inputColor} + text-center p-1 mt-1 rounded border border-slate-500`}
                  type="text"
                />
              </form>
            </div>
          </div>
        </>
      )}
      <div
        className="cursor-pointer p-1 rounded transition-all hover:bg-sky-700"
        onClick={handleEasyDelete}
        {...rest}
      >
        {easyDelete ? (
          <LockOpen weight="bold" size={20} />
        ) : (
          <Lock weight="bold" size={20} />
        )}
      </div>
    </div>
  )
}

export default EasyDelete
