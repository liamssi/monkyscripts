
type matchRule = {
    urlMatch: string | RegExp,
    bodyMatch?: string | RegExp
}

export class XMLHttpInterceptor {


    private patched: boolean = false
    private rule: matchRule




    private XMLHttpRequestOpen = XMLHttpRequest.prototype.open
    private XMLHttpRequestSend = XMLHttpRequest.prototype.send;
    private XMLHttpRequestsetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;


    constructor(rule: matchRule) {
        this.rule = rule
    }



    public get getPatched(): boolean {
        return this.patched
    }
    public get getsRule() {
        return this.rule
    }
    public set setRule(rule: matchRule) {

        this.rule = rule
    }


    // return a promise that resolves when the first match request found 
    public patch(matchCallback: (request?: XMLHttpRequest, unpatch?: () => void) => void = () => { }) {

        if (this.patched) {
            return
        }
        let targetUrlMatch = this.rule.urlMatch
        let bodyMatch = this.rule.bodyMatch || ''
        let XMLHttpRequestOpen = this.XMLHttpRequestOpen
        let XMLHttpRequestSend = this.XMLHttpRequestSend
        let XMLHttpRequestsetRequestHeader = this.XMLHttpRequestsetRequestHeader


        //* patch the open method to Capture 
        XMLHttpRequest.prototype.open = function (method: string, url: string, async?: boolean,): void {
            this.url = url;
            XMLHttpRequestOpen.call(this, method, url, async ? async : true);
        }

        //*patch setHeaders to capture Headers
        XMLHttpRequest.prototype.setRequestHeader = function (header: string, value: string) {


            XMLHttpRequestsetRequestHeader.call(this, header, value);
            // Create a list for the header that if it does not exist
            if (this.url?.match(targetUrlMatch)) {
                if (!this.headers) {
                    this.headers = {};
                }
                // Create a list for the header that if it does not exist

                //!tst 
                // if (!this.headers[header]) {
                //     this.headers[header] = [];
                // }

                // Add the value to the header
                //! this.headers[header].push(value);
                this.headers[header] = value;
            }


        };

        //* patch send to 
        XMLHttpRequest.prototype.send = function (body) {

            if (this.url?.match(targetUrlMatch) && body?.toString().match(bodyMatch)) {

                this.addEventListener(
                    "readystatechange", () => {
                        if (this.readyState == 4) {

                            matchCallback(this)

                        }

                    },

                    false
                );


            }

            XMLHttpRequestSend.call(this, body);
        };
        this.patched = true

    }


    //* unpatch function 
    public unpatch() {
        if (!this.patched) return
        XMLHttpRequest.prototype.open = this.XMLHttpRequestOpen;
        XMLHttpRequest.prototype.send = this.XMLHttpRequestSend;
        XMLHttpRequest.prototype.setRequestHeader = this.XMLHttpRequestsetRequestHeader;
        this.patched = false
    }


}