import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider, InMemoryCache, ApolloClient, HttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';

const errorLink = onError(({ graphqlErrors, networkError}) => {
  if (graphqlErrors) {
    graphqlErrors.map(({message, location, path}) => {
      alert(`Graphql error ${message}`)
    });
  }
});

const link = from ([
  errorLink,
  new HttpLink({ uri: "http://localhost:4000/graphql" }),
]);

const client =  new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})

ReactDOM.render(
  <ApolloProvider client = {client}>
    <App />,
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
