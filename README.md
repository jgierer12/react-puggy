# :slot_machine: Puggy

> A tiny library for named slots in React

## Installation

```sh
npm install react-puggy
```

> **Note**: Puggy requires React 16.8.0 or higher as a peer dependency.

## Usage

```js
import * as React from "react";
import { withSlots } from "react-puggy";

export const Layout = withSlots(
  [`Header`, `Footer`],
  ({ slotProps, children }) => {
    return (
      <>
        {slotProps.Header && <header>{slotProps.Header.children}</header>}
        <main>{children}</main>
        <footer>
          {slotProps.Footer ? slotProps.Footer.text : `Default footer`}
        </footer>
      </>
    );
  }
);

export const App = () => {
  return (
    <Layout>
      <Layout.Header>
        <h1>Example app</h1>
      </Layout.Header>
      <p>This is the page content.</p>
      <Layout.Footer text={`Custom footer`} />
    </Layout>
  );
};
```

## Examples

See [examples](https://github.com/jgierer12/react-puggy/tree/master/examples).

---

## License

[MIT](LICENSE)
