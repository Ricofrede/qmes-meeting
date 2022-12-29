import {
    buildCollection,
    buildProperty,
    EntityReference,
    CollectionSize
} from "@camberi/firecms";

type Contact = {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const contactsCollection = buildCollection<Contact>({
    name: "Contacts",
    singularName: "Contact",
    path: "contacts",
    customId: true,
    inlineEditing: false,
    group: 'Tools',
    defaultSize: "s",
    icon: 'Email',
    permissions: ({ authController }) => ({
        edit: true,
        create: true,
        delete: true
    }),
    properties: {
        name: {
            name: "Name",
            validation: { required: true },
            dataType: "string"
        },
        email: {
            name: "E-mail",
            validation: { required: true },
            dataType: "string"
        },
        subject: {
            name: "Subject",
            validation: { required: true },
            dataType: "string"
        },
        message: {
            name: "Message",
            validation: { required: true },
            dataType: "string",
            columnWidth: 300,
            multiline: true
        }
    }
});

export default contactsCollection