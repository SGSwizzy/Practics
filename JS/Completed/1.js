let obj = {orange: 2, apple: 5, lemon: 4, watermelon: 55, avocado: 1}

  var sorted = {}
  Object.keys(obj).sort().forEach(function(val) {
    sorted[val] = {}
    Object.keys(obj[val]).sort().forEach(function(val2) {
      sorted[val][val2] = obj[val][val2]
    })
  })
  console.log(obj)