import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import AboutRoute from './AboutRoute';
import ProjectRoute from './ProjectRoute';
import config from '../config/config.js';
import Cards from '../components/Cards';

const CardsContainer = Relay.createContainer(Cards, {
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        id,
        dbid,
        title,
        description,
        permissions,
        search_id,
        project_medias(first: 10000) {
          edges {
            node {
              id
              dbid
              embed
              last_status
              tasks(first: 10000) {
                edges {
                  node {
                    id,
                    dbid,
                    label,
                    type,
                    first_response {
                      id,
                      dbid,
                      content,
                    }
                  }
                }
              }
              media {
                quote
              }
            }
          }
        }
        team {
          id,
          dbid,
          slug,
          search_id,
        }
      }
    `
  }
});

class CardsRelay extends Component {
  setUpGraphql() {
    Relay.injectNetworkLayer(new Relay.DefaultNetworkLayer(config.relayPath, { headers: config.relayHeaders }));
  }
  
  render() {
    const route = new ProjectRoute({ contextId: 1210 });
    this.setUpGraphql();
    return (<Relay.RootContainer Component={CardsContainer} route={route} />);
  }
}

export default CardsRelay;
