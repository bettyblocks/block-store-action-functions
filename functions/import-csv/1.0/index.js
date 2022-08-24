import { isObject, now } from "lodash";
import Papa from "papaparse";

async function getRecordsFromCSV(url) {
  const csvText = await fetch(url).then((response) => response.text());
  const parsedCSV = Papa.parse(csvText, { skipEmptyLines: true, header: true });
  return parsedCSV.data;
}

function snakeToCamel(str) {
  str = str.replace(/_[0-9]/g, (m, chr) => "!" + m);
  str = str.replace(/[^a-zA-Z0-9!]+(.)/g, (m, chr) => chr.toUpperCase());
  return str.replace(/[!]/g, "_");
}

const runGQL = async (gqlQuery, input) => {
  let response = {};
  try {
    response = await gql(gqlQuery, {
      input: input,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
  return response;
};

const getAllRecords = async (gqlQuery, skip, take, results) => {
  const gqlResponse = await gql(gqlQuery, {
    skip: skip,
    take: take,
  });
  if (gqlResponse) {
    const gqlQueryObject = Object.values(gqlResponse)[0];
    const tmpResults = Object.values(gqlQueryObject)[0];
    skip += take;
    if (tmpResults.results.length) {
      const newResults = [...results, ...tmpResults.results];
      results = newResults;
      if (skip <= tmpResults.totalCount) {
        results = await getAllRecords(gqlQuery, skip, take, results);
      }
    }
    return results;
  } else {
    return {};
  }
};

const processRecords = async (
  importRecords,
  existingRecords,
  uniqueRecordColumnName,
  deduplicate,
  propertyMappings,
  uniqueRecordIdentifier
) => {
  const newRecords = [];
  const updatedRecords = [];

  importRecords.forEach((importRecord) => {
    const importObj = {};
    if (propertyMappings.length > 0) {
      propertyMappings.forEach((mapping) => {
        importObj[mapping.value] = importRecord[mapping.key];
      });

      if (deduplicate) {
        if (importRecord[uniqueRecordColumnName] !== "") {
          const existingRecord = existingRecords.find(
            (record) =>
              record[uniqueRecordIdentifier.value].toString() ===
              importRecord[uniqueRecordIdentifier.key]
          );

          if (existingRecord) {
            importObj.id = existingRecord.id;
            updatedRecords.push(importObj);
          } else {
            newRecords.push(importObj);
          }
        } else return false;
      } else {
        newRecords.push(importObj);
      }
    }
  });

  return { updatedRecords: updatedRecords, newRecords: newRecords };
};

const importCsv = async ({
  url,
  model: { name: modelName },
  uniqueRecordColumnName,
  deduplicate,
  propertyMappings,
  logging,
}) => {
  var regEx = /(?:\.([^.]+))?$/;
  const fileExt = regEx.exec(url)[1];

  if (fileExt !== "csv") {
    const errorMessage = "File extention should be .csv";
    console.log(errorMessage);
    throw new Error(errorMessage);
  }

  const startTime = now();
  propertyMappings.forEach((mapping) => {
    mapping.value = snakeToCamel(mapping.value);
  });

  const propertiesDBNames = propertyMappings.map((item) => item.value);

  let uniqueRecordIdentifier = undefined;

  if (deduplicate && uniqueRecordColumnName !== "") {
    uniqueRecordIdentifier = propertyMappings.find(
      (item) =>
        item.key.toString().toLowerCase().trim() ===
        uniqueRecordColumnName.toString().toLowerCase().trim()
    );

    if (uniqueRecordIdentifier === undefined) {
      const errorMessage =
        "No unique record identifier can be found in the mappings. Make sure you add the CSV column and property database name (in snake_case) in the mappings above!";
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  }

  const gqlQuery = `{
    all${modelName}(skip: $skip, take: $take) {
      results {
          id
        ${propertiesDBNames.join(" ")}
      }, 
      totalCount
    }
  }`;
  let allCurrentRecords = [];
  if (deduplicate)
    allCurrentRecords = await getAllRecords(gqlQuery, 0, 200, []);
  if (logging)
    console.log(`Current records in the database: ${allCurrentRecords.length}`);

  const importRecords = await getRecordsFromCSV(url);
  if (logging)
    console.log(`Number of records to import: ${importRecords.length}`);

  const processedRecords = await processRecords(
    importRecords,
    allCurrentRecords,
    uniqueRecordColumnName,
    deduplicate,
    propertyMappings,
    uniqueRecordIdentifier
  );

  const { newRecords } = processedRecords;
  const { updatedRecords } = processedRecords;

  const returnObj = {};

  if (newRecords.length > 0) {
    const createRecords = `
      mutation {
        createMany${modelName}(input: $input) {
          id
        }
      }
    `;

    const sanitizedNewRecords = newRecords.map((record) => {
      // The createMany mutation does not accept an ID property to be passed
      delete record.id;
      return record;
    });
    const newRecordsResponse = await runGQL(createRecords, sanitizedNewRecords);
    if (logging) {
      console.log(
        `Number of new records created: ${sanitizedNewRecords.length}`
      );
    }
  }

  if (updatedRecords.length > 0) {
    const updateQuery = `
      mutation {
        upsertMany${modelName}(input: $input) {
          id
        }
      }
    `;
    const updatedRecordsResponse = await runGQL(updateQuery, updatedRecords);
    if (logging) {
      console.log(`Number of updated records: ${updatedRecords.length}`);
    }
  }

  if (logging) console.log(`Time taken:  ${now() - startTime}`);

  return returnObj;
};

export default importCsv;
