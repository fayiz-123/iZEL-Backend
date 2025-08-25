export const sendResponse = (res,statusCode,success,message,data={},token=null) =>{
    return res.status(statusCode).json({
        success,
        message,
        data,
        token
    })
}