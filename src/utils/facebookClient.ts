
export class graphqlClient {






    public get(data?: Document | BodyInit | null | undefined): any {


        let xhr = new XMLHttpRequest();
        xhr.open("GET", "/graphql");
        xhr.send(data)
        return xhr
    }
    public post(data?: Document | BodyInit | null | undefined) {


        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/graphql");
        xhr.send(data)
        return xhr
    }



    public getPagePosts=()=>{


        
    }

    //   private client: AxiosInstance
    /*  constructor() {
  
      }*/
}