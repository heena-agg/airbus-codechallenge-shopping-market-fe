export class Error {
    timestamp : Date = new Date();
    httpStatus : string = "";
    public errorDescription : string = "";
    errorPath : string = "";
}