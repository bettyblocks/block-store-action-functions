import JWT from '../../utils/jwt';

const validateJwt = async ({ token, secret }) => {
  const decodedJwt = JWT.fromSerialized(token);

  // Is token expired?
  const { isExpired } = decodedJwt;

  // Does token secret match signed secret?
  const tokenSignage = decodedJwt.signage;
  const newJwtForSecret = new JWT(decodedJwt.header, decodedJwt.payload);
  newJwtForSecret.sign(secret);
  const isCorrectSecret = newJwtForSecret.signage === tokenSignage;

  const isValidJwt = !isExpired && isCorrectSecret;

  return { isValidJwt };
};

export default validateJwt;
