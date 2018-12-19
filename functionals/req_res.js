exports.res_err = (res) => {
    return (err) => {
        if (err) res.send(err).status(400);
        else res.sendStatus(200);
    }
}

exports.res_err_result = (res) => {
    return (err, result) => {
        if (err) res.send(err).status(400);
        else if (!result) res.sendStatus(404);
        else res.send(result).status(200);
    }
}