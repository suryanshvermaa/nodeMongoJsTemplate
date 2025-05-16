const response=(res,status,message,data)=>{
    const resObj={
        success:true,
        message,
        data:data
    }
    return res.status(status).json(resObj);
}
export default response;