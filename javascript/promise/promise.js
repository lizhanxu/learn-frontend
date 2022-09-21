let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
  }, 1000);
  reject("error");
});

let p2 = p1
  .then((res) => {
    console.log("111111111  " + res);
  })
  .catch((e) => {
    console.log("222222222  " + e);
    return "eeee";
  });

console.log(p2);
p2.then((res) => {
  console.log("33333333  " + res);
}).catch((e) => {
  console.log("44444444  " + e);
});
