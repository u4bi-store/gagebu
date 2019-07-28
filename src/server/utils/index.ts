export const currency = (val: number) => {
  let str = val.toString()
  const ptn = /(\d+)(\d{3})$/
  while (ptn.test(str)) {
    str = str.replace(ptn, '$1,$2')
  }
  return str
}