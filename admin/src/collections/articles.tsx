import {
    buildCollection,
    buildProperty,
    EntityReference,
    CollectionSize
} from "@camberi/firecms";

type Article = {
    title: string;
    image: EntityReference;
    intro: string;
    content: string[];
}

const articlesCollection = buildCollection<Article>({
    name: "Articles",
    singularName: "Article",
    path: "articles",
    customId: true,
    inlineEditing: false,
    group: 'Main',
    defaultSize: "s",
    icon: 'Article',
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
                    }
                }
            }
        })
    }
});

export default articlesCollection