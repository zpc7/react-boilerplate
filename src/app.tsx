
import React from "react";
import ReactDOM from "react-dom";
import Routes from './Routes/Routes'
import './app.less';

class App extends React.Component<{}, any> {
  state = {
    
  };


  render() {
    return (
      <Routes />
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
