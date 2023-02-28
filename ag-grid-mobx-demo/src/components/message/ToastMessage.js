import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function ToastMessage(message, type) {
    if (type === 'success') {
        toast.success(message, { theme: 'colored' })
    } else if (type === 'error') {
        toast.error(message, { theme: 'colored' })
    } else if (type === 'warning') {
        toast.warning(message, { theme: 'colored' })
    } else if (type === 'info') {
        toast.info(message, { theme: 'colored' })
    } else {
        toast(message)
    }
}
