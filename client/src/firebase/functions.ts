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
import { ref, getDownloadURL } from 'firebase/storage'
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
	if (!imageObj?.id) return { title: '', caption: '', image: '' }

	const docRef = doc(db, 'images', imageObj.id)
	const docSnap = await getDoc(docRef)
	const info = docSnap.data()

	const imageUrl = await grabFileURLFromStorage(info?.image || null)

	return {
		title: info?.title || '',
		caption: info?.caption || '',
		image: imageUrl
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

export async function addSponsor(
	name: string,
	email: string,
	phone: string,
	gender: string,
	isZap: boolean,
	childId: string
) {
	const now = (new Date()).getTime()
	const newSponsorId = `${email}-${now}`

	const sponsorRef = doc(db, 'sponsors', newSponsorId)
	const childRef = doc(db, 'children', childId)

	await setDoc(sponsorRef, {
		name,
		phone,
		email,
		gender,
		isZap,
		status: false,
		child: childRef
	})
	await updateDoc(childRef, {
		sponsor: sponsorRef
	})

}