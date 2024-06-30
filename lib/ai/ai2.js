const fs = require("fs");
const { Worker } = require('node:worker_threads');
const path = require("path");
let _c = process.cwd()+'/cache';
exports.name = {
  title: 'ai2',
  path: '/ai',
  desc: '',
  example_url: [
    {
    method: 'GET',
    query: '',
    desc: '',
    }
  ],
};
exports.methods = {
  get: async(req, res, next)=> {
    fs.readdir(_c, (err, files) => {
        if (err) throw err;
        for (const file of files) {
            if (Date.now() -  file.split(".")[0].substring(0, 13) > 1000 * 60 * 1) {
                fs.unlinkSync(_c+'/' + file);
            }
        }
    });
    const prompt = req.query.prompt;
    const style_id = req.query.style_id;
    const aspect_ratio = req.query.aspect_ratio;
    if (!prompt) {
        res.send("Missing parameters prompt");
        return;
    }
    try {
        const filename = await runMainInWorker(prompt, style_id, aspect_ratio);
        if (!filename) {
            res.send("Error");
            return;
      }
      res.sendFile(filename);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
  },
};
function runMainInWorker  (prompt, style_id, aspect_ratio) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(process.cwd()+'/lib/worker.js', {
            workerData: { prompt, style_id, aspect_ratio },
        });
        worker.on("message", (filename) => {
            resolve(filename);
        });
        worker.on("error", (error) => {
            reject(error);
        });
        worker.on("exit", (code) => {
            if (code !== 0) {
            reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });
    });
};
