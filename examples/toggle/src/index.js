import React from "react";
import ReactDOM from "react-dom";
import { withSlots } from "react-puggy";

const Toggle = withSlots(
  [`On`, `Off`, `Button`],
  ({ slotProps: { On, Off, Button }, children }) => {
    const [on, setOn] = React.useState(false);
    const toggle = () => {
      setOn(prevOn => !prevOn);
    };

    return (
      <>
        {on ? On && On.children : Off && Off.children}
        {Button && Button.children(toggle)}
        {children}
      </>
    );
  }
);

const App = () => (
  <Toggle>
    <Toggle.On>
      <div style={{ color: `green` }}>ON</div>
    </Toggle.On>
    <Toggle.Off>
      <div style={{ color: `red` }}>OFF</div>
    </Toggle.Off>
    <Toggle.Button>
      {toggle => <button onClick={toggle}>Toggle</button>}
    </Toggle.Button>
  </Toggle>
);

ReactDOM.render(<App />, document.getElementById(`root`));
