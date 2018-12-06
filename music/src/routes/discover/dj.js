import React from 'react';

class Dj extends React.PureComponent{
  render(){
    return 
      <h1>{this.props.match.path}</h1>
    
  }
}

export default Dj;
