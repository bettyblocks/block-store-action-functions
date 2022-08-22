const stringifyJwtToken = async ({ jwtToken }) => {
  return {
    jwt: JSON.stringify({
      isValid: true,
      jwtToken: jwtToken.jwtToken,
      refreshToken: jwtToken.refreshToken,
    }),
  };
};

export default stringifyJwtToken;
