
export { };
declare global {

    type httpHeader = { [key: string]: any }


    interface XMLHttpRequest {
        url?: string
        headers?: httpHeader
    }
}