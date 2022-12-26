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
        edit: true,
        create: false,
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