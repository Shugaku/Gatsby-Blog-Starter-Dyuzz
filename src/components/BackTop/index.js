import React, { PureComponent } from "react";
import ReactGA from 'react-ga';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  './index.scss';
import { classIf, easeInOutCubic, getCurrentScrollTop } from "../../api/utils";

// 组件-回滚顶部
class BackTop extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      show: false
    } 
  }

  // 监听滚动事件
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  // 取消监听
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  // 处理滚动事件
  handleScroll = () => {
    const headerHeight = window.innerHeight * 0.8;
    this.setState({ show: getCurrentScrollTop() > headerHeight });
  };

  // 滚动至顶部
  scrollToTop = () => {
    const scrollTop = getCurrentScrollTop();
    const startTime = Date.now();
    // 帧函数
    const frameFunc = () => {
      const timestamp = Date.now();
      // 间隔时间
      const time = timestamp - startTime;
      this.setScrollTop(easeInOutCubic(time, scrollTop, 0, 450));
      if (time < 450) {
        requestAnimationFrame(frameFunc);
      } else {
        this.setScrollTop(0);
      }
    };
    // TODO: 做降级适配
    requestAnimationFrame(frameFunc);
  };

  // 设置滚动距离
  setScrollTop(value) {
    document.body.scrollTop = value;
    document.documentElement.scrollTop = value;
  }

  render() {
    return this.state.show && (
      <div
        className="back-top"
        onClick={this.scrollToTop}
      >
        <img src="/favicons/otter-solid.png"/>
      </div>
    );
  }
}

export default BackTop;
