import {
    buildCollection,
    buildProperty,
    EntityReference,
    CollectionSize
} from "@camberi/firecms";

import {
    articleList,
    eventRegister,
    speakersList,
    contactForm
} from './components'

type Page = {
    title: string;
    shortName: string;
    importance: number;
    image: EntityReference;
    intro: string;
    content: string[];
}

const pagesCollection = buildCollection<Page>({
    name: "Pages",
    singularName: "Page",
    path: "pages",
    customId: true,
    inlineEditing: false,
    group: 'Main',
    defaultSize: "s",
    icon: 'Web',
    permissions: ({ authController }) => ({
        edit: true,
        create: true,
        delete: true
    }),
    properties: {
        title: {
            name: "Title",
            dataType: "string"
        },
        shortName: {
            name: "Short Name",
            description: "Name used to create the button text.",
            validation: { required: true },
            dataType: "string"
        },
        importance: {
            name: "Importance",
            description: "Importance level among other pages.",
            dataType: "number"
        },
        image: buildProperty({
            dataType: "reference",
            path: "images",
            name: "Main Image",
        }),
        intro: {
            name: "Introduction",
            description: "Brief introduction to the page.",
            dataType: "string",
            columnWidth: 300,
            multiline: true
        },
        content: buildProperty({
            name: "Content",
            dataType: "array",
            oneOf: {
                typeField: "type",
                valueField: "value",
                properties: {
                    image: buildProperty({
                        dataType: "reference",
                        path: "images",
                        name: "Image",
                    }),
                    text: {
                        dataType: "string",
                        name: "Text Body",
                        markdown: true
                    },
                    articleList: articleList,
                    eventRegister: eventRegister,
                    speakersList: speakersList,
                    contactForm: contactForm
                }
            }
        })
    }
});

export default pagesCollection