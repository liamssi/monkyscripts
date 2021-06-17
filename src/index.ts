import { ui } from './ui/ui';
import './style.css'
import { XMLHttpInterceptor } from './utils/XMLHttpInterceptor';

import { graphqlClient } from './utils/facebookClient';

export let intercept = async () => {

    // let interceptor = new XMLHttpInterceptor({ urlMatch: "/graphql", })


    // console.log("intercepting ....");

    // let unpatch: any = interceptor.patch((request) => {

    //     console.log("patched ++****++>", request?.headers);

    // })




    setTimeout(async () => {
        //      interceptor.unpatch()
        let cl = new graphqlClient()
        let r = await cl.get('********* data ********')

        console.log("axios ---------->", r);

    }, 5000);




}