import React from 'react';

class Index extends React.PureComponent{
  render(){
    return <h1>{this.props.match.path}</h1>
  }
}

export default Index;
