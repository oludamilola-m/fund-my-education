const bcrypt = require("bcryptjs");

// function hash(plainTextPasswordFromUser) {
//   return new Promise((resolve, reject) => {
//     bcrypt.genSalt(10, (err, salt) => {
//       bcrypt.hash(plainTextPasswordFromUser, salt, function (err, hash) {
//         return resolve(hash);
//       });
//     });
//   });
// }
async function hash(plainTextPasswordFromUser) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(plainTextPasswordFromUser, salt);

    return Promise.resolve(hash);
  } catch (err) {
    console.log("bc error", err);
    return Promise.reject(err);
  }
}

function compare(plainTextPasswordFromUser, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainTextPasswordFromUser, hash, (err, res) => {
      return resolve(res);
    });
  });
}

module.exports.hash = hash;
module.exports.compare = compare;
