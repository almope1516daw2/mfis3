import User from "./components/User.js";
import AppHomeRoute from "./routes/AppHomeRoute";
import ReactDOM from "react-dom";
import Relay from "react-relay";
import React from "react";
import "../public/stylesheets/styles.css";

let userId = getQueryParams(document.location.search).user || "5919566ff1b0d6b303a7844b";

ReactDOM.render(

    <Relay.RootContainer
        Component={User}
        route={new AppHomeRoute({userId: userId})}
        renderLoading={function() {
            return <div>Loading...</div>;
        }}
    />
    ,document.getElementById('root')
);


function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}