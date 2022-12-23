import {
    buildCollection
} from "@camberi/firecms";

type Social = {
    name: string;
    iconClass: string;
    importance: number;
    url: string;
}

const socialCollection = buildCollection<Social>({
    name: "Social Links",
    singularName: "Social Link",
    path: "social",
    inlineEditing: false,
    group: 'Tools',
    defaultSize: "s",
    icon: 'Share',
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
        iconClass: {
            name: "Icon Class Code",
            dataType: "string"
        },
        url: {
            name: "URL",
            validation: { required: true },
            dataType: "string"
        },
        importance: {
            name: "Importance",
            description: "Importance level among other social links.",
            dataType: "number"
        }
    }
});

export default socialCollection