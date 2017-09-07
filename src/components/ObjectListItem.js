import React from 'react';


class ObjectListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    // this.increment = this.increment.bind(this); //binding for callback
    // this.handleQueryChange = this.handleQueryChange.bind(this);
    // this.handleButtonClick = this.handleButtonClick.bind(this); //binding for callback
  }

  // increment() {
  //   this.setState((prevState, props) => ({
  //     count: prevState.count + 1
  //   }));
  // }

  // handleQueryChange(event) {
  //   this.setState({
  //     query: event.target.value
  //   });
  // }

  // handleButtonClick() {
  //   console.log('P/ sending message to background')
  //   console.log(`[this.state.query] ${this.state.query}`)
  //   chrome.runtime.sendMessage({ greeting: "query", data: { query: this.state.query } }, function (response) {
  //     console.log('P/ message received by background');
  //   });
  // }

  render() {
    // var ObjectList = this.props.data.map((object) => <li>{object._guid}</li>)
    return (
      <div>
        {this.props.name} - {this.props.guid}
      </div>
    );
  }
}

module.exports = ObjectListItem;