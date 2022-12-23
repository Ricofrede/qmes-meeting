import { buildProperty } from "@camberi/firecms";

export const eventRegister = buildProperty({
    dataType: "map",
    properties: {
        title: {
            name: "Título",
            description: "Texto mostrado acima da lista de padrinhos.",
            validation: { required: true },
            dataType: "string"
        }
    }
});