export interface IOrder {
  type: string,
  customerName: string,
  orderId: string,
  date: string,
  product: string,
  price: number,
}
  
export interface ITransaction {
  type: string,
  customerName: string,
  orderId: string,
  date: string,
  product: string,
  price: number,
  transactionType: string,
  transactionDate: string,
  transactionAmount: number,
}
  
export type result = (IOrder | ITransaction)[]
