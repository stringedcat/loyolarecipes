//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { Diet } = require("./src/db");

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log("%s listening at 3001");
    // eslint-disable-line no-console
    Diet.findOrCreate({ where: { name: "gluten free" } });
    Diet.findOrCreate({ where: { name: "ketogenic" } });
    Diet.findOrCreate({ where: { name: "vegetarian" } });
    Diet.findOrCreate({ where: { name: "dairy free" } });
    Diet.findOrCreate({ where: { name: "lacto ovo vegetarian" } });
    Diet.findOrCreate({ where: { name: "vegan" } });
    Diet.findOrCreate({ where: { name: "Pescetarian" } });
    Diet.findOrCreate({ where: { name: "paleolithic" } });
    Diet.findOrCreate({ where: { name: "primal" } });
    Diet.findOrCreate({ where: { name: "whole 30" } });
  });
});
