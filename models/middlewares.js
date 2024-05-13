export function setReturnNew(next) {
  this.options.new = true;
  next();
}
