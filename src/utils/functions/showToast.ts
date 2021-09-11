import { toast } from 'react-toastify'
import i18next from 'i18next'

export const showToast = (message: string) => {
    toast.info(i18next.t(message), {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: false,
    })
}
