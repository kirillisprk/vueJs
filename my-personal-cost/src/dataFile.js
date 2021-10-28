const allData = {
  Page1: [
    {
      id: 1,
      date: '28.03.2020',
      category: 'Food',
      amount: 100
    },
    {
      id: 2,
      date: '24.03.2020',
      category: 'Transport',
      amount: 10
    },
    {
      id: 3,
      date: '24.03.2020',
      category: 'Food',
      amount: 20
    }
  ],
  Page2: [
    {
      id: 4,
      date: '28.03.2020',
      category: 'Food',
      amount: 200
    },
    {
      id: 5,
      date: '24.03.2020',
      category: 'Transport',
      amount: 324
    },
    {
      id: 6,
      date: '24.03.2020',
      category: 'Food',
      amount: 433
    }
  ],
  Page3: [
    {
      id: 7,
      date: '28.03.2020',
      category: 'Food',
      amount: 200
    },
    {
      id: 8,
      date: '24.03.2020',
      category: 'Transport',
      amount: 120
    },
    {
      id: 9,
      date: '24.03.2020',
      category: 'Food',
      amount: 300
    }
  ]
}

let getObjStatistics = (data) => {
  let statistic = {};
  for (const items of data) {
    for (const item of items) {
      if (statistic.hasOwnProperty(item.category)) {
        statistic[item.category] += item.amount
      } else {
        statistic[item.category] = item.amount
      }
    }
  }
  return statistic
}
export {allData, getObjStatistics}
