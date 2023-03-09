import JWT from '../../utils/JWT';

const createJWT = async ({ payloadVariables, expiresIn, secret }) => {
  const payload = {};
  payloadVariables.forEach((item) => {
    payload[item.key] = item.value;
  });
  const jwt = new JWT();
  jwt.payload = payload;
  jwt.expiresIn = expiresIn;
  jwt.sign(secret);

  return { JWT: jwt.serialized };
};

export default createJWT;
