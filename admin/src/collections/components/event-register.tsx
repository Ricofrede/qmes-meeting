import { buildProperty } from "@camberi/firecms";

export const eventRegister = buildProperty({
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