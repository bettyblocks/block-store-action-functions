const sortObject = (obj) => {
  if (!obj) {
    return {};
  }

  const sorted = Object.keys(obj)
    .sort()
    .reduce(
      (acc, key) => ({
        ...acc,
        [key]: obj[key],
      }),
      {},
    );

  return sorted;
};

const trackChanges = async ({ before, after }) => {
  try {
    if (!before) {
      before = { data: {} };
    } else if (!before.data) {
      before.data = {};
    }

    if (!after) {
      after = { data: {} };
    } else if (!after.data) {
      after.data = {};
    }

    const beforeData = sortObject(before.data);
    const afterData = sortObject(after.data);
    let result = [];
    let index = 0;
    let data;
    Object.keys(afterData).length > 0
      ? (data = afterData)
      : Object.keys(beforeData).length > 0
        ? (data = beforeData)
        : (data = {});

    // This function creates an object and puts it in an array, which will become a log in the app
    function createObject(key, oldCheckBox = '', newCheckBox = '') {
      const obj = {
        id: index,
        label: key,
        oldValue: beforeData[key]
          ? String(beforeData[key]) === '[object Object]'
            ? String(parseObject(beforeData[key]))
            : String(beforeData[key])
          : oldCheckBox
            ? oldCheckBox
            : '',
        newValue: afterData[key]
          ? String(afterData[key]) === '[object Object]'
            ? String(parseObject(afterData[key]))
            : String(afterData[key])
          : newCheckBox
            ? newCheckBox
            : '',
      };
      result.push(obj);
      index = index + 1;
    }

    // This function is used in createObject function to parse an string to object
    function parseObject(object) {
      let string = JSON.stringify(object),
        parse = JSON.parse(string);

      return parse.id;
    }

    for (const key in data) {
      // If the data is a property or a object
      if (
        beforeData[key] !== afterData[key] &&
        !Array.isArray(afterData[key]) &&
        !Array.isArray(beforeData[key])
      ) {
        // If the data is an object
        if (String(beforeData[key]) === '[object Object]') {
          let string = JSON.stringify(beforeData[key]),
            parse = JSON.parse(string),
            after_id = afterData[key] ? JSON.stringify(afterData[key]) : '';

          if (Number(parse.id) !== Number(after_id)) {
            if (!afterData[key]) {
              if (parse.id) {
                createObject(key);
              }
            } else {
              createObject(key);
            }
          }
        }
        // If property is a checkbox
        else if (
          String(beforeData[key]) === 'true' ||
          String(afterData[key]) === 'true'
        ) {
          if (String(beforeData[key]) != String(afterData[key])) {
            if (String(beforeData[key]) !== 'true') {
              createObject(key, 'false', 'true');
            } else if (String(afterData[key]) !== 'true') {
              createObject(key, 'true', 'false');
            }
          }
        }
        // Else if the after data is not available, but the before data is
        else if (!afterData[key]) {
          if (beforeData[key]) {
            createObject(key);
          }
        } else {
          createObject(key);
        }
      }
      // If the data contains a "has many" relation
      else if (
        beforeData[key] !== afterData[key] &&
        (Array.isArray(afterData[key]) || Array.isArray(beforeData[key]))
      ) {
        let stringBeforeData = JSON.stringify(beforeData[key]),
          parseBeforeData = stringBeforeData
            ? JSON.parse(stringBeforeData)
            : '',
          stringAfterData = JSON.stringify(afterData[key]),
          parseAfterData = stringAfterData ? JSON.parse(stringAfterData) : '',
          getIdOld =
            parseBeforeData !== ''
              ? parseBeforeData.map((item) => item.id)
              : '',
          getIdNew =
            parseAfterData !== '' ? parseAfterData.map((item) => item.id) : '';

        if (getIdOld !== getIdNew) {
          const obj = {
            id: index,
            label: key,
            oldValue: getIdOld ? getIdOld.toString() : '',
            newValue: getIdNew ? getIdNew.toString() : '',
          };
          result.push(obj);
          index = index + 1;
        }
      } else if (key === 'insurerName') {
        createObject(key);
      }
    }

    result.length > 0 && result
      ? (result = JSON.stringify(result))
      : (result = null);
    return { result };
  } catch (error) {
    console.error('Error when tracking changes', error);
    throw new Error(error);
  }
};

export default trackChanges;
