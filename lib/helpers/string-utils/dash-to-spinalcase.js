function dashToSpinalcase(str) {
  if (!str) return '';
  const regex = /\s+|_+/g;
  str = str.replace(/([a-z])([A-Z])/g, '$1 $2');
  return str.replace(regex, '-').toLowerCase();
}

export default dashToSpinalcase;
