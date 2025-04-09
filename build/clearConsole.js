const reg = /(console.log\()(.*)(\))/g;
module.exports = function(source) {
  source = source.replace(reg, '')
  return source;
}
