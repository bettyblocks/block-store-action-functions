import jsSHA from 'jssha';

const sha512 = async ({ input }) => {
  const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
  shaObj.update(input);
  return {
    output: shaObj.getHash('HEX'),
  };
};

export default sha512;
