import { useState } from 'react'
import { addContact } from '../../firebase/functions'
import { CustomModal } from '..'
import './styles.scss'

interface EventRegisterProps {
	title?: string
}

export default function ContactForm({ title }: EventRegisterProps) {
	const [name, setName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [subject, setSubject] = useState<string>('')
	const [message, setMessage] = useState<string>('')

	const [sending, setSending] = useState<boolean>(false)
	const [sendMsg, setSendMsg] = useState<string>('')

	async function handleSubmit(e: any) {
		e.preventDefault()

		if (!name || !email) return

		setSendMsg('Sending ...')
		setSending(true)

		const status = await addContact(
			name,
			email,
			subject,
			message
		)

		if (status) {
			setSendMsg(status)
		} else {
			setSendMsg('Something went wrong, please try again')
		}

	}

	function cleanForm() {
		setName('')
		setEmail('')
		setSubject('')
		setMessage('')
		setSending(false)
	}

	return (
		<>
			{sending ? (
				<CustomModal close={cleanForm}>
					<div className="container">
						<div className="row">
							<h2
								style={{
									width: 'max-content',
									display: 'inline',
									margin: '20px auto'
								}}
							>{sendMsg}</h2>
						</div>
						<div className="row justify-content-center">
							<button onClick={cleanForm} className="btn btn-secondary">Close</button>
						</div>
					</div>
				</CustomModal>
			) : <></>}
			<form
				className="contact-form"
				onSubmit={handleSubmit}
			>
				{title ? <h2 className="contact-form-title">{title}</h2> : <></>}
				<div className="mb-3">
					<label htmlFor="contact-form-input-name" className="form-label">Name</label>
					<input
						type="text"
						className="form-control"
						id="contact-form-input-name"
						required
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="contact-form-input-email" className="form-label">E-mail</label>
					<input
						type="email"
						className="form-control"
						id="contact-form-input-email"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="contact-form-input-subject" className="form-label">Subject</label>
					<input
						type="text"
						className="form-control"
						id="contact-form-input-subject"
						required
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="contact-form-input-message" className="form-label">Message</label>
					<textarea
						className="form-control"
						id="contact-form-input-message"
						required
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
				</div>
				<div className="row justify-content-center">
					<button type="submit" className="btn btn-primary">Submit</button>
				</div>
			</form>
		</>
	)
}
