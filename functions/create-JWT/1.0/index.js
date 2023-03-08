import JWT from '../../utils/JWT';

const createJWT = async ({ userName, expiresIn, secret }) => {
  const jwt = new JWT();
  jwt.payload = { userName };
  jwt.expiresIn = expiresIn;
  jwt.sign(secret);

  return { JWT: jwt.serialized };
};

export default createJWT;
