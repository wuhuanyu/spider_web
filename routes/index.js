const express = require('express');
const router = express.Router();
const createError = require('http-errors')
const fs = require('fs');
const directoryExists = require('directory-exists')
const logs_dir = "/home/stack/spider/logs/";
const docs_dir = "/home/stack/spider/docs/";

router.get(/^\/([0-9]+)\/docs$/, async (req, res, next) => {
    let date = req.params[0];
    let dir = docs_dir + date
    const result = await directoryExists(dir)
    if (result) {
        fs.readdir(dir, (err, files) => {
            res.json({
                count: files.length,
                data: files
            })
        })

    } else {
        next(createError(404))
    }
});

router.get(/^\/([0-9]+)\/logs$/, async (req, res, next) => {
    let date = req.params[0];
    let dir = logs_dir + date
    if (await directoryExists(dir)) {
        fs.readdir(dir, (e, files) => {
            res.json({
                count: files.length,
                data: files
            })
        })
    } else {
        next(createError(404))
    }
});

router.get(/^\/([0-9]+)\/logs\/([\w]+)$/, async (req, res, next) => {
    let log_file = logs_dir + req.params[0] + "/" + req.params[1];
    if (fs.existsSync(log_file)) {
        fs.readFile(log_file, "utf-8", (err, data) => {
            res.json({
                result: 'OK',
                content: data
            })
        })
    } else {
        next(createError(404))
    }
});


module.exports = router;
