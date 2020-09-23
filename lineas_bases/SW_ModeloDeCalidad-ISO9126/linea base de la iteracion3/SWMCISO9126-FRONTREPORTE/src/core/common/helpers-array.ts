export const _chunck = (arr: Array<any>, chunckSize: number): Array<Array<any>> => {
  const tmp = [...arr];
  let cache = [];
  while (tmp.length) {
    cache = cache.concat([tmp.splice(0, chunckSize)]);
  }

  return cache;
};

export const _sort = (arr: Array<any>, text: string): Array<any> => {
  const tmp = [...arr];
  if (!!text) {
    const atribute = text.split(' ')[0];
    const typeSort = text.split(' ')[1];

    return tmp.sort((a: any, b: any) => {

      if (typeof a[atribute] === 'string' && typeof b[atribute] === 'string') {
        if (typeSort === 'ASC') {
          return a[atribute].toLowerCase() > b[atribute].toLowerCase()
            ? 1 : (a[atribute].toLowerCase() === b[atribute].toLowerCase() ? 0 : -1);
        }

        return a[atribute].toLowerCase() > b[atribute].toLowerCase()
          ? -1 : (a[atribute].toLowerCase() === b[atribute].toLowerCase() ? 0 : 1);
      }
      if (typeSort === 'ASC') {
        return a[atribute] > b[atribute]
          ? 1 : (a[atribute] === b[atribute] ? 0 : -1);
      }

      return a[atribute] > b[atribute]
        ? -1 : (a[atribute] === b[atribute] ? 0 : 1);
    });
  }

  return tmp;
};

export const _deepCopy = (obj: any) => {
  const toString = Object.prototype.toString;
  let rv: any;

  switch (typeof obj) {
    case 'object':
      if (obj === null) {
        // null => null
        rv = null;
      } else {
        switch (toString.call(obj)) {
          case '[object Array]':
            // It's an array, create a new array with
            // deep copies of the entries
            rv = obj.map(_deepCopy);
            break;
          case '[object Date]':
            // Clone the date
            rv = new Date(obj);
            break;
          case '[object RegExp]':
            // Clone the RegExp
            rv = new RegExp(obj);
            break;
          // ...probably a few others
          default:
            // Some other kind of object, deep-copy its
            // properties into a new object
            rv = Object.keys(obj)
              .reduce((prev, key) => {
                prev[key] = _deepCopy(obj[key]);

                return prev;
              }, {});
            break;
        }
      }
      break;
    default:
      // It's a primitive, copy via assignment
      rv = obj;
      break;
  }

  return rv;
};

export const _getObjectIM = (obj: any): any => {
  return { ...obj };
};

export const _getArrayIM = (arr: Array<any>): Array<any> => {
  const newArr = [...arr.map(_getObjectIM)];

  return newArr;
};

export const _isSameValueArrayNumber = (arr1: Array<number> | null, arr2: Array<number> | null): boolean => {
  if ((arr1 === null && arr2 === null) || (arr1 === undefined && arr2 === undefined)) {
    return true;
  }

  if (arr1 !== null && arr1 !== undefined && arr2 !== null && arr2 !== undefined) {
    if (arr1.length !== arr2.length) {
      return false;
    }

    for (const a1 of arr1) {
      let buffer = false;
      for (const a2 of arr2) {
        if (a1 === a2) {
          buffer = true;
          break;
        }
      }
      if (!buffer) {
        return false;
      }
    }

    return true;
  }

  return false;
};
