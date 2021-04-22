import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client/react";
import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache(),
});

const LAUNCHES = gql`
  query GetLaunches {
    launches(limit: 5) {
      launch_date_utc
      launch_success
      rocket {
        rocket_name
      }
      links {
        video_link
      }
      details
    }
  }
`;

const Launches = () => {
  const { loading, error, data } = useQuery(LAUNCHES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.launches.map((launch) => (
    <div className="card" key={launch}>
      <h3>{launch.launch_date_utc}</h3>
      <h3>{launch.rocket.rocket_name}</h3>
      <p>Was it a success : {launch.launch_success ? "yes" : "no"}</p>
      <p>{launch.details}</p>
    </div>
  ));
};

const App = () => {
  return (
    <div className="App">
      <h2>The 5 Launches</h2>
      <div className="launches">
        <Launches />
      </div>
    </div>
  );
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

reportWebVitals();
