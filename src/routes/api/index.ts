import { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = ({json}) => {
    json(200,{
        message: "Oke"
    })
 };
