export default function RedirectAdmin() {
    window.location.href = import.meta.env.VITE_ADMIN_URL
    return (
        <div>Redirecting to admin ...</div>
    )
}
