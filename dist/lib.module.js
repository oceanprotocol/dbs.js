import e from 'axios'
import t from 'form-data'
import { sha256 as r, toUtf8Bytes as n, ethers as o } from 'ethers'
var s = function (e, t, s) {
    try {
      var i = r(n(t + s.toString()))
      return Promise.resolve(e.signMessage(o.getBytes(i)))
    } catch (e) {
      return Promise.reject(e)
    }
  },
  i = /*#__PURE__*/ (function () {
    function r(e, t) {
      ;(this.baseURL = void 0),
        (this.signer = void 0),
        (this.baseURL = e),
        (this.signer = t)
    }
    var n = r.prototype
    return (
      (n.getStorageInfo = function () {
        try {
          return Promise.resolve(e.get(this.baseURL + '/')).then(function (e) {
            return e.data
          })
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      (n.getQuote = function (t) {
        try {
          return Promise.resolve(e.post(this.baseURL + '/getQuote', t)).then(function (
            e
          ) {
            return e.data
          })
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      (n.upload = function (r, n) {
        try {
          var o = this,
            i = Date.now()
          return Promise.resolve(s(o.signer, r, i)).then(function (s) {
            var u = new t()
            return (
              n.forEach(function (e, t) {
                u.append('file' + t, new Blob([new ArrayBuffer(e.length)]))
              }),
              Promise.resolve(
                e.post(o.baseURL + '/upload', u, {
                  params: { quoteId: r, nonce: i, signature: s },
                  headers: { 'Content-Type': 'multipart/form-data' }
                })
              ).then(function () {})
            )
          })
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      (n.getQuoteAndUpload = function (e) {
        try {
          var t = this
          return Promise.resolve(t.getQuote(e)).then(function (r) {
            return Promise.resolve(t.upload(r.quoteId, e.files)).then(function () {
              return r
            })
          })
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      (n.getStatus = function (t) {
        try {
          return Promise.resolve(
            e.post(this.baseURL + '/getStatus', { quoteId: t })
          ).then(function (e) {
            return e.data
          })
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      (n.getLink = function (t) {
        try {
          var r = this,
            n = Date.now()
          return Promise.resolve(s(r.signer, t, n)).then(function (o) {
            return Promise.resolve(
              e.post(r.baseURL + '/getLink', null, {
                params: { quoteId: t, nonce: n, signature: o }
              })
            ).then(function (e) {
              return e.data
            })
          })
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      (n.registerMicroservice = function (t) {
        try {
          return Promise.resolve(e.post(this.baseURL + '/register', t)).then(
            function () {}
          )
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      r
    )
  })()
export { i as DBSClient, s as getSignedHash }
//# sourceMappingURL=lib.module.js.map
