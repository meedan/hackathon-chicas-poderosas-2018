import React, { Component, PropTypes } from 'react';

class Cards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: null // dbid
    };
  }

  viewCandidate(dbid) {
    this.setState({ current: dbid });
  }

  render() {
    var project = this.props.project;

    var cards = [];
    project.project_medias.edges.forEach((edge) => {
      var tasks = [];
      edge.node.tasks.edges.forEach((edge) => {
        var response = edge.node.first_response ? edge.node.first_response.content : '';
        if (response != '') {
          console.log(response);
          response = JSON.parse(response);
          if (response) {
            response = response[response.length - 1];
            response = response.formatted_value;
            if (!response) {
              response = response.value;
            }
          }
        }
        
        if (response === '' || !response) {
          response = '??';
        }

        response = response.replace(/ às.*/, '');

        var task = (<div className="task">
          <span>{response}</span>
          <div className="line"></div>
          <em>{edge.node.label}</em>
        </div>);
        tasks.push(task);
      });

      var name = edge.node.media.quote;
      if (edge.node.embed) {
        name = edge.node.embed.title;
      }
      var fname = name.split(' ')[0];

      var card = (<div className="candidate" onClick={this.viewCandidate.bind(this, edge.node.dbid)} style={{ display: edge.node.last_status === 'verified' ? 'block' : 'none' }}>
        <div className="avatar"></div>
        <div className="first-name">{fname}</div>
        <div className="name">{name.replace(fname + ' ', '')}</div>
        <div style={{ display: (this.state.current === edge.node.dbid ? 'flex' : 'none') }} className="modal">
          {tasks}
        </div>
      </div>);
      cards.push(card);
    });

    return (
      <div id="cards">
        <div>{cards}</div>
        { this.state.current ? <span className="close" onClick={this.viewCandidate.bind(this, null)}>X</span> : null }
      </div>
    );
  }
}

export default Cards;
