import { buildProperty } from "@camberi/firecms";

export const carousel = buildProperty({
    dataType: "map",
    properties: {
        images: {
            dataType: "array",
            name: "Images",
            of: {
                dataType: "reference",
                path: "images"
            }
        }
    }
});