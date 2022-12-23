import './styles.scss'

import { CustomModal } from '../'
import { useState } from 'react';
import { addSponsor } from '../../firebase/functions'

interface SponsorFormProps {
    close: () => void
    childId: string
    childName: string
}

export default function SponsorForm({ close, childId, childName }: SponsorFormProps) {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [gender, setGender] = useState<string>('')
    const [isZap, setIsZap] = useState<boolean>(false)

    const [sending, setSending] = useState<boolean>(false)
    const [sendMsg, setSendMsg] = useState<string>('')

    async function handleSubmit(e: any) {
        e.preventDefault()

        if (!name || !phone || !email) return

        setSendMsg('Enviando')
        setSending(true)

        await addSponsor(
            name,
            email,
            phone,
            gender,
            isZap,
            childId
        )

        setSendMsg('Muito obrigado, em breve estaremos entrando em contato com você!')
    }

    function closeAll() {
        setSending(false)
        close()
    }

    return (
        <CustomModal close={close}>
            <>
                {sending ? (
                    <CustomModal close={close}>
                        <div className="sponsor-thanks-modal container" style={{ minHeight: '400px' }}>
                            <div className="row">
                                <h2>{sendMsg}</h2>
                            </div>
                            <div className="row justify-content-center">
                                <button onClick={closeAll} className="btn btn-secondary">Fechar</button>
                            </div>
                        </div>
                    </CustomModal>
                ) : <></>}
                <div className="row">
                    <h2 className="text-center">Obrigado por fazer o Natal de {childName} mais feliz!</h2>
                    <h5 className="text-center">Agora só precisamos saber um pouquinho mais sobre você!</h5>
                </div>
                <form onSubmit={handleSubmit} className="row sponsor-form">
                    <div className="mb-4 col-md-6">
                        <label className="form-label" htmlFor="sponsor-name">Nome</label>
                        <input
                            type="text"
                            id="sponsor-name"
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                        />
                    </div>

                    <div className="mb-4 col-md-6">
                        <label className="form-label" htmlFor="sponsor-email">E-mail</label>
                        <input
                            type="email"
                            id="sponsor-email"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>

                    <div className="mb-4 col-md-6">
                        <label className="form-label" htmlFor="sponsor-phone">Telefone</label>
                        <input
                            type="tel"
                            id="sponsor-phone"
                            className="form-control"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            required
                        />
                    </div>

                    <div className="mb-4 col-md-6">
                        <label className="form-label" htmlFor="sponsor-gender">Gênero</label>
                        <select
                            id="sponsor-gender"
                            className="form-select"
                            aria-label="Default select example"
                            onChange={(e) => setGender(e.target.value)}
                            value={gender}
                            required
                        >
                            <option value="male">Masculino</option>
                            <option value="female">Feminino</option>
                            <option value="">Prefiro não informar</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <input
                            className="form-check-input me-2"
                            type="checkbox"
                            id="sponsor-zap"
                            onChange={(e) => setIsZap(e.target.checked)}
                            checked={isZap}
                        />
                        <label className="form-check-label" htmlFor="sponsor-zap">
                            Podemos entrar em contato pelo Whatsapp?
                        </label>
                    </div>

                    <div className="row mb-4 justify-content-around">
                        <button onClick={close} type="button" className="btn btn-secondary mb-2 col-md-3 sponsor-btn__cancel" data-mdb-dismiss="modal">Cancelar</button>
                        <button type="submit" className="btn btn-primary mb-2 col-md-3 sponsor-btn__register">Cadastrar</button>
                    </div>
                </form>
            </>
        </CustomModal>
    )
}
