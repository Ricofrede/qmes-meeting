import {
    buildCollection,
    buildProperty,
} from "@camberi/firecms";

type Image = {
    title: string;
    caption: string;
    image: string;
}

const imagesCollection = buildCollection<Image>({
    name: "Images",
    singularName: "Image",
    path: "images",
    inlineEditing: false,
    group: 'Tools',
    defaultSize: "s",
    icon: 'Photo',
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
        caption: {
            name: "Caption",
            dataType: "string"
        },
        image: buildProperty({ // The `buildProperty` method is a utility function used for type checking
            name: "Image",
            validation: { required: true },
            dataType: "string",
            storage: {
                storagePath: "images",
                acceptedFiles: ["image/*"]
            }
        })
    }
});

export default imagesCollection