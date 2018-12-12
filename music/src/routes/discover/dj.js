import React from 'react';

class Dj extends React.PureComponent{
  render(){
    return <React.Fragment>
      <h1>{this.props.match.path}</h1>
      </React.Fragment>
    
  }
}

export default Dj;
