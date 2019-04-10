## wechat mini program promisify request

### How to use it

```js
import request 'wx-promisify-request';

const r = request();
const url = 'https:xxxx.com';
// then you can use it like below
r.get(url);

// https://developers.weixin.qq.com/miniprogram/dev/api/wx.request.html
r.post(url, {
    text: 'data', // except the below three fields, all others fields are data will sent to backend, check above link's doc
    header, //  options
    dataType, // options
    responseType // options
});
r.delete(url);
r.put(url);
r.head(url);
r.options(url)
```