import React, { PureComponent } from "react";
import { easeInOutCubic, getCurrentScrollTop } from "../../api/utils";
import Tag from '../Tag'
import './index.scss';

// 组件-回滚顶部
class TableOfContent extends React.Component {
  constructor(props) {
    super(props);
    this.tableOfContents = props.tableOfContents;
    this.tags=props.tags;
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


  render() {
    return (
	    <div className="col-lg-2 col-md-2 order-11 ">
		<div className="toc-css">
		  <div
		    dangerouslySetInnerHTML={{
		        __html: '<div>TOC</div>' + this.tableOfContents,
		    }}
		  />
		  {this.tags.map(name => (
		    <Tag name={name} key={name} />
		  ))}

		</div>
		</div>
    );
  }
}

export default TableOfContent;
