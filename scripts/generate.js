const fs=require('fs'),path=require('path'),today=new Date().toISOString().slice(0,10),slug=today;
const feed=JSON.parse(fs.readFileSync(path.join(__dirname,'..','feed.json'),'utf8'));
if(feed.posts.find(p=>p.slug===slug)){console.log('Exists');process.exit(0)}
const pool=[
[{title:'减肥为什么不能节食？基础代谢的真相',desc:'节食会让身体进入节能模式，基础代谢率下降20-30%。恢复正常饮食后更容易反弹。',tag:'减肥知识'},
{title:'每天快走30分钟能瘦吗？答案是能',desc:'快走是最容易坚持的有氧运动。每天30分钟快走+控制饮食，一个月能瘦2-3公斤。',tag:'运动减肥'},
{title:'减肥期间的主食怎么吃？这5种代替米饭',desc:'糙米、燕麦、红薯、玉米、荞麦面升糖指数低，饱腹感强，热量只有白米饭的一半。',tag:'饮食减肥'}],
[{title:'平台期怎么突破？改变3个习惯继续瘦',desc:'减肥2个月不掉秤正常。试试改变运动方式、调整碳水摄入时间、增加蛋白质比例。',tag:'减肥知识'},
{title:'晚上吃什么不容易胖？低卡晚餐推荐',desc:'蒸鱼+凉拌菜+杂粮饭是最佳搭配。晚餐热量控制在300-400卡，睡前3小时吃完。',tag:'饮食减肥'},
{title:'HIIT和跑步哪个减肥效果好？',desc:'HIIT燃脂效率更高，20分钟HIIT≈40分钟跑步。但膝盖不好的人不建议HIIT。',tag:'运动减肥'}],
[{title:'喝水能减肥吗？每天喝多少水合适',desc:'餐前喝500ml水能减少进食量。每天2-3升水促进新陈代谢。冰水比常温水多消耗热量。',tag:'减肥知识'},
{title:'减肥零食推荐：这8种零食吃了不胖',desc:'无糖酸奶、海苔、黄瓜条、圣女果、蛋白棒、魔芋丝、毛豆、苹果。控制量是关键。',tag:'饮食减肥'},
{title:'腹部脂肪最难减？试试这5个动作',desc:'平板支撑、卷腹、俄罗斯转体、仰卧举腿、登山跑。每天15分钟+有氧运动效果最好。',tag:'运动减肥'}],
[{title:'大基数减肥怎么开始？200斤以上看过来',desc:'大体重先别跑步伤膝盖。从游泳、快走、椭圆机开始。重点控制饮食，先减重再塑形。',tag:'大体重'},
{title:'减肥期间外食怎么吃？火锅烤肉都不怕',desc:'火锅选清汤锅底+海鲜蔬菜+少蘸料。烤肉去肥肉+生菜包+不蘸酱。原则：多蛋白少油。',tag:'饮食减肥'},
{title:'拉伸对减肥有帮助吗？比你想的重要',desc:'拉伸不能直接燃脂，但能改善肌肉线条、防止运动损伤、加速恢复。运动后必拉伸10分钟。',tag:'运动减肥'}],
[{title:'减肥早餐的重要性：不吃早餐更易发胖',desc:'不吃早餐会导致午餐暴食。优质早餐=蛋白质+粗粮+水果：鸡蛋+燕麦+苹果就很好。',tag:'饮食减肥'},
{title:'跳绳减肥效果好吗？每天跳多少',desc:'跳绳10分钟≈慢跑30分钟。新手从每天500个开始，逐步加到2000个。注意穿鞋在软地跳。',tag:'运动减肥'},
{title:'减肥茶和酵素真的有用吗？',desc:'大多数减肥茶是泻药成分，酵素只是蛋白质。唯一有效的减脂方式是热量缺口。',tag:'避坑指南'}],
[{title:'姨妈期怎么减肥？经期运动和饮食指南',desc:'经期前两天休息，第三天开始低强度运动。经期代谢微升但不是暴食的借口。',tag:'女性减肥'},
{title:'减肥成功后怎么保持不反弹？',desc:'不要马上恢复之前的饮食。每周增加100-200卡路里逐步过渡。保持运动习惯不可停。',tag:'保持身材'},
{title:'夏天减肥的黄金期：高温帮助燃脂',desc:'夏天食欲自然下降+天热代谢加快。多吃凉拌菜水果，游泳是最佳夏日运动。',tag:'减肥知识'}],
[{title:'代餐能代替正餐吗？优缺点分析',desc:'代餐方便控制热量但不建议长期替代。每周最多2-3次，其余时间正常均衡饮食。',tag:'饮食减肥'},
{title:'睡前做这几个动作：躺着也能瘦小腿',desc:'仰卧蹬自行车、靠墙抬腿、脚踝绕圈。每个动作2分钟，促进血液循环消水肿。',tag:'局部瘦身'},
{title:'减肥心理：为什么总是坚持不下来',desc:'目标定太大、完美主义、社交压力。改成小目标每周减0.5kg。偶尔吃多不要自暴自弃。',tag:'减肥心理'}],
[{title:'低碳水饮食真的好吗？优缺点分析',desc:'低碳水前期掉秤快但主要是水分。长期低碳水可能导致精力差、便秘。适量碳水更持久。',tag:'减肥知识'},
{title:'跑步减肥的正确姿势和避免误区',desc:'脚掌中部先着地、身体微微前倾、手臂前后摆动不过中线。跑前热身跑后拉伸各5分钟。',tag:'运动减肥'},
{title:'一周减肥食谱参考：三餐都安排好了',desc:'早餐：鸡蛋+全麦面包+牛奶。午餐：瘦肉+蔬菜+杂粮饭。晚餐：鱼+凉拌菜。加餐：水果坚果。',tag:'饮食减肥'}],
];
const idx=(new Date().getDate()-1)%pool.length,items=pool[idx];
const postTitle=`健康减肥 | ${items[0].tag}`;
feed.posts.unshift({slug,date:today,title:postTitle,items});feed.updated=today;
fs.writeFileSync(path.join(__dirname,'..','feed.json'),JSON.stringify(feed,null,2));
const html=`<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${postTitle}</title><meta name="description" content="${items.map(i=>i.title).join('、')}"><style>*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}:root{--bg:#fafafa;--card:#fff;--text:#1a1a2e;--t2:#666;--accent:#7c3aed;--border:#e5e7eb;--r:10px}body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans SC",sans-serif;background:var(--bg);color:var(--text);line-height:1.7}.container{max-width:800px;margin:0 auto;padding:0 20px}header{background:var(--card);border-bottom:1px solid var(--border);padding:20px 0;margin-bottom:32px}header a{color:var(--accent);text-decoration:none;font-size:.9rem}header h1{font-size:1.3rem;margin-top:8px}.post{background:var(--card);border:1px solid var(--border);border-radius:var(--r);padding:28px}.post .date{color:var(--t2);font-size:.8rem;margin-bottom:20px}.entry{margin-bottom:24px;padding-bottom:20px;border-bottom:1px solid var(--border)}.entry:last-child{border-bottom:none}.entry h3{font-size:1rem;margin-bottom:4px}.entry p{color:var(--t2);font-size:.9rem}.tag{display:inline-block;background:#f5f3ff;color:var(--accent);font-size:.72rem;padding:2px 8px;border-radius:10px;margin-left:6px}footer{text-align:center;padding:32px 20px;color:var(--t2);font-size:.8rem}@media(max-width:600px){.post{padding:18px}}</style></head><body><header><div class="container"><a href="../index.html">← 首页</a><h1>${postTitle}</h1></div></header><main class="container"><article class="post"><div class="date">📅 ${today}</div>${items.map(i=>`<div class="entry"><h3>${i.title} <span class="tag">${i.tag}</span></h3><p>${i.desc}</p></div>`).join('')}</article></main><footer><p>健康减肥指南 · 每日更新</p></footer></body></html>`;
fs.writeFileSync(path.join(__dirname,'..','posts',`${slug}.html`),html);
console.log('Generated:',postTitle);
