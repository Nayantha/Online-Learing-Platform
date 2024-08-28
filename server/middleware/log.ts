// @ts-ignore
import {H3Event} from "h3";

export default defineEventHandler((event: H3Event<Request>) => {
    console.log('New request: ' + getRequestURL(event))
})
