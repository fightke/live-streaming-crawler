const search = require('../util/search');
const join = require('bluebird').join;

function searchAll(req, res, next) {
    const keyword = req.query.keyword;
    if (!keyword) {
        return next();
    }
    let promiseList = [];
    for(let item of Object.keys(search)) {
        promiseList.push(search[item](keyword));
    }
    join(...promiseList)
        .then((jsonList) => {
            let liveJson = [].concat(...jsonList);
            console.log(liveJson);
            liveJson.sort((o1, o2) => {
                if (o1.onlineFlag !== o2.onlineFlag) {
                    return o2.onlineFlag;
                }
                return o2.audienceNumber - o1.audienceNumber;
            });
            console.log(liveJson);
        });
}

searchAll({
    query: {
        keyword: 1,
    },
});
