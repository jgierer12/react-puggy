import * as React from "react";
import { partition } from "./utils";

export const withSlots = (slots, Component) => {
  let defaultSlotProps = {};
  slots.forEach(slot => {
    defaultSlotProps[slot] = null;
  });

  const WrappedComponent = ({ children, ...props }) => {
    const [slotChildren, otherChildren] = React.useMemo(
      () =>
        partition(
          React.Children.toArray(children),
          child => !!(child.type && child.type.hasOwnProperty(`__slot`))
        ),
      [children]
    );

    const slotProps = React.useMemo(() => {
      const res = {};
      slotChildren.forEach(child => {
        res[child.type.__slot] = child.props;
      });
      return { ...defaultSlotProps, ...res };
    }, [slotChildren]);

    return (
      <Component {...props} slotProps={slotProps}>
        {otherChildren}
      </Component>
    );
  };

  slots.forEach(slot => {
    const Slot = () => null;
    WrappedComponent[slot] = Object.assign(Slot, {
      __slot: slot,
    });
  });

  return WrappedComponent;
};
