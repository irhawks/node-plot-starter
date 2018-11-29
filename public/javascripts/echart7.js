// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));

// 设置图表样式
var option = {
  title : {
    text: 'cpu使用率'
  },
  tooltip : {
    trigger: 'axis'
  },
  legend: {
    data:['cpu使用率']
  },
  toolbox: {
    show : true,
    feature : {
      mark : {show: true},
      dataView : {show: true, readOnly: false},
      magicType : {show: true, type: ['line', 'bar']},
      restore : {show: true},
      saveAsImage : {show: true}
    }
  },
  dataZoom : {
    show : false,
    start : 0,
    end : 60
  },
  xAxis : [
    {
      type : 'category',
      boundaryGap : true,
      data : [0,0,0,0,0,0,0]
    }
  ],
  yAxis : [
    {
      type : 'value',
      scale: true,
      name : 'cpu使用率',
      //boundaryGap: [0.2, 0.2],
      splitNumber :'10',
      min:0,
      max:2000
    }
  ],
  series : [
    {
      name:'CPU使用率',
      type:'line',
      data:[0,0,0,0,10,5]
    }
  ]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);

function checkBrowser(){
  if (window.WebSocket){
    log("This browser supports WebSocket!");
  } else {
    log("This browser does not support WebSocket.");
  }
}


var data = [];
var label = [];

function setup(){
  var wsServer = 'ws://127.0.0.1:4444';
  var ws = new WebSocket(wsServer);

  ws.onopen = function (e) {
    log("Connected to WebSocket server.",e);
    sendMessage("Conan");
  } ;

  ws.onclose = function (e) {
    log("Disconnected",e);
  } ;

  ws.onmessage = function(e) {
    var d = JSON.parse(e.data)
    data.push(d.event.count)
    label.push(new Date().toISOString())
    if(data.length > 60) {data.shift() }
    if(label.length > 60) {label.shift() }
    var opt = {
      title: { text: (new Date()).toISOString() },
      xAxis  : [ { type : 'category', boundaryGap : true, data : label }],
      smooth:true,  //这句就是让曲线变平滑的
      series : [ {name : "CPU使用率", data: data, type: "line", smooth: true} ] 
    }
    log("RECEIVED: " + d.event.count, e);
    // ws.close();
    myChart.setOption(opt);
  }

  ws.onerror = function (e) {
    log('Error occured: ' + e.data,e);
  } ;

  var sendMessage = function(msg){
    ws.send(msg);
    log("SEND : "+ msg);
  }
}

// function log(s,e) {
//   var output = document.getElementById("output");
//   var p = document.createElement("p");
//   p.style.wordWrap = "break-word";
//   p.style.padding="10px";
//   p.style.background="#eee";
//   p.textContent = "LOG : "+s;
//   output.appendChild(p);
//   console.log("LOG : "+s, e);
// }
function log(s, e) {
}

checkBrowser();
setup();


