import { Request, Response } from "express"

import type {
  result,
  IOrder,
  ITransaction,
} from "../../types"
import wordSimilarity from "../../utils/wordSimilarity"
// import compareWords from "../../utils/stringSimilarity"

const matchTransactions = (orders: IOrder[], transactions: ITransaction[]) => {
  const matchedRecords: result[] = orders.map((o: IOrder) => [o])

  transactions.forEach((t: ITransaction) => {
    let weight = 0, index = -1
    orders.forEach((o: IOrder, i: number) => {
      const dateSimilarty = wordSimilarity(t.date, o.date)
      const orderIdSimilarty = wordSimilarity(t.orderId, o.orderId)
      const customerNameSimilarty = wordSimilarity(t.customerName, o.customerName)
      const priceSimilarty = wordSimilarity(t.price.toString(), o.price.toString())
      if (
        dateSimilarty >= 0.8 &&
        priceSimilarty >= 0.8 &&
        orderIdSimilarty >= 0.8 &&
        customerNameSimilarty >= 0.8) {
        const sum = dateSimilarty + priceSimilarty + orderIdSimilarty + customerNameSimilarty
        if (sum > weight) {
          weight = sum, index = i
        }
      }
    })
    if (index > -1) {
      matchedRecords[index].push(t)
    }
  })
  return matchedRecords.filter((mr: result) => mr.length > 1)
}

export default (req: Request, res: Response) => {
  const { orders, transactions } = req.body

  const result = matchTransactions(orders, transactions)

  res.status(200).json({ status: true, result })
}
