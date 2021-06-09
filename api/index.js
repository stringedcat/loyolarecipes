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
    Diet.findOrCreate({ where: { name: "Gluten Free" } });
    Diet.findOrCreate({ where: { name: "Ketogenic" } });
    Diet.findOrCreate({ where: { name: "Vegetarian" } });
    Diet.findOrCreate({ where: { name: "Lacto-Vegetarian" } });
    Diet.findOrCreate({ where: { name: "Ovo-Vegetarian" } });
    Diet.findOrCreate({ where: { name: "Vegan" } });
    Diet.findOrCreate({ where: { name: "Pescetarian" } });
    Diet.findOrCreate({ where: { name: "Paleo" } });
    Diet.findOrCreate({ where: { name: "Primal" } });
    Diet.findOrCreate({ where: { name: "Whole30" } });
  });
});
