const {action_data, generateUUID} = $.require('./_lib.action.js');
const {
    _checkQuarkStatus,
    _checkUCStatus,
    _checkAliStatus,
    _checkBiliStatus,
    QRCodeHandler,
    qrcode
} = $.require('./_lib.scan.js');
// 访问测试 http://127.0.0.1:5757/api/设置中心?ac=action&action=set-cookie
// 访问测试 http://127.0.0.1:5757/api/设置中心?ac=action&action=quarkCookieConfig&value={"cookie":"我是cookie"}

var rule = {
    类型: '设置',
    title: '设置中心',
    推荐: async function () {
        let {publicUrl} = this;
        // log('publicUrl:', publicUrl);
        let setIcon = urljoin(publicUrl, './images/icon_cookie/设置.png');
        let chatIcon = urljoin(publicUrl, './images/icon_cookie/chat.webp');
        action_data.forEach(it => {
            if (!it.vod_pic) {
                it.vod_pic = setIcon;
            }
            if (it.vod_name === '连续对话') {
                it.vod_pic = chatIcon;
            }
        });
        return action_data;
    },
    // 推荐样式
    hikerListCol: 'icon_round_4',
    // 分类列表样式
    hikerClassListCol: 'avatar',
    // home_flag: '3-0-S',
    home_flag: '5',
    class_flag: '3-11-S',
    more: {
        sourceTag: '设置,动作',
        actions: [
            {
                name: '连续对话', action: JSON.stringify({
                    actionId: '连续对话',
                    id: 'talk',
                    type: 'input',
                    title: '连续对话',
                    tip: '请输入消息',
                    value: '',
                    msg: '开始新的对话',
                    button: 3,
                    imageUrl: 'https://img2.baidu.com/it/u=1206278833,3265480730&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
                    imageHeight: 200,
                    imageType: 'card_pic_3',
                    keep: true,
                    width: 680,
                    height: 800,
                    msgType: 'long_text',
                    httpTimeout: 60,
                    canceledOnTouchOutside: false,
                })
            },
            {name: '查看夸克cookie', action: '查看夸克cookie'},
            {name: '设置夸克cookie', action: '设置夸克cookie'},
            {name: '夸克扫码', action: '夸克扫码'},
            {
                name: '设置玩偶域名', action: JSON.stringify({
                    actionId: '玩偶域名',
                    id: 'domain',
                    type: 'input',
                    width: 450,
                    title: '玩偶域名',
                    tip: '请输入玩偶域名',
                    value: '',
                    msg: '选择或输入使用的域名',
                    selectData: '1:=https://www.wogg.net/,2:=https://wogg.xxooo.cf/,3:=https://wogg.888484.xyz/,4:=https://www.wogg.bf/,5:=https://woggapi.333232.xyz/'
                }),
            }],
    },
    UCScanCheck: null,
    quarkScanCheck: null,
    aliScanCheck: null,
    biliScanCheck: null,
    host: 'http://empty',
    class_name: '推送&夸克&UC&阿里&哔哩&系统配置&测试',
    class_url: 'push&quark&uc&ali&bili&system&test',
    url: '/fyclass',

    一级: async function (tid, pg, filter, extend) {
        let {input, MY_CATE, MY_PAGE, publicUrl} = this;
        // log('publicUrl:', publicUrl);
        if (MY_PAGE > 1) {
            return []
        }
        let images = {
            'quark': urljoin(publicUrl, './images/icon_cookie/夸克.webp'),
            'uc': urljoin(publicUrl, './images/icon_cookie/UC.png'),
            'ali': urljoin(publicUrl, './images/icon_cookie/阿里.png'),
            'bili': urljoin(publicUrl, './images/icon_cookie/哔哩.png'),
            'adult': urljoin(publicUrl, './images/icon_cookie/chat.webp'),
            'test': urljoin(publicUrl, './icon.svg'),
            'lives': urljoin(publicUrl, './images/lives.jpg'),
            'settings': urljoin(publicUrl, './images/icon_cookie/设置.png'),
            'read': urljoin(publicUrl, './images/icon_cookie/阅读.png'),
        };
        let d = [];
        switch (MY_CATE) {
            case 'push':
                let quick_data = {
                    腾讯: 'https://v.qq.com/x/cover/mzc00200vkqr54u/u4100l66fas.html',
                    爱奇艺: 'http://www.iqiyi.com/v_1b0tk1b8tl8.html',
                    夸克: 'https://pan.quark.cn/s/6c8158e258f3',
                    UC: 'https://drive.uc.cn/s/59023f57d3ce4?public=1',
                    阿里: 'https://www.alipan.com/s/vgXMcowK8pQ',
                    直链1: 'https://vdse.bdstatic.com//628ca08719cef5987ea2ae3c6f0d2386.mp4',
                    嗅探1: 'https://www.6080kk.cc/haokanplay/178120-1-1.html',
                    嗅探2: 'https://www.hahads.com/play/537106-3-1.html',
                    多集: 'https://v.qq.com/x/cover/m441e3rjq9kwpsc/m00253deqqo.html#https://pan.quark.cn/s/6c8158e258f3',
                    海阔二级单线路: gzip(JSON.stringify({
                        "actor": "剧集",
                        "content": "【道长DR】　　围绕上世纪30年代的上海滩，讲述了两位坚韧勇敢的女性在波澜诡谲的民国时代相互救赎、完成蜕变的动人故事。 收起",
                        "director": "qingbenjiaren2024",
                        "from": "线路223",
                        "name": "卿本佳人2024",
                        "pic": "https://pic3.yzzyimages.com/upload/vod/2024-11-21/17321619851.jpg",
                        "url": "第01集$https://b.6080z.com/vodplay/101329-4-1.html#第02集$https://b.6080z.com/vodplay/101329-4-2.html#第03集$https://b.6080z.com/vodplay/101329-4-3.html#第04集$https://b.6080z.com/vodplay/101329-4-4.html#第05集$https://b.6080z.com/vodplay/101329-4-5.html#第06集$https://b.6080z.com/vodplay/101329-4-6.html#第07集$https://b.6080z.com/vodplay/101329-4-7.html#第08集$https://b.6080z.com/vodplay/101329-4-8.html#第09集$https://b.6080z.com/vodplay/101329-4-9.html#第10集$https://b.6080z.com/vodplay/101329-4-10.html#第11集$https://b.6080z.com/vodplay/101329-4-11.html#第12集$https://b.6080z.com/vodplay/101329-4-12.html#第12集$https://b.6080z.com/vodplay/101329-4-13.html#第13集$https://b.6080z.com/vodplay/101329-4-14.html#第14集$https://b.6080z.com/vodplay/101329-4-15.html#第15集$https://b.6080z.com/vodplay/101329-4-16.html#第16集$https://b.6080z.com/vodplay/101329-4-17.html#第17集$https://b.6080z.com/vodplay/101329-4-18.html#第18集$https://b.6080z.com/vodplay/101329-4-19.html#第19集$https://b.6080z.com/vodplay/101329-4-20.html#第20集$https://b.6080z.com/vodplay/101329-4-21.html#第21集$https://b.6080z.com/vodplay/101329-4-22.html#第22集$https://b.6080z.com/vodplay/101329-4-23.html"
                    })),
                };
                let quick_data1 = {
                    '大一实习': 'https://fanqienovel.com/page/7421167583522458648',
                    '十日终焉': 'https://fanqienovel.com/page/7143038691944959011',
                    '斩神': 'https://fanqienovel.com/page/6982529841564224526',
                };
                let selectDataList = [];
                let selectDataList1 = [];
                for (let key of Object.keys(quick_data)) {
                    selectDataList.push(`${key}:=${quick_data[key]}`);
                }
                let selectData = selectDataList.join(',');
                // log(selectData);
                for (let key of Object.keys(quick_data1)) {
                    selectDataList1.push(`${key}:=${quick_data1[key]}`);
                }
                let selectData1 = selectDataList1.join(',');
                // log(selectData);
                d.push({
                    vod_id: JSON.stringify({
                        actionId: '推送视频播放',
                        id: 'push',
                        type: 'input',
                        title: '推送视频地址进行播放',
                        tip: '支持网盘、官链、直链、待嗅探链接',
                        value: '',
                        msg: '请输入待推送的视频地址',
                        imageUrl: images.lives,
                        imageHeight: 200,
                        imageType: 'card_pic_3',
                        keep: true,
                        button: 4,
                        width: 640,
                        // selectData: '腾讯:=https://v.qq.com/x/cover/m441e3rjq9kwpsc/l0045w5hv1k.html,2:=bb输入默认值bbbbb,3:=c输入默认值ddd,4:=输入默认值,5:=111,6:=22222,7:=HOHO,HELLO,world'
                        selectData: selectData
                    }),
                    vod_name: '推送视频播放',
                    vod_pic: images.lives,
                    vod_tag: 'action'
                },);

                d.push({
                    vod_id: JSON.stringify({
                        actionId: '推送番茄小说',
                        id: 'push',
                        type: 'input',
                        title: '推送番茄小说网页目录链接进行解析',
                        tip: '支持番茄小说网页版链接',
                        value: 'https://fanqienovel.com/page/7421167583522458648',
                        msg: '请输入待推送的番茄小说网页版链接',
                        imageUrl: images.read,
                        imageHeight: 200,
                        imageType: 'card_pic_3',
                        keep: false,
                        selectData: selectData1
                    }),
                    vod_name: '推送番茄小说',
                    vod_pic: images.read,
                    vod_tag: 'action'
                },);
                break;

            case 'quark':
                d.push(genMultiInput('quark_cookie', '设置夸克 cookie', null, images.quark));
                d.push(getInput('get_quark_cookie', '查看夸克 cookie', images.quark));
                d.push({
                    vod_id: '夸克扫码',
                    vod_name: '夸克扫码',
                    vod_pic: images.quark,
                    vod_remarks: '夸克',
                    vod_tag: 'action'
                });
                break;
            case 'uc':
                d.push(genMultiInput('uc_cookie', '设置UC cookie', null, images.uc));
                d.push(getInput('get_uc_cookie', '查看UC cookie', images.uc));
                d.push({
                    vod_id: 'UC扫码',
                    vod_name: 'UC扫码',
                    vod_pic: images.uc,
                    vod_remarks: 'UC',
                    vod_tag: 'action'
                });
                break;
            case 'ali':
                d.push(genMultiInput('ali_token', '设置阿里 token', null, images.ali));
                d.push(getInput('get_ali_token', '查看阿里 token', images.ali));
                d.push({
                    vod_id: '阿里扫码',
                    vod_name: '阿里扫码',
                    vod_pic: images.ali,
                    vod_remarks: '阿里',
                    vod_tag: 'action'
                });
                break;
            case 'bili':
                d.push(genMultiInput('bili_cookie', '设置哔哩 cookie', null, images.bili));
                d.push(getInput('get_bili_cookie', '查看哔哩 cookie', images.bili));
                d.push({
                    vod_id: '哔哩扫码',
                    vod_name: '哔哩扫码',
                    vod_pic: images.bili,
                    vod_remarks: '哔哩',
                    vod_tag: 'action'
                });
                break;
            case 'system':
                d.push(genMultiInput('hide_adult', '设置青少年模式', '把值设置为1将会在全部接口隐藏18+源，其他值不过滤，跟随订阅', images.settings));
                d.push(getInput('get_hide_adult', '查看青少年模式', images.settings));
                d.push(genMultiInput('thread', '设置播放代理线程数', '默认为1，可自行配置成其他值如:10', images.settings));
                d.push(getInput('get_thread', '查看播放代理线程数', images.settings));
                d.push(genMultiInput('now_ai', '设置当前AI', '1: 讯飞星火 2:deepseek 3.讯飞智能体\n如果不填，连续对话默认使用讯飞星火', images.settings));
                d.push(getInput('get_now_ai', '查看当前AI', images.settings));
                d.push(genMultiInput('allow_forward', '设置允许代理转发', '设置为1可启用此功能，有一定的使用场景用于突破网络限制', images.settings));
                d.push(getInput('get_allow_forward', '查看允许代理转发', images.settings));
                d.push(genMultiInput('spark_ai_authKey', '设置讯飞AI鉴权', '在这个页面的http鉴权信息:\nhttps://console.xfyun.cn/services/bm4', images.settings));
                d.push(getInput('get_spark_ai_authKey', '查看讯飞AI鉴权', images.settings));
                d.push(genMultiInput('deepseek_apiKey', '设置deepseek AI鉴权', '在这个页面的http鉴权信息:\nhttps://platform.deepseek.com/api_keys', images.settings));
                d.push(getInput('get_deepseek_apiKey', '查看deepseek AI鉴权', images.settings));
                d.push(genMultiInput('sparkBotObject', '设置讯飞星火智能体 AI鉴权', '设置对象形式，如:{"appId":"6fafca", "uid":"道长", "assistantId":"tke24zrzq3f1"}\n 在这个页面的http鉴权信息:\nhttps://xinghuo.xfyun.cn/botcenter/createbot', images.settings));
                d.push(getInput('get_sparkBotObject', '查看讯飞星火智能体 AI鉴权', images.settings));
                break;
            case 'test':
                d.push({
                    vod_id: "proxyStream",
                    vod_name: "测试本地代理流",
                    vod_pic: images.lives,
                    vod_desc: "流式代理mp4等视频"
                });
                break;
        }
        return d
    },
    二级: async function (ids) {
        let {input, orId, getProxyUrl} = this;
        // log(input, orId);
        if (orId === 'proxyStream') {
            let media_url = 'https://vdse.bdstatic.com//628ca08719cef5987ea2ae3c6f0d2386.mp4';
            return {
                vod_id: 'proxyStream',
                vod_name: '测试代理流',
                vod_play_from: 'drpyS本地流代理',
                vod_play_url: '测试播放流$' + getProxyUrl().replace('?do=js', media_url) + '#不代理直接播$' + media_url
            }
        }
    },
    play_parse: true,
    lazy: async function () {
        let {input} = this;
        return {parse: 0, url: input}
    },
    proxy_rule: async function () {
        let {input, proxyPath} = this;
        const url = proxyPath;
        log('start proxy:', url);
        try {
            const headers = {
                'user-agent': PC_UA,
            }
            return [200, null, url, headers, 2]
        } catch (e) {
            log('proxy error:', e.message);
            return [500, 'text/plain', e.message]
        }
    },
    action: async function (action, value) {
        let {httpUrl, publicUrl} = this;
        if (action === 'set-cookie') {
            return JSON.stringify({
                action: {
                    actionId: 'quarkCookieConfig',
                    id: 'cookie',
                    type: 'input',
                    title: '夸克Cookie',
                    tip: '请输入夸克的Cookie',
                    value: '原值',
                    msg: '此弹窗是动态设置的参数，可用于动态返回原设置值等场景'
                }
            });
        }
        if (action === 'quarkCookieConfig' && value) {
            try {
                const obj = JSON.parse(value);
                const val = obj.cookie;
                return "我收到了：" + value;
            } catch (e) {
                return '发生错误：' + e;
            }
        }

        if (action === '连续对话') {
            let content = JSON.parse(value);
            let prompt = content.talk.trim();
            if (!prompt) {
                return JSON.stringify({
                    action: {
                        actionId: '__keep__',
                    },
                    toast: '输入内容不可以为空哦~'
                });
                // return '输入内容不可以为空哦~'
            }
            // try {
            //     a = b;
            // } catch (e) {
            //     console.error('测试出错捕获：', e);
            // }
            // console.error('对象日志测试:', 0, '==== ', content, ' ====', true);

            if (prompt.startsWith('http')) {
                return JSON.stringify({
                    action: {
                        actionId: '__detail__',
                        skey: 'push_agent',
                        ids: prompt,
                    },
                    toast: '你要去看视频了'
                });
            }
            let user1 = '你';
            let user2 = 'AI';
            let replyContent = prompt;
            if (ENV.get('spark_ai_authKey')) {
                if (rule.askLock) {
                    return JSON.stringify({
                        action: {
                            actionId: '__keep__',
                            msg: '请等待AI思考完成...',
                            reset: false
                        },
                        toast: 'AI思考中，请稍候继续提问'
                    });
                }
                let AI = null;
                switch (ENV.get('now_ai', '1')) {
                    case '1':
                        AI = new AIS.SparkAI({
                            authKey: ENV.get('spark_ai_authKey'),
                            baseURL: 'https://spark-api-open.xf-yun.com',
                        });
                        user2 = '讯飞星火';
                        break;
                    case '2':
                        AI = new AIS.DeepSeek({
                            apiKey: ENV.get('deepseek_apiKey'),
                        });
                        user2 = 'deepSeek';
                        break;
                    case '3':
                        const sparkBotObject = ENV.get('sparkBotObject', {}, 1);
                        // log('sparkBotObject:', sparkBotObject);
                        AI = new AIS.SparkAIBot(sparkBotObject.appId, sparkBotObject.uid, sparkBotObject.assistantId);
                        user2 = '讯飞智能体';
                        break;
                }
                if (!AI) {
                    return '当前AI配置不正确，请进入设置中心-系统配置-设置当前AI'
                }
                rule.askLock = 1;
                try {
                    replyContent = await AI.ask(prompt, {temperature: 1.0});
                } catch (error) {
                    replyContent = error.message;
                }
                rule.askLock = 0;
            }
            return JSON.stringify({
                action: {
                    actionId: '__keep__',
                    msg: `${user1}:` + prompt + '\n' + `${user2}:` + replyContent,
                    reset: true,
                    msgType: 'long_text',
                },
                toast: '你有新的消息'
            });
        }

        if (action === '夸克扫码') {
            if (rule.quarkScanCheck) {
                console.log('请等待上个扫码任务完成：' + rule.quarkScanCheck);
                return '请等待上个扫码任务完成';
            }
            let requestId = generateUUID();
            log('httpUrl:', httpUrl);
            log('request_id:', requestId);
            let data = await post('https://uop.quark.cn/cas/ajax/getTokenForQrcodeLogin', {
                headers: {Referer: '', ...QRCodeHandler.HEADERS},
                data: {
                    request_id: requestId,
                    client_id: "532",
                    v: "1.2"
                }
            });
            console.log('data:', data);
            let qcToken = JSON.parse(data).data.members.token;
            let qrcodeUrl = `https://su.quark.cn/4_eMHBJ?token=${qcToken}&client_id=532&ssb=weblogin&uc_param_str=&uc_biz_str=S%3Acustom%7COPT%3ASAREA%400%7COPT%3AIMMERSIVE%401%7COPT%3ABACK_BTN_STYLE%400`;
            // log('qrcodeUrl:', qrcodeUrl);
            qrcode.platformStates[QRCodeHandler.PLATFORM_QUARK] = {
                token: qcToken,
                request_id: requestId
            };
            return JSON.stringify({
                action: {
                    actionId: 'quarkScanCookie',
                    id: 'quarkScanCookie',
                    canceledOnTouchOutside: false,
                    type: 'input',
                    title: '夸克扫码Cookie',
                    msg: '请使用夸克APP扫码登录获取',
                    width: 500,
                    button: 1,
                    timeout: 20,
                    qrcode: qrcodeUrl,
                    qrcodeSize: '400',
                    initAction: 'quarkScanCheck',
                    initValue: requestId,
                    cancelAction: 'quarkScanCancel',
                    cancelValue: requestId,
                    httpTimeout: 60,
                }
            });
        }
        if (action === 'quarkScanCheck') {
            log('quarkScanCheck value:', value);
            rule.quarkScanCheck = value;
            const state = qrcode.platformStates[QRCodeHandler.PLATFORM_QUARK];
            if (state) { // 生成二维码的时候设置了扫码id
                for (let i = 1; i <= 15; i++) {
                    if (!rule.quarkScanCheck) {
                        console.log('退出扫码检测：' + value);
                        return '扫码取消';
                    }
                    console.log('[quarkScanCheck]等待用户扫码，第' + i + '次');
                    const scanResult = await _checkQuarkStatus(state, httpUrl);
                    log('scanResult:', scanResult);
                    if (scanResult.status === 'CONFIRMED') {
                        let cookie = scanResult.cookie;
                        log('扫码成功获取到cookie:', cookie);
                        parseSaveCookie('quark_cookie', cookie);
                        rule.quarkScanCheck = null;
                        qrcode.platformStates[QRCodeHandler.PLATFORM_QUARK] = null;
                        return '扫描完成，已成功获取cookie并入库';
                    } else if (scanResult.status === 'EXPIRED') {
                        log('已过期')
                        break;
                    } else {
                        await sleep(1000);
                    }
                }
            }
            rule.quarkScanCheck = null;
            qrcode.platformStates[QRCodeHandler.PLATFORM_QUARK] = null;
            return JSON.stringify({
                action: {
                    actionId: 'quarkCookieError',
                    id: 'cookie',
                    type: 'input',
                    title: '夸克Cookie',
                    width: 300,
                    button: false,
                    imageUrl: 'https://preview.qiantucdn.com/agency/dp/dp_thumbs/1014014/15854479/staff_1024.jpg!w1024_new_small_1',
                    imageHeight: 200,
                    msg: '扫码超时,请重进'
                }
            });
        }
        if (action === 'quarkScanCancel') {
            console.log('用户取消扫码：' + value);
            rule.quarkScanCheck = null;
            qrcode.platformStates[QRCodeHandler.PLATFORM_QUARK] = null;
            return;
        }

        if (action === 'UC扫码') {
            if (rule.UCScanCheck) {
                log('请等待上个扫码任务完成：' + rule.UCScanCheck);
                return '请等待上个扫码任务完成';
            }
            let requestId = generateUUID();
            log('httpUrl:', httpUrl);
            log('request_id:', requestId);
            let data = await post('https://api.open.uc.cn/cas/ajax/getTokenForQrcodeLogin', {
                headers: {Referer: '', ...QRCodeHandler.HEADERS},
                data: {
                    request_id: requestId,
                    client_id: "381",
                    v: "1.2",
                }
            });
            log('data:', data);
            let qcToken = JSON.parse(data).data.members.token;
            let qrcodeUrl = `https://su.uc.cn/1_n0ZCv?token=${qcToken}&client_id=381&uc_param_str=&uc_biz_str=S%3Acustom%7CC%3Atitlebar_fix`;
            // log('qrcodeUrl:', qrcodeUrl);
            qrcode.platformStates[QRCodeHandler.PLATFORM_UC] = {
                token: qcToken,
                request_id: requestId
            };
            return JSON.stringify({
                action: {
                    actionId: 'UCScanCookie',
                    id: 'UCScanCookie',
                    canceledOnTouchOutside: false,
                    type: 'input',
                    title: 'UC扫码Cookie',
                    msg: '请使用UC APP扫码登录获取',
                    width: 500,
                    button: 1,
                    timeout: 20,
                    qrcode: qrcodeUrl,
                    qrcodeSize: '400',
                    initAction: 'UCScanCheck',
                    initValue: requestId,
                    cancelAction: 'UCScanCancel',
                    cancelValue: requestId,
                    httpTimeout: 60,
                }
            });
        }
        if (action === 'UCScanCheck') {
            log('UCScanCheck value:', value);
            rule.UCScanCheck = value;
            const state = qrcode.platformStates[QRCodeHandler.PLATFORM_UC];
            if (state) { // 生成二维码的时候设置了扫码id
                for (let i = 1; i <= 15; i++) {
                    if (!rule.UCScanCheck) {
                        console.log('退出扫码检测：' + value);
                        return '扫码取消';
                    }
                    console.log('[UCScanCheck]等待用户扫码，第' + i + '次');
                    const scanResult = await _checkUCStatus(state, httpUrl);
                    log('scanResult:', scanResult);
                    if (scanResult.status === 'CONFIRMED') {
                        let cookie = scanResult.cookie;
                        log('扫码成功获取到cookie:', cookie);
                        parseSaveCookie('uc_cookie', cookie);
                        rule.UCScanCheck = null;
                        qrcode.platformStates[QRCodeHandler.PLATFORM_UC] = null;
                        return '扫描完成，已成功获取cookie并入库';
                    } else if (scanResult.status === 'EXPIRED') {
                        log('已过期')
                        break;
                    } else {
                        await sleep(1000);
                    }
                }
            }
            rule.UCScanCheck = null;
            qrcode.platformStates[QRCodeHandler.PLATFORM_UC] = null;
            return JSON.stringify({
                action: {
                    actionId: 'UCCookieError',
                    id: 'cookie',
                    type: 'input',
                    title: 'UC Cookie',
                    width: 300,
                    button: false,
                    imageUrl: 'https://preview.qiantucdn.com/agency/dp/dp_thumbs/1014014/15854479/staff_1024.jpg!w1024_new_small_1',
                    imageHeight: 200,
                    msg: '扫码超时,请重进'
                }
            });
        }
        if (action === 'UCScanCancel') {
            console.log('用户取消扫码：' + value);
            rule.UCScanCheck = null;
            qrcode.platformStates[QRCodeHandler.PLATFORM_UC] = null;
            return;
        }

        if (action === '阿里扫码') {
            if (rule.aliScanCheck) {
                log('请等待上个扫码任务完成：' + rule.aliScanCheck);
                return '请等待上个扫码任务完成';
            }
            log('httpUrl:', httpUrl);
            let data = await post('https://passport.aliyundrive.com/newlogin/qrcode/generate.do', {
                headers: {
                    Referer: '',
                    ...QRCodeHandler.HEADERS
                },
                data: {
                    appName: "aliyun_drive",
                    fromSite: "52",
                    appEntrance: "web",
                    isMobile: "false",
                    lang: "zh_CN",
                    returnUrl: "",
                    bizParams: "",
                    _bx_v: "2.2.3"
                }
            });
            log('data:', data);
            const contentData = JSON.parse(data).content.data;
            let qrcodeUrl = contentData.codeContent;
            log('qrcodeUrl:', qrcodeUrl);
            qrcode.platformStates[QRCodeHandler.PLATFORM_ALI] = {
                ck: contentData.ck,
                t: contentData.t
            };
            return JSON.stringify({
                action: {
                    actionId: 'aliScanCookie',
                    id: 'aliScanCookie',
                    canceledOnTouchOutside: false,
                    type: 'input',
                    title: '阿里扫码Cookie',
                    msg: '请使用阿里云盘 APP扫码登录获取',
                    width: 500,
                    button: 1,
                    timeout: 20,
                    qrcode: qrcodeUrl,
                    qrcodeSize: '400',
                    initAction: 'aliScanCheck',
                    initValue: qrcodeUrl,
                    cancelAction: 'aliScanCancel',
                    cancelValue: qrcodeUrl,
                    httpTimeout: 60,
                }
            });
        }
        if (action === 'aliScanCheck') {
            log('aliScanCheck value:', value);
            rule.aliScanCheck = value;
            const state = qrcode.platformStates[QRCodeHandler.PLATFORM_ALI];
            if (state) { // 生成二维码的时候设置了扫码id
                for (let i = 1; i <= 15; i++) {
                    if (!rule.aliScanCheck) {
                        console.log('退出扫码检测：' + value);
                        return '扫码取消';
                    }
                    console.log('[aliScanCheck]等待用户扫码，第' + i + '次');
                    const scanResult = await _checkAliStatus(state, httpUrl);
                    log('scanResult:', scanResult);
                    if (scanResult.status === 'CONFIRMED') {
                        let cookie = scanResult.token;
                        log('扫码成功获取到cookie:', cookie);
                        parseSaveCookie('ali_token', cookie);
                        rule.aliScanCheck = null;
                        qrcode.platformStates[QRCodeHandler.PLATFORM_ALI] = null;
                        return '扫描完成，已成功获取cookie并入库';
                    } else if (scanResult.status === 'EXPIRED') {
                        log('已过期')
                        break;
                    } else {
                        await sleep(1000);
                    }
                }
            }
            rule.aliScanCheck = null;
            qrcode.platformStates[QRCodeHandler.PLATFORM_ALI] = null;
            return JSON.stringify({
                action: {
                    actionId: 'aliCookieError',
                    id: 'cookie',
                    type: 'input',
                    title: '阿里 Cookie',
                    width: 300,
                    button: false,
                    imageUrl: 'https://preview.qiantucdn.com/agency/dp/dp_thumbs/1014014/15854479/staff_1024.jpg!w1024_new_small_1',
                    imageHeight: 200,
                    msg: '扫码超时,请重进'
                }
            });
        }
        if (action === 'aliScanCancel') {
            console.log('用户取消扫码：' + value);
            rule.aliScanCheck = null;
            qrcode.platformStates[QRCodeHandler.PLATFORM_ALI] = null;
            return;
        }

        if (action === '哔哩扫码') {
            if (rule.biliScanCheck) {
                log('请等待上个扫码任务完成：' + rule.biliScanCheck);
                return '请等待上个扫码任务完成';
            }
            log('httpUrl:', httpUrl);
            const res = await axios({
                url: httpUrl,
                method: "POST",
                data: {
                    url: "https://passport.bilibili.com/x/passport-login/web/qrcode/generate",
                    headers: {
                        ...QRCodeHandler.HEADERS
                    },
                    params: {
                        source: "main-mini"
                    }
                }
            });
            const resData = res.data.data;
            // log('resData:', resData);
            if (resData.code !== 0) {
                throw new Error(resData.message);
            }
            const qrcodeData = resData.data;
            const qrcodeUrl = qrcodeData.url;
            qrcode.platformStates[QRCodeHandler.PLATFORM_BILI] = {
                qrcode_key: qrcodeData.qrcode_key
            };
            return JSON.stringify({
                action: {
                    actionId: 'billiScanCookie',
                    id: 'biliScanCookie',
                    canceledOnTouchOutside: false,
                    type: 'input',
                    title: '哔哩扫码Cookie',
                    msg: '请使用哔哩哔哩 APP扫码登录获取',
                    width: 500,
                    button: 1,
                    timeout: 20,
                    qrcode: qrcodeUrl,
                    qrcodeSize: '400',
                    initAction: 'biliScanCheck',
                    initValue: qrcodeUrl,
                    cancelAction: 'biliScanCancel',
                    cancelValue: qrcodeUrl,
                    httpTimeout: 60,
                }
            });
        }
        if (action === 'biliScanCheck') {
            log('biliScanCheck value:', value);
            rule.biliScanCheck = value;
            const state = qrcode.platformStates[QRCodeHandler.PLATFORM_BILI];
            if (state) { // 生成二维码的时候设置了扫码id
                for (let i = 1; i <= 15; i++) {
                    if (!rule.biliScanCheck) {
                        console.log('退出扫码检测：' + value);
                        return '扫码取消';
                    }
                    console.log('[biliScanCheck]等待用户扫码，第' + i + '次');
                    const scanResult = await _checkBiliStatus(state, httpUrl);
                    log('scanResult:', scanResult);
                    if (scanResult.status === 'CONFIRMED') {
                        let cookie = scanResult.cookie;
                        log('扫码成功获取到cookie:', cookie);
                        parseSaveCookie('bili_cookie', cookie);
                        rule.biliScanCheck = null;
                        qrcode.platformStates[QRCodeHandler.PLATFORM_BILI] = null;
                        return '扫描完成，已成功获取cookie并入库';
                    } else if (scanResult.status === 'EXPIRED') {
                        log('已过期')
                        break;
                    } else {
                        await sleep(1000);
                    }
                }
            }
            rule.biliScanCheck = null;
            qrcode.platformStates[QRCodeHandler.PLATFORM_BILI] = null;
            return JSON.stringify({
                action: {
                    actionId: 'biliCookieError',
                    id: 'cookie',
                    type: 'input',
                    title: '哔哩 Cookie',
                    width: 300,
                    button: false,
                    imageUrl: 'https://preview.qiantucdn.com/agency/dp/dp_thumbs/1014014/15854479/staff_1024.jpg!w1024_new_small_1',
                    imageHeight: 200,
                    msg: '扫码超时,请重进'
                }
            });
        }
        if (action === 'biliScanCancel') {
            console.log('用户取消扫码：' + value);
            rule.biliScanCheck = null;
            qrcode.platformStates[QRCodeHandler.PLATFORM_BILI] = null;
            return;
        }


        if (action === '推送视频播放') {
            try {
                const obj = JSON.parse(value);
                return JSON.stringify({
                    action: {
                        actionId: '__detail__',
                        skey: 'push_agent',
                        ids: encodeURIComponent(obj.push),
                    },
                    toast: `开始解析视频:${obj.push}`
                });
            } catch (e) {
                return '推送视频播放发生错误：' + e.message;
            }
        }
        if (action === '推送番茄小说') {
            try {
                const obj = JSON.parse(value);
                return JSON.stringify({
                    action: {
                        actionId: '__detail__',
                        skey: 'drpyS_番茄小说[书]',
                        ids: obj.push,
                    },
                    toast: `开始解析小说:${obj.push}`
                });
            } catch (e) {
                return '推送番茄小说发生错误：' + e.message;
            }
        }
        let cookie_sets = [
            'quark_cookie',
            'uc_cookie',
            'ali_token',
            'bili_cookie',
            'hide_adult',
            'thread',
            'spark_ai_authKey',
            'deepseek_apiKey',
            'sparkBotObject',
            'now_ai',
            'allow_forward',
        ];
        let get_cookie_sets = [
            'get_quark_cookie',
            'get_uc_cookie',
            'get_ali_token',
            'get_bili_cookie',
            'get_hide_adult',
            'get_thread',
            'get_spark_ai_authKey',
            'get_deepseek_apiKey',
            'get_sparkBotObject',
            'get_now_ai',
            'get_allow_forward',
        ];
        if (cookie_sets.includes(action) && value) {
            try {
                const obj = JSON.parse(value);
                const auth_code = obj.auth_code;
                const cookie = obj.cookie;
                if (!auth_code || !cookie) {
                    return '入库授权码或cookie值不允许为空!'
                }
                const COOKIE_AUTH_CODE = _ENV.COOKIE_AUTH_CODE || 'drpys';
                if (auth_code !== COOKIE_AUTH_CODE) {
                    return `您输入的入库授权码【${auth_code}】不正确`
                }
                if (action === 'sparkBotObject') {
                    try {
                        ENV.set(action, cookie, 1);
                        return `设置成功!已成功设置环境变量【${action}】的值为:${cookie}`;
                    } catch (e) {
                        return `设置失败!发送了错误:${e.message}`;
                    }
                } else {
                    ENV.set(action, cookie);
                    return `设置成功!已成功设置环境变量【${action}】的值为:${cookie}`;
                }
            } catch (e) {
                return '发生错误：' + e.message;
            }
        }
        if (get_cookie_sets.includes(action) && value) {
            try {
                const obj = JSON.parse(value);
                const auth_code = obj.auth_code;
                if (!auth_code) {
                    return '入库授权码不允许为空!'
                }
                const COOKIE_AUTH_CODE = _ENV.COOKIE_AUTH_CODE || 'drpys';
                if (auth_code !== COOKIE_AUTH_CODE) {
                    return `您输入的入库授权码【${auth_code}】不正确`
                }
                const key = action.replace('get_', '');
                const cookie = ENV.get(key);
                return JSON.stringify({
                    action: {
                        actionId: action + '_value',
                        id: 'cookie',
                        type: 'input',
                        title: key,
                        tip: `你想查看的:${key}`,
                        value: typeof cookie === 'string' ? cookie : JSON.stringify(cookie),
                        msg: '此弹窗是动态设置的参数，可用于动态返回原设置值等场景'
                    }
                });
            } catch (e) {
                return '发生错误：' + e.message;
            }
        }
        if (action === '查看夸克cookie') {
            return {action: getInput('get_quark_cookie', '查看夸克 cookie', urljoin(publicUrl, './images/icon_cookie/夸克.webp')).vod_id};
        }
        if (action === '设置夸克cookie') {
            return {action: genMultiInput('quark_cookie', '设置夸克 cookie', null).vod_id};
        }

        return '动作：' + action + '\n数据：' + value;
    },

};


