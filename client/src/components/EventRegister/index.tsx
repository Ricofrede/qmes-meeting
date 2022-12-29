import { useState } from 'react'
import { addRegistration } from '../../firebase/functions'
import { CustomModal } from '..'
import './styles.scss'

interface EventRegisterProps {
	title?: string
}

export default function EventRegister({ title }: EventRegisterProps) {
	const [name, setName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [institute, setInstitute] = useState<string>('')
	const [dinner, setDinner] = useState<boolean>(false)
	const [hasPoster, setHasPoster] = useState<boolean>(false)
	const [subject, setSubject] = useState<string>('')
	const [description, setDescription] = useState<string>('')

	const [sending, setSending] = useState<boolean>(false)
	const [sendMsg, setSendMsg] = useState<string>('')

	async function handleSubmit(e: any) {
		e.preventDefault()

		if (!name || !email) return

		setSendMsg('Sending ...')
		setSending(true)

		const status = await addRegistration(
			name,
			email,
			dinner,
			institute,
			hasPoster,
			subject,
			description
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
		setDinner(false)
		setInstitute('')
		setHasPoster(false)
		setSubject('')
		setDescription('')
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
				className="event-register"
				onSubmit={handleSubmit}
			>
				{title ? <h2 className="event-register-title">{title}</h2> : <></>}
				<div className="mb-3">
					<label htmlFor="event-register-input-name" className="form-label">Name</label>
					<input
						type="text"
						className="form-control"
						id="event-register-input-name"
						required
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="event-register-input-email" className="form-label">E-mail</label>
					<input
						type="email"
						className="form-control"
						id="event-register-input-email"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="event-register-input-affiliation" className="form-label">Affiliation</label>
					<input
						type="text"
						className="form-control"
						id="event-register-input-affiliation"
						aria-describedby="affiliation-help"
						value={institute}
						onChange={(e) => setInstitute(e.target.value)}
					/>
					<div id="affiliation-help" className="form-text">Institute you are affiliated to.</div>
				</div>
				<div className="mb-3 form-check">
					<input
						type="checkbox"
						className="form-check-input"
						id="event-register-input-dinner"
						checked={dinner}
						onChange={(e) => setDinner(e.target.checked)}
					/>
					<label className="form-check-label" htmlFor="event-register-input-dinner">Opt in for paid dinner from the event?</label>
				</div>
				<div className="mb-3 form-check">
					<input
						type="checkbox"
						className="form-check-input"
						id="event-register-input-poster"
						checked={hasPoster}
						onChange={(e) => setHasPoster(e.target.checked)}
					/>
					<label className="form-check-label" htmlFor="event-register-input-poster">Would you like to put up a work's poster?</label>
				</div>
				<div className="mb-3">
					<label htmlFor="event-register-input-subject" className="form-label">Poster's Subject</label>
					<input
						type="text"
						className="form-control"
						id="event-register-input-subject"
						aria-describedby="affiliation-help"
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="event-register-input-description" className="form-label">Poster's Description</label>
					<textarea
						className="form-control"
						id="event-register-input-description"
						aria-describedby="affiliation-help"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<div className="row justify-content-center">
					<button type="submit" className="btn btn-primary">Submit</button>
				</div>
			</form>
		</>
	)
}
