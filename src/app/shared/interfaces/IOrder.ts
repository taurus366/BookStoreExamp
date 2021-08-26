export interface IOrder {
  "User": [
    {
      "address": string,
      "bookCount": number,
      "fullName": string,
      "orderDate": string,
      "phoneNumber": string,
      "quantityPrice": number,
      "user": {
        "firstName": string,
        "secondName": string,
        "email": string,
        "phoneNumber": string,
        "gender": string,
        "role": string,
        "address": string,
        "session": {
          "authToken": string
        },
        "id": number
      }
    }]
}
