"use strict";const o=require("../common/vendor.js");function c({url:t,data:n,method:s="GET",contentType:i=1}){let a={"content-type":i===1?"application/json":"application/x-www-form-urlencoded"},d="http://localhost:3000";return new Promise((l,u)=>{o.index.request({url:d+t,data:n,method:s,header:a,success:e=>{e.statusCode===200?l(e.data):e.statusCode===401?o.index.showToast({icon:"none",title:"\u672A\u767B\u5F55\u6216\u767B\u5F55\u72B6\u6001\u5DF2\u8D85\u65F6",duration:1500}):e.statusCode===405?o.index.showToast({icon:"none",title:"\u8BF7\u6C42\u65B9\u6CD5\u9519\u8BEF",duration:1500}):o.index.showToast({icon:"none",title:"\u8BF7\u6C42\u9519\u8BEF:"+e.statusCode,duration:1500})},fail:e=>{console.log("err:",e),o.index.showToast({icon:"none",title:e.errMsg,duration:1500}),u(e)}})})}const r={request:c};exports.request=r;
