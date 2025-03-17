interface TransferResponse {
    id: number;
    pickUp: string;
    dropOff: string;
    passengers: number;
    suitcases: number;
    backpack: number;
    pickUpDate: string;
    pickUpTime: string;
    transportType: string;
    transportDetails: string;
    nameOnBoard: string;
    childSeats: string;
    requests: string;
    nameAndSurname: string;
    email: string;
    phone: string;
    price: number;
  }
  export default TransferResponse;