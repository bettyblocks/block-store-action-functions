/* eslint-disable lines-between-class-members */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prettier/prettier */
import { Base64 } from 'js-base64';
import jsSHA from 'jssha';

export default class JWT {
  header = { alg: 'HS256', type: 'JWT' };
  payload = {};
  signage = '';
  #_serialized = '';

  static fromSerialized(serializedJWT) {
    const elements = serializedJWT.split('.');
    if (elements.length !== 3) throw new Error('No JWT string');
    const newJwt = new JWT();
    newJwt.header = JSON.parse(Base64.decode(elements[0]));
    newJwt.payload = JSON.parse(Base64.decode(elements[1]));
    // eslint-disable-next-line prefer-destructuring
    newJwt.signage = elements[2];
    return newJwt;
  }

  constructor(header = { alg: 'HS256', type: 'JWT' }, payload = {}) {
    this.header = header;
    this.payload = payload;
    this.signage = '';
  }

  sign(secret) {
    const header = this.header.alg || 'HS256';
    const isHmac = header.startsWith('H');
    const isSha = header.startsWith(isHmac ? 'HS' : 'S');
    const hasSecret = !!secret;

    if (isHmac && isSha && !hasSecret) {
      throw new Error('Hmac signage needs a valid secret');
    }

    const baseJwt = `${Base64.encode(
      JSON.stringify(this.header),
      true,
    )}.${Base64.encode(JSON.stringify(this.payload), true)}`;

    // eslint-disable-next-line new-cap
    const shaObj = new jsSHA('SHA-256', 'TEXT');
    shaObj.setHMACKey(secret, 'TEXT');
    shaObj.update(baseJwt);
    this.signage = shaObj.getHash('B64', { b64Pad: ' ' }).trimEnd();
    this.#_serialized = `${baseJwt}.${this.signage}`;
  }

  set expiresIn(_expiresIn) {
    this.payload.exp = Date.now() + 1000 * _expiresIn;
  }

  get isExpired() {
    return (this.payload.exp || 0) < Date.now();
  }

  get payload() {
    return this.payload;
  }

  get serialized() {
    return this.#_serialized;
  }
}
