const {SHA256} =require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

var password = '123abc!';

bcrypt.genSalt(10, (err,salt) => {
  bcrypt.hash(password,salt, (err,hash) => {
    console.log(hash);
  })
})

var hashedPassword = '$2a$10$L4Af0TBskuLsV0v5Ltle0.NthyD3L4P1bmF.Frke0sUKlE/wENlqS'

bcrypt.compare(password,hashedPassword,(err,res) => {
  console.log(res)
});
// var data = {
//   id:10
// };
//
//
// var token = jwt.sign(data,'123abc')
// console.log(token);
//
// var decoded = jwt.verify(token,'123abc')
// console.log(decoded)

// var message = "I am user number three";
//
// hash = SHA256(message).toString();
//
// console.log(`message: ${message}`)
// console.log(`hash: ${hash}`)
//
// var data = {
//   id:4
// };
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data)+'somesecret').toString()
// }
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString()
//
// if(resultHash === token.hash){
//   console.log('Data was not changed');
// }else{
//   console.log('Data was changed, not trust')
// }
