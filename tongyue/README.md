# 通约移动网页与组件

打开 index.html 即可浏览；也可以在此目录运行 npm start 后访问 http://127.0.0.1:4174。入口是通约首页，不显示设计目录、模拟状态栏或底部手机横条。首页采用手机高度布局，极小屏幕和长资料页面保留滚动，避免缩小文字或截断内容。

32 个页面入口使用 HTML/CSS。首页、企业、对比、资金、报告、个人设置及状态流程包含在独立网页中，src 保存对应源码。index.html 为自包含发布文件，修改源码后运行 npm run build，即可更新此文件。

## 可复用组件

components.js 导出 card、dataRows、emptyState、fundSummary，返回 HTML 字符串。card 的 content 接受可信 HTML，其余文本参数会转义；href 参数仅传入应用受信任的路由。

```js
import { fundSummary, dataRows } from './components.js';
const summary = fundSummary({name:'高新产业一期',paid:'6.00 亿元',target:'10 亿',subscribed:'8 亿',pending:'2 亿'});
const rows = dataRows([{label:'成立日期',value:'2019-01-14'}]);
```

样式按 src/preview.css → src/copy-pages.css → src/mobile.css 加载。移动规则使用 product-mode 类；页面外层使用 copy-screen 或 fund-screen，普通数据卡为不透明白色，资金汇总为统一淡化的青紫玻璃表面。

src/copy-pages.js 还提供 window.TongyueCopyPages.render(pageId,{icon,logo}) 页面组合接口；icon 和 logo 返回受信任的 SVG。

## 状态与数据

关注、备注和偏好保存在本机浏览器。报告生成是模拟流程，AI 尚未连接。CSV 仅验证并读取行数，不合并企业名录。当前网页用于浏览与前端流程演示，不是完整业务后端。

旧设计稿仍在仓库 designs 目录；本目录以用户选定的 H03、L04、D02 及后续选稿为基础，并采用最新网页文案。
