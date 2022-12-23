import {
	buildCollection,
	buildProperty,
	EntityReference
} from '@camberi/firecms';

type Registration = {
	name: string;
	gender: string;
	status: boolean;
	phone: string;
	email: string;
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
		gender: {
			name: 'Gender',
			dataType: 'string',
			enumValues: {
				male: 'Male',
				female: 'Female'
			}
		},
		status: buildProperty({
			name: 'Status',
			description: 'Has this person confirmed?',
			dataType: 'boolean'
		}),
		phone: {
			name: 'Phone number',
			validation: { required: true },
			dataType: 'string',
		},
		email: {
			name: 'E-mail',
			validation: { required: true },
			dataType: 'string',
		}
	}
});

export default registrationCollection