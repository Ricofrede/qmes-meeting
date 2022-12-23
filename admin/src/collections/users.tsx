import {
    buildCollection
} from "@camberi/firecms";

type User = {
    name: string;
    admin: boolean;
}

const usersCollection = buildCollection<User>({
    name: "Users",
    singularName: "User",
    path: "users",
    inlineEditing: false,
    group: 'Tools',
    customId: true,
    defaultSize: "s",
    icon: 'Badge',
    permissions: ({ authController }) => ({
        edit: false,
        create: true,
        delete: false
    }),
    properties: {
        name: {
            name: "Name",
            validation: { required: true },
            dataType: "string"
        },
        admin: {
            name: "Admin?",
            dataType: "boolean"
        }
    }
});

export default usersCollection