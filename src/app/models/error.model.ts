export class Error {
    timestamp : Date = new Date();
    httpStatus : string = "";
    errorDescription : string = "";
    errorPath : string = "";

    // constructor(timestamp : Date, httpStatus : string, errorDescription : string, errorPath : string){
    //     this.errorDescription = errorDescription;
    //     this.errorPath = errorPath;
    //     this.httpStatus = httpStatus;
    //     this.timestamp = timestamp
    // }
}