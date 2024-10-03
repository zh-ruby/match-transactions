const getDataFromForm = (e, list) => {
  const formData = new FormData(e.target)
  let data = {}
  list.forEach(l => data = {...data, [l]: formData.get(l)})
  return data
}

const addOrder = (e) => {
  e.preventDefault()

  let orders = localStorage.getItem('orders')
  orders = orders ? JSON.parse(orders) : []

  const newData = getDataFromForm(e, [
    'date',
    'price',
    'orderId',
    'product',
    'customerName',
  ])
  orders.push(newData)
  localStorage.setItem('orders', JSON.stringify(orders))
  document.getElementById('orders-fields').innerText = localStorage.getItem('orders')
}

const addTransaction = (e) => {
  e.preventDefault()

  let transactions = localStorage.getItem('transactions')
  transactions = transactions ? JSON.parse(transactions) : []

  const newData = getDataFromForm(e, [
    'date',
    'price',
    'orderId',
    'product',
    'customerName',
    'transactionDate',
    'transactionType',
    'transactionAmount',
  ])
  transactions.push(newData)
  localStorage.setItem('transactions', JSON.stringify(transactions))
  document.getElementById('transactions-fields').innerText = localStorage.getItem('transactions')
}

const matchTransactions = async () => {
  const orders = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : []
  const transactions = localStorage.getItem('transactions') ? JSON.parse(localStorage.getItem('transactions')) : []

  const result = await fetch('http://localhost:8000/api/test/match', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ orders, transactions })
  })
  const data = await result.json()
  const dataField = document.getElementById('data-fields')
  dataField.innerText = JSON.stringify(data.result)
}

const resetOrders = () => {
  localStorage.setItem('orders', [])
  document.getElementById('orders-fields').innerText = ''
}

const resetTransactions = () => {
  localStorage.setItem('transactions', [])
  document.getElementById('transactions-fields').innerText = ''
}

const setDatas = () => {
  document.getElementById('orders-fields').innerText = localStorage.getItem('orders')
  document.getElementById('transactions-fields').innerText = localStorage.getItem('transactions')
}

const init = () => {
  const orderForm = document.getElementById('order-form')
  orderForm.addEventListener('submit', addOrder)

  const transactionForm = document.getElementById('transaction-form')
  transactionForm.addEventListener('submit', addTransaction)

  const matchButton = document.getElementById('match-button')
  matchButton.addEventListener('click', matchTransactions)

  const resetOrderButton = document.getElementById('reset-orders')
  resetOrderButton.addEventListener('click', resetOrders)

  const resetTransactionButton = document.getElementById('reset-transactions')
  resetTransactionButton.addEventListener('click', resetTransactions)

  setDatas()
}

window.onload = init
