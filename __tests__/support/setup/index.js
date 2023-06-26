import generatePDF from '../generate-pdf';
import gql from '../gql';
import parseToGqlFragment from '../parse-to-gql-fragment';
import runAction from '../run-action';
import parseData from '../parse-data';

global.generatePDF = generatePDF;
global.gql = gql;
global.parseToGqlFragment = parseToGqlFragment;
global.runAction = runAction;
global.parseData = parseData;
