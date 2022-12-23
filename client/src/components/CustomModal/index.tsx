import './styles.scss'

interface SponsorFormProps {
    children: JSX.Element
    close: () => void
}

export default function CustomModal({ children, close }: SponsorFormProps) {
    function closeModal(e: any) {
        const target = e.target
        const modalContent = document.querySelector('.custom-modal-content')

        if (modalContent && !modalContent.contains(target)) {
            close?.()
        }
    }

    return (
        <div id="myModal" className="custom-modal" onClick={closeModal}>
            <div className="custom-modal-content">
                {children}
            </div>
        </div>
    )
}
