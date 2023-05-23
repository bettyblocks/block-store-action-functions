import generatePDF from '../generate-pdf';
import gql from '../gql';
import parseToGqlFragment from '../parse-to-gql-fragment';
import runAction from '../run-action';

global.generatePDF = generatePDF;
global.gql = gql;
global.parseToGqlFragment = parseToGqlFragment;
global.runAction = runAction;
