import React from 'react';
import axios from 'axios';
// import echarts from 'echarts';
import { Card } from 'antd';

// 引入 ECharts 主模块
const echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

// 模拟计划制作一个github相关的统计
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [0, 0, 0, 0, 0, 0]
    };
  }


  componentWillMount() {
    // testing request
    Promise.all([
      axios.get('https://api.github.com/repos/facebook/react'),
      axios.get('https://api.github.com/repos/vuejs/vue'),
      axios.get('https://api.github.com/repos/angular/angular'),
      axios.get('https://api.github.com/repos/facebook/react-native'),
      axios.get('https://api.github.com/repos/reactjs/redux'),
      axios.get('https://api.github.com/repos/alibaba/weex')
    ])
      .then(resultArr => {
        const chartData = resultArr.map(item => item.data.stargazers_count);
        this.setState({ chartData });
      })
      .catch(() => {
        debugger;
      });
  }

  componentDidMount() {
    this.setChart();
  }

  componentDidUpdate() {
    this.setChart();
  }

  setChart = () => {
    const { chartData } = this.state;
    const myChart = echarts.init(document.getElementById('framework-compare'));
    const colors = ['#5793f3', '#d14a61', '#675bba'];
    // 绘制图表

    myChart.setOption({
      color: colors,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['React', 'Vue', 'Angular', 'React Native', 'Redux', 'Weex']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '最新Star',
          type: 'bar',
          barWidth: '50%',
          data: chartData,
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          }
        }
      ]
    });
  };

  render() {
    return (
      <div className="HOME">
        <section className="framework-compare">
          <Card
            title="前端框架最新Star对比"
            extra={(
              <a href="#">
More
              </a>
)}
            style={{ width: 700 }}
          >
            <div id="framework-compare" style={{ width: 600, height: 400 }} />
          </Card>
        </section>
      </div>
    );
  }
}
