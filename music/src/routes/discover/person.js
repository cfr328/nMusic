import React from 'react';

class Person extends React.PureComponent{
  render(){
    return <React.Fragment>
        <h1>{this.props.match.path}</h1>
      </React.Fragment>
    
  }
}

export default Person;
