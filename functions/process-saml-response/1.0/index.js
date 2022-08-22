import base64 from 'Base64';
import convert from 'xml-js';

const processSamlResponse = async ({ request }) => {
  const samlResponse = base64.atob(
    decodeURIComponent(request.body.match(/SAMLResponse=(.*)/)[1]),
  );

  const converted = JSON.parse(
    convert.xml2json(samlResponse, {
      compact: true,
      elementNameFn: function (val) {
        return val.replace('samlp:', '');
      },
    }),
  );

  const nameID = converted.Response.Assertion.Subject.NameID._text;
  const givenName = fetchAttribute(
    converted.Response.Assertion.AttributeStatement,
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname',
  );

  const surName = fetchAttribute(
    converted.Response.Assertion.AttributeStatement,
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname',
  );

  return {
    response: converted,
    nameID,
    givenName,
    surName,
  };
};

const fetchAttribute = (samlAttributes, attributeName) => {
  if (!samlAttributes) {
    return '';
  }

  const attribute = samlAttributes.Attribute.filter(
    (item) => item._attributes.Name === attributeName,
  )[0];

  return attribute ? attribute.AttributeValue._text : '';
};

export default processSamlResponse;
