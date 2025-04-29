interface TourResponse{
id:number,
pickUp:string,
dropOff:string,
 passengers:number,
 date:string,
 time:string,
 optionalStops:string[],
 passengerName:string,
 email:string,
 phoneNumber:string,
 price:number,
 startLocation:string,
 endLocation:string,
 duration:string,
 driverName?: string;
 driverPhone?: string;
 driverDetails?: string;
 driverPaid?: boolean;
}
export default TourResponse