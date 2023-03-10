import JWT from '../../utils/jwt';

const getJwtPayload = async ({ token }) => {
  const decodedJwt = JWT.fromSerialized(token);

  const { payload } = decodedJwt;
  return { jwtPayload: payload };
};

export default getJwtPayload;
