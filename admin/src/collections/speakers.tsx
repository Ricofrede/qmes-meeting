import {
	buildCollection,
	buildProperty,
	EntityReference
} from '@camberi/firecms';

type Speaker = {
	name: string;
	description: string;
	image: EntityReference;
	importance: number;
}

const speakersCollection = buildCollection<Speaker>({
	name: 'Speakers',
	singularName: 'Speaker',
	path: 'speakers',
	inlineEditing: false,
	group: 'Main',
	defaultSize: "s",
	icon: 'RecordVoiceOver',
	permissions: ({ authController }) => ({
		edit: true,
		create: true,
		delete: true
	}),
	properties: {
		name: {
			name: 'Name',
			validation: { required: true },
			dataType: 'string'
		},
		description: {
			name: "Description",
			dataType: "string",
			columnWidth: 300,
			multiline: true
		},
		image: buildProperty({
			dataType: "reference",
			path: "images",
			name: "Main Image",
		}),
		importance: {
			name: "Importance",
			description: "Importance level among other speakers, for sorting order.",
			dataType: "number"
		}
	}
});

export default speakersCollection