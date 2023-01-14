import {
	collection,
	doc,
	getDoc,
	getDocs,
	where,
	query,
	setDoc,
	updateDoc
} from 'firebase/firestore/lite'
import { ref, getDownloadURL, getStorage, uploadBytes } from 'firebase/storage'
import emailjs from '@emailjs/browser'
import { db, storage } from './init'
export interface PageContent {
	type: string
	value: any
}

export interface Page {
	title?: string
	shortName: string
	intro?: string
	importance?: number
	status: 'private' | 'public'
	image?: ContentReference
	content: PageContent[]
	id: string
}

export interface Image {
	title: string
	caption: string
	image: string
	width: string;
	height: string;
}

export interface Social {
	name: string
	iconClass?: string
	importance?: number
	status: 'private' | 'public'
	url: string
}

export interface Speaker {
	id: string
	name: string
	description: string;
	image: ContentReference;
	importance: number;
}

export interface Registration {
	id: string
	name: string,
	email: string,
	dinner: boolean,
	position: string,
	purpose: string,
	institute: string,
	hasPoster: boolean,
	subject: string,
	description: string
}

export interface ContentReference {
	id: string
}

export async function getPages(): Promise<Page[]> {
	const col = collection(db, 'pages')
	const q = await query(col)
	const docs = await getDocs(q)
	const list = docs.docs.map(doc => ({ ...doc.data(), id: doc.id } as Page))

	return list.sort((a, b) => (b.importance || 0) - (a.importance || 0))
}

export async function getPage(id: string): Promise<Page> {
	const docRef = doc(db, 'pages', id)
	const docSnap = await getDoc(docRef)
	const info = { ...docSnap.data(), id: docSnap.id } as Page

	return info
}

export async function getImage(imageObj: ContentReference): Promise<Image> {
	if (!imageObj?.id) return { title: '', caption: '', image: '', width: '', height: '' }

	const docRef = doc(db, 'images', imageObj.id)
	const docSnap = await getDoc(docRef)
	const info = docSnap.data()

	const imageUrl = await grabFileURLFromStorage(info?.image || null)

	return {
		title: info?.title || '',
		caption: info?.caption || '',
		image: imageUrl,
		width: info?.width || '',
		height: info?.height || '',
	}
}

async function grabFileURLFromStorage(path: string | null): Promise<string> {
	if (!path) return ''

	const pathReference = ref(storage, path)
	const url = await getDownloadURL(pathReference)

	return url
}

export async function getSocials(): Promise<Social[]> {
	const col = collection(db, 'social')
	const q = await query(col)
	const docs = await getDocs(q)
	const list = docs.docs.map(doc => doc.data() as Social)

	return list.sort((a, b) => (b.importance || 0) - (a.importance || 0))
}

export async function getSpeakers(): Promise<Speaker[]> {
	const col = collection(db, 'speakers')
	const q = await query(col)
	const docs = await getDocs(q)
	const list = docs.docs.map(doc => ({ ...doc.data(), id: doc.id } as Speaker))

	return list.sort((a, b) => (b.importance || 0) - (a.importance || 0))
}

export async function getRegistration(id: string): Promise<Registration> {
	const docRef = doc(db, 'registrations', id)
	const docSnap = await getDoc(docRef)
	const info = { ...docSnap.data(), id: docSnap.id } as Registration

	return info
}

export async function addRegistration(
	name: string,
	email: string,
	dinner: boolean,
	accommodation: boolean,
	position: string,
	purpose: string,
	institute: string,
	hasPoster: boolean,
	subject: string,
	posterFile: File | undefined
) {
	const now = (new Date()).getTime()
	const newRegistrationsId = `${email}`

	const alreadyExists = await getRegistration(newRegistrationsId)

	if (alreadyExists && alreadyExists.email) {
		return 'This email has already been registered for the event!'
	}

	const registrationRef = doc(db, 'registrations', newRegistrationsId)

	const posterFileRef = await addFile(subject, posterFile)

	sendRegistrationConfirmationEmail(email)

	try {
		await setDoc(registrationRef, {
			name,
			dinner,
			accommodation,
			position,
			purpose,
			email,
			institute,
			hasPoster,
			subject,
			posterFile: posterFileRef
		})

		return 'Thank you for your registration!'
	} catch (e: any) {
		return `Something went wrong: "${e?.message || ''}"`
	}

}

export async function addFileUpload(
	file: File | undefined
) {
	const now = (new Date()).getTime()
	const newFileId = `files/${now}-${file?.name || ''}`

	const storage = getStorage()
	const storageRef = ref(storage, newFileId)

	const fileBuffer = await file?.arrayBuffer()
	if (!fileBuffer) return

	try {
		uploadBytes(storageRef, fileBuffer)
		return newFileId
	} catch (e: any) {
		return false
	}
}

export async function addFile(
	title: string,
	file: File | undefined
) {
	const now = (new Date()).getTime()
	const newFileId = `${now}-${file?.name}`

	const fileRef = doc(db, 'files', newFileId)

	const fileUploadPath = await addFileUpload(file)

	try {
		await setDoc(fileRef, {
			title,
			file: fileUploadPath || ''
		})

		return fileRef
	} catch (e: any) {
		return null
	}
}

export async function addContact(
	name: string,
	email: string,
	subject: string,
	message: string
) {
	const now = (new Date()).getTime()
	const newContactId = `${email}-${now}`

	const contactRef = doc(db, 'contacts', newContactId)

	try {
		await setDoc(contactRef, {
			name,
			email,
			subject,
			message
		})

		return 'You message has been sent, soon we\'ll be getting in touch!'
	} catch (e: any) {
		return `Something went wrong: "${e?.message || ''}"`
	}
}

function sendRegistrationConfirmationEmail(
	email: string
) {
	const templateParams = {
		to_mail: email
	};

	// Don't waste SMTP usage
	const env = import.meta.env.VITE_ENV
	if (env && env === 'dev') return

	const serviceId = import.meta.env.VITE_EJS_SERVICE_ID
	const templateId = import.meta.env.VITE_EJS_TEMPLATE_ID
	const userId = import.meta.env.VITE_EJS_USER_ID

	if (!serviceId || !templateId || !userId) return

	emailjs.send(
		serviceId,
		templateId,
		templateParams,
		userId
	)
		.then(function (response) {
			console.log('SUCCESS!', response.status, response.text);
		})
		.catch(e => console.log(e))
}