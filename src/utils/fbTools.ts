import { JsxFlags } from 'typescript';
import { XMLHttpInterceptor } from './XMLHttpInterceptor';
export class fbPagePostExtractor {

    private cursor:string|undefined
    private httpRequestConfig:{
        url:string,
        headers?:httpHeader,
        body?: Document | BodyInit | null | undefined
    }|undefined


    private interceptor:XMLHttpInterceptor=new XMLHttpInterceptor({
        urlMatch:"/graphql",
        bodyMatch:"CometModernPageFeedPaginationQuery"
    })
    constructor(){
    }

    public start(){
        if(!this.httpRequestConfig){
            this.interceptor.patch((req)=>{
            console.log("found page feed request ...",req)

            
            this.interceptor.unpatch()
               //this.repeater(req,3)
                 //this.fetchPosts(req)
                 this.httpRequestConfig={
                    url:req.url||'',
                    headers:req.headers,
                    body:req.body
                 }
             this.fetchPosts()
            // this.parsePosts(req.responseText||"")
             
             })

        }
        
    }





    private parsePosts(res:any){
  




        let jres= JSON.parse(res)

        //  let r= getReference(jres,"text")
        let posts=jres.data.node.timeline_feed_units.edges
    //    console.log("parsing posts ::",posts[0]);
      //  console.log('r ---->',r);
        //! page info 
       //* data.page_info  .has_next_page
       //* data.page_info  .end_cursor

       for (let p in posts){
        let   post=posts[p].node

        if (post.__typename=="Story"){
            //console.log("it's a story");

           let content=post.comet_sections.content.story.comet_sections.message.story.message.text
           let metadata= post.comet_sections.context_layout.story.comet_sections.metadata[0].story
           let creationTime=metadata.creation_time
           let postUrl =metadata.url
           console.log("-------------new post ----------");
           
           console.log("post content ::: ",content );
           console.log("post date    ::: ",new Date(creationTime*
             1000));
           console.log("post link    ::: ", postUrl);
           
        }


       }
        
        // console.log("parsing posts ::",posts[0]);

        //*data = JRES.data.node.timeline_feed_units.
        


        //*next
        
        

    }
    private fetchPosts(cursor=this.cursor,count?:number){

        
        let headers=this.httpRequestConfig?.headers
        let url =this.httpRequestConfig?.url || "/graphql"
        let body=""
        let xhr = new XMLHttpRequest();

        if(this.httpRequestConfig?.body){
            body= changeCursor(this.httpRequestConfig?.body.toString(),this.cursor||'')

       }
        for (let header in headers) {
          xhr.setRequestHeader(header, headers[header]);
        //console.log(`header :: ${header} __ value ::${headers[header]}`);
        }
        //set load event
        xhr.onload = function () {
            if (xhr.status === 200) {
              //nextCursor = parse(this.responseText);
                
              let response =this.responseText

              //!parse and save 
              //! set next cursor
             //! fetch next?

              //console.log("db", db);
             // if (nextCursor && running) {
               // body = changeCursor(body, nextCursor);
               // spider(url, headers, body);
             // }
        
              //ready for next
            } else {
              console.log("reply errored");
            }
          };


        xhr.open("POST", url);


        xhr.send(body)
    
        
        //!replace/set cursor 
        




    }




public repeater(req:XMLHttpRequest,count=3){

    console.log('repeating ....');
    let i=0 ;
    while(i <count){
        req.open("Post",req.url||'')
        let res =req.send()
        console.log('repeaated ::: ',res);
        i++
    }
    }



    // public get(data?: Document | BodyInit | null | undefined): any {


    //     let xhr = new XMLHttpRequest();
    //     xhr.open("GET", "/graphql");
    //     xhr.send(data)
    //     return xhr
    // }
    // public post(data?: Document | BodyInit | null | undefined) {


    //     let xhr = new XMLHttpRequest();
    //     xhr.open("POST", "/graphql");
    //     xhr.send(data)
    //     return xhr
    // }



    // public getPagePosts=()=>{


        
    // }

    //   private client: AxiosInstance
    /*  constructor() {
  
      }*/
}


let changeCursor = (body:string, cursor:string) => {
    console.log("changing cursor to  ::", cursor);
    let params = new URLSearchParams(body)
    let variables=params.get("variables");

    if (variables){
        let jvariables = JSON.parse(variables);
        jvariables.cursor = cursor;
        variables = JSON.stringify(jvariables);
        params.set("variables", variables);
        body = params.toString();
        // console.log("body after ::", body);
        // console.log("cursor being chjanged", variables.cursor);
        
    }    
    return body;
  };