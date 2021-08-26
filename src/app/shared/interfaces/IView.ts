export interface IView {

  fullName: string,
  phoneNumber: string,
  address: string,
  orderDate: string,
  totalPrice: number,
  emailAddress: string,
  orders: [
    {
      "address": string,
      "book": {
        "title": string,
        "author": string,
        "price": number,
        "issuedDate": string,
        "publishHouse": string,
        "id": number,
        "imgUrl": string,
        "page": number
      },
      "bookCount": number,
      "fullName": string,
      "id": number,
      "orderDate": string,
      "phoneNumber": string,
      "quantityPrice": number,
      "user": {
        "address": string,
        "email": string,
        "firstName": string,
        "gender": string,
        "id": number,
        "phoneNumber": string,
        "role": string,
        "secondName": string,
        "session": {
          "authToken": string
        }
      }
    }
  ]


}
