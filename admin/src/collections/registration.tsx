import {
	buildCollection,
	buildProperty,
	EntityReference
} from '@camberi/firecms';

type Registration = {
	name: string;
	dinner: boolean;
	position: string;
	purpose: string;
	institute: string
	email: string;
	hasPoster: boolean;
	subject: string;
	description: string;
	posterFile: EntityReference;
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
		position: buildProperty({
			name: 'Position',
			description: 'Student/Professor',
			dataType: 'string',
			enumValues: {
				student: "Student",
				professor: "Professor"
			}
		}),
		purpose: buildProperty({
			name: 'Purpose',
			description: 'If the registration is regarding a Listener, Speaker or Poster submitter.',
			dataType: 'string',
			enumValues: {
				listener: "Participant",
				speaker: "Speaker",
				poster: "Poster"
			}
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
		},
		posterFile: buildProperty({
			dataType: "reference",
			path: "files",
			name: "Poster File",
		})
	}
});

export default registrationCollection