const oneDay = 24 * 3600 * 1000

export const onFuture = days => picker => {
  picker.$emit('pick', +new Date() + days * oneDay)
}
