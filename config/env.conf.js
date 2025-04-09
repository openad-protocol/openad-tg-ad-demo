const argvs = process.argv.slice(2);

function getParams(key) {
  let item = argvs.find(item => item.split('=')[0] === key);
  return item ? item.split('=') : []
}

class MultiModule {
  constructor(name, opts) {
    Object.assign(this, {
      name,
      port: 9000,
      host: '0.0.0.0',
      filename: '',
      title: '',
      appVersion: 3.0,
      dev: {
        staticURL: './',
        apiURL: 'https://www.openad.network',
        dist: 'dev',
      },
      test: {
        staticURL: './',
        apiURL: 'https://www.openad.network',
        dist: 'test',
      },
      prod: {
        staticURL: './',
        apiURL: 'https://www.openad.network',
        dist: 'prod',
      },
      uat: {
        staticURL: './',
        dist: 'uat',
        apiURL: 'https://www.openad.network',
      },
    }, opts)
  }
}

function getModuleProcess(name) {
  let mItem = importModules.find(item => item.name === name);
  return mItem || importModules[0];
}

const importModules = [new MultiModule('OpenADApp', {
  filename: 'index.html',
  title: 'OpenAD Protocol Demo V3',
  sysApp: 'OpenADApp',
  sysName: 'OpenAD',
  webURL: 'https://www.openad.network/',
  server: 'https',
})];

let eventName = String(process.env.npm_lifecycle_event).split('-');
let moduleName = getParams('name')[1] || eventName[1];

const envConfig = {
  modules: importModules,
  process: getModuleProcess(moduleName),
  getNodeENV(obj) {
    return getENV('node', obj, envConfig.process);
  },
  getBuildENV(obj) {
    return getENV('build', obj, envConfig.process);
  },
};

function getENV(type, obj, params) {
  let item;
  for (let x in params) {
    item = params[x];
    if (typeof item === 'object' && x === JSON.parse(obj.prod)) {
      getENV(type, obj, item);
    }
    if (typeof item !== 'object') {
      if (type === 'node') {
        obj[x] = '"' + item + '"';
      }
      if (type === 'build') {
        obj[x] = item;
      }
    }
  }
  return obj;
}

module.exports = envConfig;
