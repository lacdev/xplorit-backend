const averageReducer = (acc, value, index, array) => {
  let calculatedValue = acc + value

  if (index === array.length - 1) return calculatedValue / array.length

  return calculatedValue
}

export { averageReducer }
