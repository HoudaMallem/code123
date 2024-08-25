module.exports = {
     jsonResponse(res , result , status=200){
        let data = {}
        if (result)
            data.data =  result
        return res.status(status).send(data);
       
    },
    errorResponse(res , error){
        res.status(error.statusCode? error.statusCode : 400)
        return   res.send({message: error.serializeErrors()  })
       
    } 
}

