import React from 'react';
import ObjectListItem from './ObjectListItem';


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, query: '//System.User' };

    this.increment = this.increment.bind(this); //binding for callback
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this); //binding for callback
  }

  increment() {
    this.setState((prevState, props) => ({
      count: prevState.count + 1
    }));
  }

  handleQueryChange(event) {
    this.setState({
      query: event.target.value
    });
  }

  handleButtonClick() {
    console.log('P/ sending message to background')
    console.log(`[this.state.query] ${this.state.query}`)
    chrome.runtime.sendMessage({ greeting: "query", data: { query: this.state.query } }, function (response) {
      console.log('P/ message received by background');
    });
  }

  render() {
    var ObjectList = this.props.data ? this.props.data.map((object) => <ObjectListItem name={object.jsonData.objectType} guid={object._guid} />) : <div></div>
    return (
      <div>
        <h1 onClick={this.increment}>{this.props.name}</h1>
        <input type="text" value={this.state.query} onChange={this.handleQueryChange} />
        <button onClick={this.handleButtonClick}>Send Message</button>
        <div>
          {ObjectList}
        </div>
      </div>
    );
  }
}

module.exports = Header;