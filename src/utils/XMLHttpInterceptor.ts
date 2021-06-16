

type httpHeader = { [key: string]: string }
export class XMLHttpInterceptor extends XMLHttpRequest{


    private XMLHttpRequestOpen = XMLHttpRequest.prototype.open;
    private XMLHttpRequestSend = XMLHttpRequest.prototype.send;
    private XMLHttpRequestsetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
    private patched = false

    private headers: httpHeader[] = []
    //private url: string
    constructor() {
        super();
    }

    private saveHeader = (hedear: httpHeader) => {
        this.headers.push(hedear)
    }

    private flush = () => {

        this.headers = []
     //   this.url = ""
    }
    public patch = (targetUrl: string) => {



        //* patch the open method
        XMLHttpRequest.prototype.open = (method: string, url: string, async?: boolean,): void => {
            this.url = url;
            this.XMLHttpRequestOpen.call(this, method, url, async ? async : true);
        }
        //*patch set headers
        XMLHttpRequest.prototype.setRequestHeader = (header: string, value: string) => {
            // console.log("url from set header",header)
            // this.prototype.headers
            this.saveHeader({ header: value })
            this.XMLHttpRequestsetRequestHeader.call(this, header, value);
            // Create a list for the header that if it does not exist

            // Add the value to the header
            // this.headers[header].push(value);
        };

        //* patch send
        XMLHttpRequest.prototype.send = function (body) {

            if (
                this. url.match(targetUrl) &&
                body.match(
                    "fb_api_req_friendly_name=GroupsCometMembersPageNewMembersSectionRefetchQuery"
                )
            ) {
                
                this.addEventListener(
                    "readystatechange",
                    () => {
                        if (this.readyState == 4) {
                            // patchCallback(this.responseText)
                         //   spider(this.url, this.headers, body);
                        }
                    },
                    false
                );

              //  unpatch();
            }

            this.XMLHttpRequestSend.call(this, body);
        };





    }





}