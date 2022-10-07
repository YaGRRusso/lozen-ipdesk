import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Toast = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={1200}
      closeOnClick
      pauseOnFocusLoss
      pauseOnHover
    />
  )
}

export default Toast
