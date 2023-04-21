/***********************************
#!name = 酷安去广告
#!desc = 过滤coolapk广告，精简多余功能。
#!openUrl = 
#!author = Rddgksf2013
#!homepage = https://github.com/junjiego2/Tool/tree/main/Loon/Plugin
#!icon = 

[Rewrite]
# > 酷安_屏蔽热词@ddgksf2013
^https?:\/\/api\.coolapk\.com\/v6\/search\?.*type=hotSearch reject-dict

[Script]
# > 酷安_推广广告@ddgksf2013
http-response ^https?:\/\/api.coolapk.com\/v6\/dataList script-path = https://raw.githubusercontent.com/junjiego2/Tool/main/Loon/Scripts/coolapk.js
# > 酷安_首页广告@ddgksf2013
http-response ^https?:\/\/api.coolapk.com\/v6\/main\/indexV8 script-path = https://raw.githubusercontent.com/junjiego2/Tool/main/Loon/Scripts/coolapk.js
# > 酷安_评论广告@ddgksf2013
http-response ^https?:\/\/api.coolapk.com\/v6\/feed\/replyList script-path = https://raw.githubusercontent.com/junjiego2/Tool/main/Loon/Scripts/coolapk.js
# > 酷安_商品推广@ddgksf2013
http-response ^https?:\/\/api.coolapk.com\/v6\/feed\/detail script-path = https://raw.githubusercontent.com/junjiego2/Tool/main/Loon/Scripts/coolapk.js
http-response ^https?:\/\/api\.coolapk\.com\/v6\/(feed\/(replyList|detail)|main\/indexV8|dataList) script-path = https://raw.githubusercontent.com/junjiego2/Tool/main/Loon/Scripts/coolapk.js

[MITM] 
hostname=api.coolapk.com


***********************************/






const version = 'V1.0.9';
 
if(-1!=$request.url.indexOf("replyList")){var t=JSON.parse($response.body);t.data.length&&(t.data=t.data.filter(t=>t.id)),$done({body:JSON.stringify(t)})}else if(-1!=$request.url.indexOf("indexV8")){var t=JSON.parse($response.body);t.data=t.data.filter(t=>!("sponsorCard"==t.entityTemplate||8639==t.entityId||29349==t.entityId||33006==t.entityId||32557==t.entityId||-1!=t.title.indexOf("值得买")||-1!=t.title.indexOf("红包"))),$done({body:JSON.stringify(t)})}else if(-1!=$request.url.indexOf("dataList")){var t=JSON.parse($response.body);t.data=t.data.filter(t=>!("sponsorCard"==t.entityTemplate||-1!=t.title.indexOf("精选配件"))),$done({body:JSON.stringify(t)})}else if(-1!=$request.url.indexOf("detail")){var t=JSON.parse($response.body);t.data?.hotReplyRows?.length&&(t.data.hotReplyRows=t.data.hotReplyRows.filter(t=>t.id)),t.data?.topReplyRows?.length&&(t.data.topReplyRows=t.data.topReplyRows.filter(t=>t.id)),t.data?.include_goods_ids&&(t.data.include_goods_ids=[]),t.data?.include_goods&&(t.data.include_goods=[]),t.data?.detailSponsorCard&&(t.data.detailSponsorCard=[]),$done({body:JSON.stringify(t)})}else $done($response);
