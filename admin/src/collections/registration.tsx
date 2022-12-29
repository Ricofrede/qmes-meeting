import {
	buildCollection,
	buildProperty,
	EntityReference
} from '@camberi/firecms';

type Registration = {
	name: string;
	dinner: boolean;
	institute: string
	email: string;
	hasPoster: boolean;
	subject: string;
	description: string;
}

const registrationCollection = buildCollection<Registration>({
	name: 'Registrations',
	singularName: 'Registration',
	path: 'registrations',
	inlineEditing: false,
	group: 'Main',
	defaultSize: "s",
	icon: 'EventSeat',
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
		dinner: buildProperty({
			name: 'With Dinner?',
			description: 'Has this person opted in for dinner?',
			dataType: 'boolean'
		}),
		institute: {
			name: 'Affiliated Institute',
			dataType: 'string',
		},
		email: {
			name: 'E-mail',
			validation: { required: true },
			dataType: 'string',
		},
		hasPoster: buildProperty({
			name: 'Put Up Poster?',
			description: 'Has this person opted in for putting up a work\'s poster?',
			dataType: 'boolean'
		}),
		subject: {
			name: 'Poster\'s Subject',
			dataType: 'string',
		},
		description: {
			name: 'Poster\'s Description',
			dataType: 'string',
			columnWidth: 300,
			multiline: true
		}
	}
});

export default registrationCollection