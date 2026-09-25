## 网站统计与站长验证配置

在 `lib/config.ts` 的 `siteConfig` 中填写，三个配置均可独立启用，留空不加载对应脚本或验证标签：

```ts
analytics: {
  googleAnalyticsId: '', // Google Analytics 4 衡量 ID，例如 G-XXXXXXXXXX
  clarityProjectId: '',  // Microsoft Clarity 项目 ID
},
verification: {
  bing: '', // Bing Webmaster 验证 meta 标签的 content 值
},
```

- Google Analytics：在 GA4 的网站数据流中复制衡量 ID，填入 `googleAnalyticsId`。[官方接入说明](https://developers.google.com/tag-platform/gtagjs)
- Bing Webmaster：添加网站后选择 HTML meta 标签验证，仅复制 `<meta name="msvalidate.01" content="这里的验证码" />` 中的验证码。部署完成后回到 Bing 点击验证。[官方验证说明](https://learn.microsoft.com/en-us/bingwebmaster/verifying-wordpress)
- Clarity：在项目的 Settings → Setup 中查看跟踪代码，复制 `https://www.clarity.ms/tag/` 后面的项目 ID，填入 `clarityProjectId`。[官方安装说明](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-setup)

填写后运行 `npm run build`，重新部署生成的 `out/` 目录即可生效。统计脚本在页面可交互后加载，Bing 验证标签直接输出到 HTML 的 head 中。填写真实 ID 后，本地预览也会加载统计脚本。

上线后可在 GA4 实时报告、Clarity 仪表盘确认数据；Bing 可通过网页源代码检查 `msvalidate.01` 标签。GA4 的站内导航页面浏览统计可在数据流的增强型衡量中启用基于浏览器历史记录变化的网页浏览。

---

Next.js 目录应该围绕：

1. 页面路由
2. 数据来源
3. 页面组件
4. 通用逻辑

来组织。

我建议改造成下面这样。

---

# 推荐目录结构

```
roblox-wiki/

├── app/                 # 页面路由
│
│   ├── page.tsx     # 首页
│   │
│   ├── items/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── pets/
│   │
│   ├── weapons/
│   │
│   ├── npcs/
│   │
│   ├── locations/
│   │
│   ├── quests/
│   │
│   ├── guides/
│   │
│   ├── codes/
│   │
│   ├── updates/
│   │
│   ├── events/
│   │
│   └── about/
│
├── components/          # UI组件
│
│   ├── wiki/
│   │
│   │   ├── EntityCard.tsx
│   │   ├── EntityTable.tsx
│   │   ├── EntityInfo.tsx
│   │   ├── RelatedPages.tsx
│   │   └── Breadcrumb.tsx
│
│
├── templates/           # 页面模板
│
│   ├── EntityTemplate/
│   │
│   │   ├── EntityList.tsx
│   │   ├── EntityDetail.tsx
│   │
│   ├── ArticleTemplate/
│   │
│   │   ├── GuideArticle.tsx
│   │   ├── CodePage.tsx
│   │   ├── UpdatePage.tsx
│   │   └── HomePage.tsx
│
├── lib/                 # 数据处理逻辑
│
│   ├── content.ts
│   ├── entity.ts
│   ├── seo.ts
│   ├── schema.ts
│   └── search.ts
│
├── content/                # 网站内容数据
│
│   └── articles/
│       │
│       ├── guides/
│       │
│       └── codes/
│
│   └── entities/
│
│       ├── items/
│       │    └── sprinkler.json
│       │
│       ├── pets/
│       │    └── dragon.json
│       │
│       ├── weapons/
│       │
│       ├── npcs/
│       │
│       ├── locations/
│       │
│       ├── quests/
│
│
├── config/
│
│   └── game.json
│
│
└── public/
    └── images/

```

下面解释每个目录。

---

# 1. app —— 页面入口（URL）

这是 Next.js 的核心。

它负责：

> 用户访问哪个 URL，加载哪个页面。

例如：

用户访问：

```
/pets/dragon
```

对应：

```
app/pets/[slug]/page.tsx
```

这个文件不负责写页面细节。

它只负责：

```tsx
读取数据

↓

调用模板

↓

返回页面

```

例如：

```tsx
export default function Page(){

const pet=getEntity(
"pets",
"dragon"
)


return (

<EntityDetail
data={pet}
/>

)

}
```

---

# 2. components —— 页面零件

这里放重复使用的小组件。

比如：

## EntityCard

用于列表：

```
Pets


[Dragon]
Legendary

[Phoenix]
Epic

```

组件：

```
EntityCard.tsx
```

---

## EntityTable

比如：

```
Dragon Stats


Rarity:
Legendary

Cooldown:
30s

Ability:
Fire

```

---

## Breadcrumb

SEO非常重要：

```
Home
 >
Pets
 >
Dragon

```

---

# 3. templates —— 页面模板（最重要）

这里对应你说的：

> 数据页、内容页、网站页

但是不要每种数据做一个模板。

例如：

错误：

```
PetPage.tsx

ItemPage.tsx

WeaponPage.tsx

```

以后会爆炸。


正确：

## EntityDetail模板

所有详情页：

```
/pets/dragon

/items/sword

/weapons/katana

```

全部使用：

```
EntityDetail.tsx
```

区别来自数据。

例如：

Pet:

```json
{
type:"pet",

ability:"Fire"
}

```

Weapon:

```json
{
type:"weapon",

damage:500
}

```

模板自动显示。

---

## EntityList模板

列表：

```
/pets

/items

/weapons

```

统一：

```
EntityList.tsx

```

---

## GuideArticle模板

对应：

你的：

```
攻略
```

例如：

```
/guides/how-to-get-dragon
```

---

## CodePage模板

对应：

兑换码：

```
/codes
```

---

## UpdatePage模板

对应：

更新日志：

```
/updates/update-10
```

---

# 4. lib —— 业务逻辑层

这个就是你刚才问的。

它不显示页面。

它负责：

## content.ts

读取内容。

例如：

```typescript
getEntity(
"pets",
"dragon"
)
```

返回：

```json
{
name:"Dragon",
rarity:"Legendary"
}

```

---

## entity.ts

定义：

有哪些 Entity。

例如：

```typescript
type EntityType =
"pet"
|"item"
|"weapon"
|"npc"
```

---

## seo.ts

自动生成：

Title:

```
Dragon Pet - Grow a Garden Wiki
```

Description:

```
How to get Dragon pet...
```

---

## schema.ts

生成 Google 结构化数据：

```json
Article

Breadcrumb

FAQ

```

---

## search.ts

生成搜索。

例如：

搜索：

```
dragon
```

返回：

```
Dragon Pet

Dragon Egg

Dragon Quest

```

---

# 5. content —— 真正的数据

这是你的 AI 自动生成目标。

例如：

AI生成：

```
content/

grow-a-garden/

pets/

dragon.json

```

内容：

```json
{
"name":"Dragon",
"rarity":"Legendary",
"ability":"Fire Breath",
"obtain":"Dragon Egg"
}

```

网站自动生成：

```
/pets/dragon
```

---

# 6. config —— 游戏配置

每个游戏不同。

例如：

grow-a-garden：

```json
{
"name":"Grow a Garden",

"entities":[
"pets",
"items",
"seeds"
]
}

```

Blox Fruits：

```json
{
"name":"Blox Fruits",

"entities":[
"fruits",
"weapons",
"npc"
]
}

```

---

# 7. public —— 静态资源

图片：

```
public/images/


grow-a-garden/

pets/

dragon.webp

```

页面引用：

```
/images/grow-a-garden/pets/dragon.webp
```

---

# 对应你的需求关系

你的页面：

## 数据页面

| 你的分类  | 对应                    |
| ----- | --------------------- |
| 物品    | Entity + EntityDetail |
| 角色/宠物 | Entity + EntityDetail |
| 武器    | Entity + EntityDetail |
| NPC   | Entity + EntityDetail |
| 地图    | Entity + EntityDetail |
| 任务    | Entity + EntityDetail |

---

## 内容页面

| 你的分类 | 模板           |
| ---- | ------------ |
| 攻略   | GuideArticle |
| 兑换码  | CodePage     |
| 更新日志 | UpdatePage   |
| 活动   | EventPage    |
| 问题集合 | FAQPage      |

---

## 网站页面

| 你的分类 | 模板           |
| ---- | ------------ |
| 首页   | HomePage     |
| 分类页  | CategoryPage |
| 关于   | AboutPage    |
| 联系   | ContactPage  |

---

所以最终你的系统关系应该是：

```
          JSON数据
             |
             |
        Entity模型
             |
             |
      ----------------
      |              |
 数据页面模板      内容页面模板

      |
      |
    Next.js

      |
      |
 Cloudflare Pages

```

这个架构可以支持：

* Grow a Garden Wiki
* Blox Fruits Wiki
* 新 Roblox 游戏 Wiki

只需要替换：

```
content/
config/
images/
```

代码不用动。

这才是真正适合你目标的 **Roblox Wiki 自动生产模板**。
