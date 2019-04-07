import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";

import { withSlots } from "../index";

afterEach(cleanup);

test(`Adds valid slot components`, () => {
  const Component = withSlots([`Foo`, `Bar`], () => null);
  expect(React.isValidElement(<Component.Foo />)).toBeTruthy();
  expect(React.isValidElement(<Component.Bar />)).toBeTruthy();
});

test(`Passes null if slot is not filled`, () => {
  const Component = withSlots([`Foo`], ({ slotProps }) => {
    expect(slotProps.Foo).toBe(null);
    return null;
  });
  render(<Component />);
});

test(`Passes slot props`, () => {
  const props = { foo: `bar` };
  const Component = withSlots([`Baz`], ({ slotProps }) => {
    expect(slotProps.Baz).toEqual(props);
    return null;
  });
  render(
    <Component>
      <Component.Baz {...props} />
    </Component>
  );
});

test(`Passes slot children`, () => {
  const children = [`foo`, `bar`];
  const Component = withSlots([`Baz`], ({ slotProps }) => {
    expect(slotProps.Baz.children).toEqual(children);
    return null;
  });
  render(
    <Component>
      <Component.Baz>{children}</Component.Baz>
    </Component>
  );
});

test(`Passes normal children`, () => {
  const children = [`foo`, `bar`];
  const Component = withSlots([`Baz`], props => {
    expect(props.children).toEqual(children);
    return null;
  });
  render(
    <Component>
      <Component.Baz />
      {children}
    </Component>
  );
});

test(`Updates slot props correctly`, () => {
  expect.assertions(2);

  const firstProps = { foo: 1 };
  const secondProps = { foo: 2 };

  const Component = withSlots([`Bar`], ({ slotProps, expected }) => {
    expect(slotProps.Bar).toEqual(expected);
    return null;
  });

  const { rerender } = render(
    <Component expected={firstProps}>
      <Component.Bar {...firstProps} />
    </Component>
  );
  rerender(
    <Component expected={secondProps}>
      <Component.Bar {...secondProps} />
    </Component>
  );
});
