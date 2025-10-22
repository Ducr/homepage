export const siteConfig = {
  // 基本信息
  name: "Ducr",
  title: "Ducr主页",
  description: "个人主页",
  url: "https://ducrong.com",
  
  // 个人信息
  profile: {
    avatar: "/images/avatar.jpg",
    bio: "知行合一",
    location: "广州, 中国",
    email: "ducrong@126.com",
    github: "https://github.com/Ducr",
    // 社交媒体链接（可选配置）
    // social: {
    //   linkedin: "https://linkedin.com/in/username",
    //   twitter: "https://twitter.com/username",
    //   bilibili: "https://space.bilibili.com/12345678",
    //   youtube: "https://youtube.com/c/username",
    //   telegram: "https://t.me/username",
    //   instagram: "https://instagram.com/username",
    // },
    // RSS 订阅配置
    // rss: {
    //   enabled: true,
    //   title: "RSS 订阅",
    // },
    // 旧版主页链接
    // oldSite: {
    //   enabled: false,
    //   url: "https://ducrong.com",
    //   title: "旧版主页",
    // },
  },

  // 首页配置
  hero: {
    quickLinks: [
      { name: "博客", href: "/blog", icon: "BookOpen" },
      { name: "随笔", href: "/thoughts", icon: "PenTool" },
      { name: "项目", href: "/projects", icon: "Code" },
      { name: "关于", href: "/about", icon: "User" },
    ],
  },

  // 博客配置
  blog: {
    // 分页配置
    pagination: {
      postsPerPage: 10, // 每页显示的博客文章数量
      maxVisiblePages: 5, // 分页组件中最多显示的页码数量
    },

    // 首页配置
    homepage: {
      recentPostsCount: 5, // 首页显示的最新文章数量
    },

    // 其他博客相关配置
    display: {
      showExcerpt: true, // 是否显示文章摘要
      excerptLength: 150, // 文章摘要长度
      showReadTime: true, // 是否显示阅读时间
      showTags: true, // 是否显示标签
      maxTagsToShow: 3, // 最多显示的标签数量
    },
  },

  // 导航配置
  navigation: {
    main: [
      { name: "首页", href: "/" },
      { name: "博客", href: "/blog" },
      { name: "随笔", href: "/thoughts" },
      { name: "项目", href: "/projects" },
      // { name: "书籍", href: "/books" },
      // { name: "友链", href: "/friends" },
      { name: "关于", href: "/about" },
    ],
  },

  // 关于我页面配置
  about: {
    // 个人简介
    intro: {
      title: "个人简介",
      paragraphs: [
        "8年前端经验，拥有 2B/2G 的多个项目经验，具备 Web/H5/小程序 多端开发经验，有较强的解决问题能力。",
        "在工作之余，我喜欢阅读技术文章，探索新的技术领域。期望将新技术融入到实际项目，提高项目开发效率。",
      ]
    },

    // 职业技能
    technology: {
      title: "职业技能",
      paragraphs: [
        "1、熟练 vue2 / vue3 / vue-router / vuex / Pinia / element-ui / element-plus 等 vue 全家桶",
        "2、熟悉 react / react-router / redux / redux toolkit / MobX / Zustand / Ant Design 等 react 全家桶",
        "3、熟悉微信小程序、跨端 Taro，能使用 HTML5、CSS3、Canvas 等技术，进行小程序/H5 开发",
        "4、掌握 Node.js、Koa、Express、Next.js 等技术，能够开发封装组件、库发布到 npm 实现代码复用",
        "5、熟悉使用 React Hooks、Composition API、TypeScript、Websocket 等较热门技术，快速进行开发",
        "6、熟练 Git 版本管理，GitHub / GitLab / Coding 代码管理，Webpack / Vite 工具，Jenkins 部署平台",
        "7、掌握 qiankun、模块联邦等微前端技术及落地，AI 辅助编程工具 Cursor / GitHub Copilot 进行开发",
      ]
    },
    
    
    // 工作经历
    experience: {
      title: "工作经历",
      items: [
        {
          year: "2022.01.12 - 2025.05.27",
          title: "高级前端开发工程师", // 可选字段
          company: "广联达科技股份有限公司", // 可选字段
          // description: "工作描述。", // 可选字段
          highlights: [ // 可选字段，可以设为空数组
            "根据产品原型，使用react全家桶迭代开发开标、评标系统，vue全家桶迭代开发入围定标系统",
            "对接CA互通统一封装的中招协、网证通等第三方厂家API开发系统的签名/签章/解密/登录功能",
            "迭代交底需求开发与minishow反交底，对前端代码审查与分支管理，执行各迭代前端版本发版",
          ]
        },
        {
          year: "2017.07.10 - 2021.12.24",
          title: "前端开发工程师",
          company: "完美日记科技有限公司",
          // description: "工作描述。",
          highlights: [ // 可选字段，可以设为空数组
            "根据产品原型，使用 vue 全家桶开发 B 端后台系统，react 全家桶开发移动端页面应用",
            "开发公司内部组件库、插件，撰写使用文档，发布到内网私服供公司其他项目下载使用",
          ]
        }
      ]
    },

    // 项目经历
    project: {
      title: "项目经历",
      items: [
        {
          year: "2022.01 - 2025.05",
          title: "开标系统（PC 端网站）", // 可选字段
          description: "本项目是基于开标业务开发的系统，含开标一览表、投标人异议、投标文件解密等业务模块", // 项目描述，可选字段
          responsibility: "本人作为核心开发者，负责开标系统前端业务逻辑开发与迭代，给其他 2 名前端分任务、做排期", // 工作职责，可选字段
          stack: "react、react hooks、MobX、Ant Design、TypeScript、ESLint、Git Hooks、websocket", // 主要技术，可选字段
          highlights: [ // 可选字段，可以设为空数组
            "1、对接 CA 互通提供 API，实现系统可选指定方式的签名、签章，集成解密 SDK 实现投标人的解密功能",
            "2、通过 ESLint、git hooks 将代码规范嵌入开发流程，建立统一开发规范，降低协作成本，提升代码质量",
            "3、自定义 webpack 插件使用 environment 钩子和 chokidar 文件监听库，实现开发时路由文件自动生成",
            "4、使用断点续传，p-limit 控制并发数，支持取消上传、失败自动重试，将大文件上传成功率提升到 98%+",
            "5、使用 websocket 与服务端建立实时通信，实现投标人与招标代理在异议中的聊天界面实时刷新",
            "6、使用 React.memo、useMemo、useCallback 构建全链路缓存策略，减少无效渲染，提升性能",
          ]
        },
        {
          year: "2023.08 - 2025.05",
          title: "移动开标（微信小程序 + H5 端）", // 可选字段
          description: "一个基于 Taro 的跨端应用，针对远程开标为投标人提供查看项目、解密、异议等开标核心功能", // 可选字段
          responsibility: "作为核心开发者，负责移动开标前端业务逻辑开发与迭代，处理微信小程序和 H5 双端的适配", // 可选字段
          stack: "react、react hooks、Zustand、Taro、Taroify、Git Hooks、websocket", // 可选字段
          highlights: [ // 可选字段，可以设为空数组
            "1、封装统一的网络请求层与拦截器，实现自动添加认证 token、统一错误处理、不同环境的 baseUrl 切换",
            "2、使用 Taro.connectSocket 与服务端建立实时通信，实现投标人的项目详情、异议聊天页面实时刷新",
            "3、使用 Taroify 组件库开发项目卡片自定义组件展示项目信息，集成解密 SDK 实现投标人的解密功能",
            "4、使用 Zustand 进行应用状态管理，集中管理投标人信息、项目详情、解密状态、异议信息等数据",
          ]
        },
        {
          year: "2022.01 - 2025.05",
          title: "评标系统（PC 端网站））", // 可选字段
          description: "本项目是基于评标业务开发的系统，包括评委角色的评标系统，招标代理角色的评标管理系统", // 可选字段
          responsibility: "本人作为核心开发者，负责评标系统前端业务逻辑开发与迭代，给其他 2 名前端分任务、做排期", // 可选字段
          stack: "react、react hooks、redux、Ant Design、dplayer、react-ueditor", // 可选字段
          highlights: [ // 可选字段，可以设为空数组
            "1、主导评标前端模块架构 monorepo 设计与落地，拆解单体应用为 5 个子应用，支持独立启动、打包部署",
            "2、通过 Context+useReducer 实现部分深度嵌套组件的内部状态管理，减少 Redux 依赖，降低复杂度",
            "3、使用 React.lazy+Suspense 实现路由懒加载，通过 fallback 实现异步加载态统一管理，提升用户体验",
            "4、重写 dplayer 插件 seek 跳转到特定时间方法，实现禁止使用按键和拖拽进度条操作快进的视频播放组件",
            "5、集成网证通 JS 版 SDK，按指定位置与页数签章，输出文件流或签章密文，实现单个 PDF 单人或多人签章",
            "6、使用 react-ueditor 插件，加载回显原评标报告 html 到富文本编辑器，实现对评标报告的编辑操作",
          ]
        },
        {
          year: "2022.05 - 2025.05",
          title: "入围定标系统（PC 端网站）", // 可选字段
          description: "本项目是基于入围定标开发的系统，含组建入围/定标委员会、设置入围/定标参数、票决等模块", // 可选字段
          responsibility: "作为核心开发者，负责入围定标系统前端业务逻辑开发与迭代，给其他 2 名前端分任务、做排期", // 可选字段
          stack: "vue、element-ui、vuex、worker、websocket、print-js、ag-grid-vue", // 可选字段
          highlights: [ // 可选字段，可以设为空数组
            "1、通过定义 CSS 变量和使用 rem 单位，localStorage 持久化存储用户设置，实现页面字体动态缩放功能",
            "2、使用 Worker 开启多线程，解决定时器在非激活页签下失效问题，实现系统无操作 5 分钟自动退出功能",
            "3、使用 websocket 与服务端建立实时通信，实现入围/定标各专家页面数据实时刷新，流程导航自动下推",
            "4、使用 print-js 插件实现成员列表的 Excel 打印功能，使用 ag-grid-vue 实现表格行 row 拖拽排序功能",
            "5、调用服务端封装的第三方人脸认证 API，实现开发系统的微信 APP、PC 端摄像头的人脸认证登录功能",
          ]
        },
        {
          year: "2017.07 - 2021.12",
          title: "OA 考勤系统（PC 后台 + 移动端）", // 可选字段
          description: "本项目含考勤组管理、班次管理、人员排班、考勤统计、审批单管理等模块的考勤系统", // 可选字段
          responsibility: "本人负责考勤系统 PC 后台、移动端、流程审批申请等所有考勤业务逻辑开发与迭代", // 可选字段
          stack: "vue、element-ui、axios、vuex、react、react hooks、MobX、Ant Design、Git", // 可选字段
          highlights: [ // 可选字段，可以设为空数组
            "1、优化 el-table 实现人员排班，单击单元格可由文本切换为 el-select 组件，优化页面渲染，减少卡顿",
            "2、使用 react hooks 封装移动端考勤日历组件，可自定义星期显示顺序和单元格内容，增加拓展和复用",
            "3、参与开发公司内部 UI 组件库 ys-ui，将日常业务使用较多的情景封装为公共组件，安装引入来使用",
            "4、改造 element-ui 的 DateTimePicker 源码，封装为 date-time-picker-pro 发布到 npm 供安装引用",
            "5、熟练使用 rebase/merge/cherry-pick 等 Git 指令集成开发，自定义编辑 sh 命令对 Git 指令合成使用",
          ]
        },
        {
          year: "2021.04 - 2021.12",
          title: "PLM 系统（后台管理）", // 可选字段
          description: "本项目有原料库、配方库、测试管理、权限管理等业务的产品研发管理系统", // 可选字段
          responsibility: "本人负责原料库、配方库、测试管理、权限管理等所有业务逻辑开发", // 可选字段
          stack: "vue、vue-router、vue-print-nb、sortablejs", // 可选字段
          highlights: [ // 可选字段，可以设为空数组
            "1、使用 vue-router 结合后台配置路由，读取组件文件目录及名称，实现动态自动引入组件映射页面路由",
            "2、使用 vue-print-nb 插件实现页面打印功能，使用 sortablejs 实现表格行可进行 row 拖拽排序功能",
            "3、使用 mixins 进行复用，使用 require.context 动态读取目录文件，快速动态注册自定义指令和组件",
          ]
        },
      ]
    },

    // 教育背景
    education: {
      title: "教育背景",
      items: [
        {
          year: "2013.09 - 2017.07",
          degree: "机械设计制造及其自动化 学士",
          school: "广州大学",
          description: "主修机械设计制造及其自动化，第二专业辅修计算机科学与技术。",
          // gpa: "3.8/4.0"
        }
      ]
    },
    
    // 技能专长
    skills: {
      title: "技能专长",
      categories: [
        {
          name: "前端技术",
          skills: [
            { name: "JavaScript/TypeScript", level: 90 },
            { name: "HTML5/CSS3", level: 85 },
            { name: "React/Next.js", level: 80 },
            { name: "Vue/Nuxt.js", level: 80 },
            { name: "微信原生小程序/Taro", level: 80 },
            { name: "Ant Design/Element UI", level: 75 },
            { name: "Webpack/Vite/Rollup", level: 70 },
          ]
        },
        {
          name: "服务端与运维",
          skills: [
            { name: "Node.js", level: 90 },
            { name: "Express/Koa", level: 85 },
            { name: "Jenkins", level: 80 },
            { name: "Git/GitHub", level: 80 },
            { name: "Nginx", level: 75 },
            { name: "MySQL", level: 75 },
            { name: "CI/CD", level: 75 },
          ]
        },
      ]
    },
  },

  // 项目配置
  projects: {
    enabled: true, // 是否启用项目页面
    title: "项目",
    description: "探索技术作品与创新项目",
    items: [
      {
        id: "homepage",
        title: "个人主页",
        description: "基于 Next.js 的个人主页模板，支持博客、随笔、项目等功能",
        image: "/images/projects/homepage.png",
        tags: ["Next.js", "TypeScript", "Tailwind CSS"],
        github: "https://github.com/Ducr/homepage",
        demo: "https://ducrong.com",
        status: "active", // active-进行中 | completed-已完成 | archived-已归档
        featured: true
      },
      {
        id: "ai-chat-web",
        title: "AI Chat",
        description: "基于 Vue3.5 + Vite 搭建的 AI Chat 应用，支持 AI 对话聊天",
        image: "/images/projects/ai-chat.png",
        tags: ["Vue3", "Vite", "SSE"],
        github: "https://github.com/Ducr/ai-chat-web",
        demo: "https://ducrong.com/chat",
        status: "completed",
        featured: true
      },
      {
        id: "qiankun-demo",
        title: "Qiankun Demo",
        description: "使用 qiankun 改造的微前端落地示例，用于在线演示微前端效果",
        image: "/images/projects/qiankun-demo.png",
        tags: ["qiankun", "Vue", "React", "npm-run-all"],
        github: "https://github.com/Ducr/qiankun-demo",
        demo: "https://ducrong.com/qiankun",
        status: "archived",
        featured: true
      },
      {
        id: "ai-chat-server",
        title: "AI Chat 服务端",
        description: "使用 Node.js + Koa + Deepseek API 搭建的服务端，为 AI Chat 应用提供后端API服务",
        image: "/images/projects/ai-chat.png",
        tags: ["Node.js", "Koa", "Deepseek API"],
        github: "https://github.com/Ducr/ai-chat-server",
        demo: "https://ducrong.com/chat",
        status: "completed",
        featured: false
      },
      {
        id: "DateTimePickerPro",
        title: "DateTimePickerPro",
        description: "基于element-ui的DatePicker和DateTimePicker二次封装，可配置分钟、秒钟自定义步距的组件",
        image: "/images/projects/DateTimePickerPro.png",
        tags: ["Vue", "element-ui"],
        github: "https://github.com/Ducr/DateTimePickerPro",
        // demo: "https://ducrong.com/chat",
        status: "archived",
        featured: false
      },
    ]
  },

  // 书籍推荐配置
  books: {
    enabled: false, // 是否启用书籍页面
    title: "书籍",
    description: "分享值得阅读的好书，记录阅读心得",
    items: [
      {
        id: "clean-code",
        title: "代码整洁之道",
        author: "Robert C. Martin",
        rating: 5,
        status: "reading", // reading | read | want_to_read
        cover: "/images/books/clean-code.jpg",
        description: "代码质量与其整洁度成正比。干净的代码，既在质量上可靠，也为后期维护奠定基础。",
        review: "这本书彻底改变了我对编程的认知，让我明白了什么是真正优秀的代码。",
        tags: ["编程", "软件工程", "最佳实践"],
        readDate: "2024-01-15",
        featured: true,
        purchaseLinks: {
          jd: "https://item.jd.com/46401025666.html",
          douban: "https://book.douban.com/subject/4199741/",
          // douban: '豆瓣',
          // amazon: '亚马逊',
          // taobao: '淘宝',
          // tmall: '天猫',
          // jd: '京东',
          // dangdang: '当当',
          // pdd: '拼多多',
        }
      },
      {
        id: "thinking-fast-slow",
        title: "思考，快与慢",
        author: "丹尼尔·卡尼曼",
        rating: 5,
        status: "read",
        cover: "/images/books/thinking-fast-slow.jpg",
        description: "诺贝尔经济学奖得主丹尼尔·卡尼曼的经典著作，揭示人类思维的双重系统。",
        review: "深度解析了人类决策过程，让我重新审视自己的思维模式。",
        tags: ["心理学", "认知科学", "决策"],
        readDate: "2023-12-20",
        featured: true,
        purchaseLinks: {
          douban: "https://book.douban.com/subject/10785583/"
        }
      },
      {
        id: "sapiens",
        title: "人类简史",
        author: "尤瓦尔·赫拉利",
        rating: 5,
        status: "read",
        cover: "/images/books/sapiens.jpg",
        description: "从认知革命、农业革命到科学革命，梳理影响人类发展的重大脉络。",
        review: "宏观视角下的人类历史，思维开阔，见解独特。",
        tags: ["历史", "人类学", "社会"],
        readDate: "2023-11-10",
        featured: true,
        purchaseLinks: {
          douban: "https://book.douban.com/subject/25985021/"
        }
      },
      {
        id: "design-patterns",
        title: "设计模式：可复用面向对象软件的基础",
        author: "Gang of Four",
        rating: 4,
        status: "reading",
        cover: "/images/books/design-patterns.jpg",
        description: "软件工程领域的经典著作，介绍23种设计模式。",
        review: "正在阅读中，对理解软件架构很有帮助。",
        tags: ["设计模式", "软件架构", "面向对象"],
        featured: false,
        purchaseLinks: {
          douban: "https://book.douban.com/subject/1052241/"
        }
      },
      {
        id: "the-pragmatic-programmer",
        title: "程序员修炼之道",
        author: "David Thomas & Andrew Hunt",
        rating: 5,
        status: "want_to_read",
        cover: "/images/books/pragmatic-programmer.jpg",
        description: "程序员的必读经典，涵盖软件开发的方方面面。",
        tags: ["编程哲学", "软件开发", "职业发展"],
        featured: false,
        purchaseLinks: {
          douban: "https://book.douban.com/subject/1417047/"
        }
      },
    ]
  },

  // 友链配置
  friends: {
    enabled: false, // 是否启用友链页面
    title: "友链",
    description: "志同道合的朋友们",
    items: [
      {
        id: "example-friend-1",
        name: "示例朋友",
        description: "这是一个示例朋友的描述",
        avatar: "https://avatars.githubusercontent.com/u/1?v=4",
        url: "https://example.com",
        featured: true,
        status: "active", // active | inactive
        tags: ["技术", "博客", "前端"]
      },
      {
        id: "example-friend-2", 
        name: "另一个朋友",
        description: "另一个朋友的网站，专注于后端技术分享",
        avatar: "https://avatars.githubusercontent.com/u/2?v=4",
        url: "https://example2.com",
        featured: false,
        status: "active",
        tags: ["后端", "Java", "Spring"]
      },
      {
        id: "example-friend-3",
        name: "设计师朋友",
        description: "专业UI/UX设计师，分享设计心得与作品",
        avatar: "https://avatars.githubusercontent.com/u/3?v=4",
        url: "https://example3.com",
        featured: true,
        status: "active",
        tags: ["设计", "UI/UX", "创意"]
      }
    ]
  },

  // SEO配置
  seo: {
    keywords: [
      "个人主页",
      "前端开发",
      "React",
      "Next.js",
      "TypeScript",
    ],
    openGraph: {
      type: "website",
      locale: "zh_CN",
      siteName: "个人主页",
    },
  },

  // 分析工具
  analytics: {
    googleAnalyticsId: "G-XXXXXXX", // Google Analytics ID
  },

  // 评论系统配置
  comments: {
    enabled: true, // 是否启用评论功能
    provider: "giscus", // 评论系统提供商: giscus | gitalk | valine | waline
    
    // Giscus 配置 (推荐)
    giscus: { // 通过 https://giscus.app/zh-CN 生成以下参数
      repo: "Ducr/homepage", // GitHub 仓库地址，格式: owner/repo
      repoId: "R_kgDOQHBoMw", // GitHub 仓库 ID
      category: "General", // GitHub Discussions 分类
      categoryId: "DIC_kwDOQHBoM84Cw7iY", // GitHub Discussions 分类 ID
      mapping: "pathname", // 页面映射方式: pathname | url | title
      theme: "noborder_light", // 主题: light | dark | preferred_color_scheme
      lang: "zh-CN", // 语言
      loading: "eager", // 加载方式: lazy | eager
      reactionsEnabled: true, // 是否启用表情回应
      emitMetadata: false, // 是否输出元数据
      inputPosition: "bottom", // 输入框位置: top | bottom
    },
    
    // Gitalk 配置
    gitalk: {
      clientID: "", // GitHub OAuth App Client ID
      clientSecret: "", // GitHub OAuth App Client Secret
      repo: "", // GitHub 仓库名
      owner: "", // GitHub 用户名
      admin: [], // 管理员用户名列表，格式: ["admin1", "admin2"]
      language: "zh-CN", // 语言
      perPage: 10, // 每页评论数
      distractionFreeMode: false, // 无干扰模式
      pagerDirection: "last", // 分页方向: last | first
      createIssueManually: false, // 是否手动创建 Issue
      enableHotKey: true, // 是否启用快捷键
    },
    
    // Valine 配置
    valine: {
      appId: "", // LeanCloud App ID
      appKey: "", // LeanCloud App Key
      placeholder: "请输入评论内容...", // 输入框占位符
      avatar: "mp", // 头像类型: mp | identicon | monsterid | wavatar | retro | hide
      meta: ["nick", "mail", "link"], // 评论者信息字段
      pageSize: 10, // 每页评论数
      lang: "zh-CN", // 语言
      visitor: true, // 是否启用访问量统计
      highlight: true, // 是否启用代码高亮
      recordIP: false, // 是否记录 IP
      enableQQ: true, // 是否启用 QQ 头像
      requiredFields: ["nick", "mail"], // 必填字段
    },
    
    // Waline 配置
    waline: {
      serverURL: "", // Waline 服务器地址
      placeholder: "请输入评论内容...", // 输入框占位符
      avatar: "mp", // 头像类型: mp | identicon | monsterid | wavatar | retro | hide
      meta: ["nick", "mail", "link"], // 评论者信息字段
      pageSize: 10, // 每页评论数
      lang: "zh-CN", // 语言
      visitor: true, // 是否启用访问量统计
      highlight: true, // 是否启用代码高亮
      recordIP: false, // 是否记录 IP
      enableQQ: true, // 是否启用 QQ 头像
      requiredFields: ["nick", "mail"], // 必填字段
    },
  },

  // 底部栏配置
  footer: {
    copyright: {
      owner: "yourName", // 版权所有者
      startYear: "2025", // 开始年份
      showCurrentYear: true, // 是否显示当前年份
    },
    beian: { // 没有可不填
      // police: "沪公网安备31011500000000号", // 公安备案号
      icp: "粤ICP备2025484976号-1", // ICP备案号
    },
  },

  // 部署配置 - 已禁用 GitHub Pages 支持
  // deployment: {
  //   baseUrl: "/homepage",
  //   // 基础路径配置 - 总是填写你的仓库名
  //   // 如果项目为 yourName.github.io 则为空
  //   // GitHub Pages 部署时通过 GITHUB_PAGES=true 环境变量启用此配置
  //   // 自定义域名部署时不设置 GITHUB_PAGES 环境变量，会忽略此配置
  // },
}; 