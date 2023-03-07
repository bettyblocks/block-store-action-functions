import JWT from '../../utils/JWT';

const createJWT = async (userName, expiresIn, secret) => {
  console.log('createJWT secret', secret);
  const jwt = new JWT();
  jwt.payload = { userName };
  jwt.expiresIn = expiresIn;
  jwt.sign(secret);

  return jwt.serialized;
};

export default createJWT;
