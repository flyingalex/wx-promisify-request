const wxPromisify = ({ data = {}, method }) => new Promise((resolve, reject) => {
  wx[method]({
    ...data,
    success: resolve,
    fail: reject,
  });
});

const request = ({
  dataType = 'json',
  responseType = 'text',
  header = {},
}) => {

  const buildRequest = method => (url, data = {}) => {
    let updatedDataType = dataType;
    let updatedResponseType = responseType;
    let updatedHeader = header;
    if (data.dataType) {
      updatedDataType = data.dataType;
      delete data.dataType;
    }
    if (data.responseType) {
      updatedResponseType = data.responseType;
      delete data.responseType;
    }
    if (data.header) {
      updatedHeader = {...header, ...data.header};
      delete data.header;
    }
    return wxPromisify({
      method: 'request',
      data: {
        url,
        data,
        method,
        dataType: updatedDataType,
        responseType: updatedResponseType,
        header: updatedHeader,
      },
    }).then((res) => {
      const code = `${res.statusCode}`;
      if (code.startsWith('2')) {
        return Promise.resolve(res);
      }
      return Promise.reject(res);
    });
  }

  return {
    get: buildRequest('GET'),
    post: buildRequest('POST'),
    put: buildRequest('PUT'),
    delete: buildRequest('DELETE'),
    head: buildRequest('HEAD'),
    options: buildRequest('OPTIONS'),
  };
};

export default request;
