```
const year = 2023;
const yearStr = '年';
const monthStr = '月';
const fun = (limit) => {
	for (let i = 0; i < limit; i++) {
    const str = `${year}${yearStr}${limit - 1}${monthStr}`;
    console.log(str)
  }
}
fun(12);
```

将上述需要转换的测试代码，转换为es5的语法，例如下面的一种形式：

```
var year = 2023;
var yearStr = '年';
var monthStr = '月';
var fun = function fun(limit) {
  for (var i = 0; i < limit; i++) {
    var str = "".concat(year).concat(yearStr).concat(limit - 1).concat(monthStr);
    console.log(str);
  }
};
fun(12);
```