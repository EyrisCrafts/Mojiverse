import toast from "react-hot-toast";

export function showSuccessToast(message: string) {
    toast.success(message, {
        style: {
        background: '#333',
        color: "#8D8D8D"
        }
    });
}
export function showErrorToast(message: string) {
    toast.error(message, {
        style: {
        background: '#333',
        color: "#8D8D8D"
        }
    });
}