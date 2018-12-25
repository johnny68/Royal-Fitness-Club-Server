function createResult(error, data){
    var result = {};
    if (error == null){
        result['status'] = 'success';
        result[data]     =  data;
    }
    else{
        result ['status'] = ['error'];
    }
    return result;
}

module.exports = {
    createResult: createResult
};