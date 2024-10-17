import { Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function AlertError(text: string) {
    return toast.error(text, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Slide,
    });
}

export function AlertSuccess(text: string) {
    return toast.success(text, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Slide,
    });
}

export function AlertInfo(text: string) {
    return toast.info(text, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Slide,
    });
}

export function AlertWarning(text: string) {
    return toast.warn(text, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Slide,
    });
}