var feedback = function(res, _code, _msg, _data) {
    res.status(200).send({code: _code, msg: _msg, data: _data});
}

module.exports = feedback;