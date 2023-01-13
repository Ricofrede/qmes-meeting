import {
    buildCollection,
    buildProperty,
} from "@camberi/firecms";

type File = {
    title: string;
    file: string;
}

const filesCollection = buildCollection<File>({
    name: "Files",
    singularName: "File",
    path: "files",
    inlineEditing: false,
    group: 'Tools',
    defaultSize: "s",
    icon: 'AttachFile',
    permissions: ({ authController }) => ({
        edit: true,
        create: true,
        delete: true
    }),
    properties: {
        title: {
            name: "Title",
            validation: { required: true },
            dataType: "string"
        },
        file: buildProperty({ // The `buildProperty` method is a utility function used for type checking
            name: "File",
            validation: { required: true },
            dataType: "string",
            storage: {
                storagePath: "files",
                acceptedFiles: ["*"]
            }
        })
    }
});

export default filesCollection