import React from 'react';


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 }; 
    
    this.increment = this.increment.bind(this); //binding for callback
    this.handleButtonClick = this.handleButtonClick.bind(this); //binding for callback
  }

increment() {
    this.setState((prevState, props) => ({
      count: prevState.count + 1
    }));
}
  
  handleButtonClick() {
    chrome.runtime.sendMessage({ greeting: "query" }, function (response) {
      console.log(response.farewell);
    });
  }  
  
    render() {
      return (
        <div>
          <h1 onClick={this.increment}> Hello, {this.props.name}, you've clicked {this.state.count} time
            {(this.state.count == 1 ? '' : 's')}
          </h1>
          <button onClick={this.handleButtonClick}>Send Message</button>
        </div>  
      );
    }
}

module.exports = Header;