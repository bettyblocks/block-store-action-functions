import JWT from '../../utils/JWT';

const getJWTPayload = async ({ token }) => {
  const decodedJwt = JWT.fromSerialized(token);

  const { payload } = decodedJwt;
  return { jwtPayload: payload };
};

export default getJWTPayload;
