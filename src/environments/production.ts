import environment, { Environment } from './base';

/*
 * base.ts is the default environment for production.
 * You shouldn't have override anything.
 */

const baseApi = 'http://bhpapisrvdev.berca.co.id:7000';
// const baseApi = 'https://192.168.1.113:5009';
//const baseApi = 'https://bhpapisrv.berca.co.id:5009';
const env = environment(baseApi);

const productionEnv: Environment = {
  ...env,
  // override anything that gets added from base.
};

export default productionEnv;
