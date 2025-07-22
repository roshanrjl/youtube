class ApiResponse {
    constructor(statuscode , message="succes", data){
        this.statuscode = statuscode,
        this.data= data,
        this.message= message
        this.succcess= statuscode < 400

    }
}
export{ApiResponse}