import { ApolloClient }   from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache }  from 'apollo-cache-inmemory'
import { ApolloLink }     from 'apollo-link';
import { setContext }     from "apollo-link-context";

// pusher.js
import Pusher     from "pusher-js";
import PusherLink from './pusher-link';

const pusherLink = new PusherLink({
    pusher: new Pusher('3425de46f785a0fe28be', {
        cluster:      'us2',
        authEndpoint: `http://localhost/graphql/subscriptions/auth`,
        // headers:      {
        //     authorization: Cookies.get('token') ? `Bearer ` + Cookies.get('token') : "",
        // }
    })
});

const authLink = setContext(async (_, {headers}) => {
    //const token = Cookies.get('token');
    return {
        headers: {
            ...headers,
            //authorization: Cookies.get('token') ? `Bearer ` + Cookies.get('token') : "",
        }
    }
});

export default new ApolloClient({
    // Provide the URL to the API server.
    link: ApolloLink.from([authLink, pusherLink, createHttpLink({uri: 'http://localhost/graphql'})]),

    // Using a cache for fast subsequent queries.
    cache: new InMemoryCache(),
});