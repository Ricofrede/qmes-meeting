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
	name?: string
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

export interface Child {
	id: string
	name: string
	gender?: string
	picture?: ContentReference
	intro?: string
	sponsor?: string
}

export interface Sponsor {
	id: string
	name: string
	gender?: string
	status: boolean
	phone?: string;
	isZap: boolean;
	email?: string;
	child: ContentReference
}

export interface ContentReference {
	id: string
}

export async function getPages(): Promise<Page[]> {
	const col = collection(db, 'pages')
	const q = await query(col, where('status', '==', 'public'))
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
	const q = await query(col, where('status', '==', 'public'))
	const docs = await getDocs(q)
	const list = docs.docs.map(doc => doc.data() as Social)

	return list.sort((a, b) => (b.importance || 0) - (a.importance || 0))
}

export async function getChildren(): Promise<Child[]> {
	const col = collection(db, 'children')
	const q = await query(col)
	const docs = await getDocs(q)
	const list = docs.docs.map(doc => ({ ...doc.data(), id: doc.id } as Child))

	return list//.sort((() => Math.random() - 0.5))
}

export async function getChild(
	childObj: ContentReference
): Promise<Child> {
	const docRef = doc(db, 'children', childObj?.id)
	const docSnap = await getDoc(docRef)
	const info = { ...docSnap.data(), id: docSnap.id } as Child

	return info
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

export async function findSponsor(
	search: string
): Promise<Sponsor[]> {
	const isEmail = search.indexOf('@') > -1

	const col = collection(db, 'sponsors')

	const q1 = await query(col, where('email', '==', search))
	const q2 = await query(col, where('phone', '==', search))

	const docs = await getDocs(isEmail ? q1 : q2)

	const list = docs.docs.map(doc => ({ ...doc.data(), id: doc.id } as Sponsor))

	return list
}