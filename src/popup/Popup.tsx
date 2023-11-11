import ReactDOM from "react-dom";

const Popup = () => {
  return (
    <div>
      <h1>Chrome Extension Popup</h1>
      <p>This is the popup content.</p>
    </div>
  );
};

ReactDOM.render(<Popup />, document.getElementById("root"));