function genMultiInput(actionId, title, desc, img) {
    return {
        vod_id: JSON.stringify({
            actionId: actionId,
            type: 'multiInput',
            title: title,
            width: 640,
            msg: desc || '通过action配置的多项输入',
            input: [
                {
                    id: 'auth_code',
                    name: '入库授权码',
                    tip: '请输入.env中配置的入库授权码',
                    value: ''
                },
                {
                    id: 'cookie',
                    name: title,
                    tip: `请输入${title}内容`,
                    value: ''
                }
            ]
        }),
        vod_name: title,
        vod_tag: 'action',
        vod_pic: img || 'https://pic.qisuidc.cn/s/2024/10/23/6718c212f1fdd.webp',
    }
}

function getInput(actionId, title, img) {
    return {
        vod_id: JSON.stringify({
            actionId: actionId,
            id: 'auth_code',
            type: 'input',
            title: '入库授权码',
            tip: '请输入.env中配置的入库授权码',
            value: '',
            msg: '查看已设置的cookie需要授权码',
            // imageUrl: img || 'https://pic.imgdb.cn/item/667ce9f4d9c307b7e9f9d052.webp',
            imageUrl: img || 'https://pic.qisuidc.cn/s/2024/10/23/6718c212f1fdd.webp',
            imageHeight: 200,
            imageType: 'card_pic_3',
        }),
        vod_name: title,
        vod_tag: 'action',
        vod_pic: img || 'https://pic.qisuidc.cn/s/2024/10/23/6718c212f1fdd.webp',
    }
}

function parseSaveCookie(key, value) {
    let cookie_obj = COOKIE.parse(value);
    let cookie_str = value;

    if (['quark_cookie', 'uc_cookie'].includes(key)) {
        // log(cookie_obj);
        cookie_str = COOKIE.stringify({
            __pus: cookie_obj.__pus || '',
            __puus: cookie_obj.__puus || '',
        });
        log('入库的cookie:', cookie_str);
    }
    // 调用 ENV.set 设置环境变量
    ENV.set(key, cookie_str);
}
