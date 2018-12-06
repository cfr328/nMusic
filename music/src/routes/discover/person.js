import React from 'react';

class Person extends React.PureComponent{
  render(){
    return 
      <h1>{this.props.match.path}</h1>
    
  }
}

export default Person;
