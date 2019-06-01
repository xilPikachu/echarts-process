    /**
     * 
     * @param {图标的实例化变量} id 
     * @param {图标标题} protitle 
     * @param {图标y轴单位} danwei1 
     * @param {取数据的url} url 
     * @param {每项子项目数量（需要url给出）} length 
     */
    function newChart(id, chart_title, danwei1, url, length) {
        let array = []; //空数组，用于存放series的对象
        let obj = { //push进array中的对象模板
            type: 'bar'
        };
        let danwei = { //y轴单位的对象模板
            name: '',
            type: ''
        };

        for (let index = 0; index < length; index++) { //根据数据集长度决定array长度
            array.push(obj);    //push入对象数组
        }

        //根据单位字符串决定单位对象内容
        switch (danwei1) {
            case '元':
                danwei = { //为对象赋值
                    name: '元',
                    type: 'value'
                };
                break;
            case '个':
                danwei = {
                    name: '个',
                    type: 'value'
                };
                break;
        }

        //渲染模板
        id.setOption({
            title: {
                text: chart_title //标题文本
            },
            legend: { //legend:柱状图上面的标注状态的
                padding: [
                    35, //上
                    0, //右 
                    0, //下
                    0 //左
                ]
            },
            tooltip: {}, //鼠标悬浮提示框
            dataset: {
                // 提供一份数据。在Ajax获取前为空
                source: []
            },
            xAxis: {
                type: 'category' //坐标轴类型，类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
            },
            yAxis: danwei, //传入一个对象，{name：坐标轴名称,type:坐标轴类型，默认'value'数值轴，适用于连续数据}
            toolbox: { //工具栏
                feature: {
                    saveAsImage: {} //输出为图片
                }
            },
            series: array //系列列表。每个系列通过 type 决定自己的图表类型，默认type为'bar'
        });

        //异步获取数据并更新图标数据集
        $.get(url).done(function (data) {
            id.setOption({ // 填入数据
                dataset: {
                    source: data
                }
            });
        });
    }