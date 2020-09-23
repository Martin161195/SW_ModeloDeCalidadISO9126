export const coerceBooleanProp = (value: any): boolean => {
  return value !== null && value !== undefined && `${value}`.toLowerCase() !== 'false';
};

export const coerceStringProp = (value: any): boolean => {
  return value !== null && value !== undefined && typeof value === 'string' && value.length > 0;
};

export const isDefined = (value: any): boolean => {
  return value !== undefined && value !== null;
};

export const isObject = (value: any): boolean => {
  return typeof value === 'object' && isDefined(value);
};

export const isPromise = (value: any): boolean => {
  return value instanceof Promise;
};

export const isFunction = (value: any): boolean => {
  return value instanceof Function;
};

export const isValidDate = (date: any): boolean => {
  return (date instanceof Date) && !isNaN(date.getTime());
};

export const isEquivalent = (a: any, b: any): boolean => {
  if (!a || !b) {
    if (a === b) {
      return true;
    }

    return false;
  }

  // Create arrays of property names
  const aProps = Object.getOwnPropertyNames(a);
  const bProps = Object.getOwnPropertyNames(b);

  // If number of properties is different,
  // objects are not equivalent
  if (aProps.length !== bProps.length) {
    return false;
  }

  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < aProps.length; i++) {
    const propName = aProps[i];

    // If values of same property are not equal,
    // objects are not equivalent
    if (a[propName] !== b[propName]) {
      return false;
    }
  }

  // If we made it this far, objects
  // are considered equivalent
  return true;
};
