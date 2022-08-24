const redirect = async ({ redirectURL }) => {
  return {
    response: {
      body: 'Redirect',
      statusCode: 302,
      headers: [['Location', redirectURL]],
    },
  };
};

export default redirect;
