import React from 'react';


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 }; 
    
    this.increment = this.increment.bind(this); //binding for callback
  }

increment() {
    this.setState((prevState, props) => ({
      count: prevState.count + 1
    }));
  }
  
    render() {
      return (
        <h1 onClick={this.increment}> Hello, {this.props.name}, you've clicked {this.state.count} time
          {(this.state.count == 1 ? '' : 's')}
        </h1>
      );
    }
}

module.exports = Header;