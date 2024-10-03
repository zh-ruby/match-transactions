const addOrders = (e) => {
  e.preventDefault()

  let orders = localStorage.getItem('orders')
  orders = orders ? JSON.parse(orders) : []

  const formData = new FormData(e.target)
  const newData = JSON.parse(formData.get('orders'))
  if (newData instanceof(Array)) {
    orders = [...orders, ...newData]
  } else {
    orders.push(newData)
  }
  localStorage.setItem('orders', JSON.stringify(orders))
  document.getElementById('orders-fields').innerText = localStorage.getItem('orders')
}

const addTransactions = (e) => {
  e.preventDefault()

  let transactions = localStorage.getItem('transactions')
  transactions = transactions ? JSON.parse(transactions) : []

  const formData = new FormData(e.target)
  const newData = JSON.parse(formData.get('transactions'))
  if (newData instanceof(Array)) {
    transactions = [...transactions, ...newData]
  } else {
    transactions.push(newData)
  }
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
  orderForm.addEventListener('submit', addOrders)

  const transactionForm = document.getElementById('transaction-form')
  transactionForm.addEventListener('submit', addTransactions)

  const matchButton = document.getElementById('match-button')
  matchButton.addEventListener('click', matchTransactions)

  const resetOrderButton = document.getElementById('reset-orders')
  resetOrderButton.addEventListener('click', resetOrders)

  const resetTransactionButton = document.getElementById('reset-transactions')
  resetTransactionButton.addEventListener('click', resetTransactions)

  setDatas()
}

window.onload = init
