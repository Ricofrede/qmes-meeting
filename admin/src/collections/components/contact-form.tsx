import { buildProperty } from "@camberi/firecms";

export const contactForm = buildProperty({
    dataType: "map",
    properties: {
        title: {
            name: "Title",
            description: "Text shown above list",
            validation: { required: true },
            dataType: "string"
        }
    }
});