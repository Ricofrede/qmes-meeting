import { useState, useEffect } from 'react'
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
	const [position, setPosition] = useState<string>('student')
	const [purpose, setPurpose] = useState<string>('listener')
	const [hasPoster, setHasPoster] = useState<boolean>(false)
	const [subject, setSubject] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [posterFile, setPosterFile] = useState<File | undefined>(undefined)

	const [sending, setSending] = useState<boolean>(false)
	const [sendMsg, setSendMsg] = useState<string>('')

	async function handleSubmit(e: any) {
		e.preventDefault()

		if (!name || !email) return
		if (hasPoster && (!subject || !description)) return

		setSendMsg('Sending ...')
		setSending(true)

		const status = await addRegistration(
			name,
			email,
			dinner,
			position,
			purpose,
			institute,
			hasPoster,
			subject,
			description,
			posterFile
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
		setPosition('')
		setInstitute('')
		setHasPoster(false)
		setSubject('')
		setDescription('')
		setSending(false)
	}

	useEffect(() => {
		if (purpose === 'poster') {
			setHasPoster(true)
		} else {
			setHasPoster(false)
			setSubject('')
			setDescription('')
		}
	}, [purpose])

	function renderPurposeConditionalFields() {
		switch (purpose) {
			case 'poster':
				return (
					<>
						<div className="mb-3">
							<label htmlFor="event-register-input-subject" className="form-label">Poster's Subject</label>
							<input
								type="text"
								className="form-control"
								id="event-register-input-subject"
								aria-describedby="affiliation-help"
								required
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
								required
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="event-register-input-file" className="form-label">Poster File</label>
							<input
								className="form-control"
								type="file"
								id="event-register-input-file"
								onChange={(e) => setPosterFile(e.target?.files?.[0])}
							/>
						</div>
					</>
				)
				break;
			case 'listener':
			case 'speaker':
			default:
				return <></>
				break;
		}
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
					<div id="dinner-help" className="form-text">This implies you'll be charged with a cost of R$ 50,00 for students and R$ 100,00 for professors.</div>
				</div>
				<div className="mb-3">
					<label className="form-check-label" htmlFor="event-register-input-position">Are you a student or professor?</label>
					<select
						className="form-select"
						id="event-register-input-position"
						value={position}
						onChange={(e) => setPosition(e.target.value)}
					>
						<option value="student">Student</option>
						<option value="professor">Professor</option>
					</select>
				</div>
				<div className="mb-3">
					<label className="form-check-label" htmlFor="event-register-input-purpose">For what purpose are you signing up for this meeting?</label>
					<select
						className="form-select"
						id="event-register-input-purpose"
						value={purpose}
						onChange={(e) => setPurpose(e.target.value)}
					>
						<option value="listener">Participant</option>
						<option value="speaker">Speaker</option>
						<option value="poster">Poster Submitter</option>
					</select>
				</div>
				{renderPurposeConditionalFields()}
				<div className="row justify-content-center">
					<button type="submit" className="btn btn-primary">Submit</button>
				</div>
			</form>
		</>
	)
}
