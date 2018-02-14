import React, { Component } from 'react'
import './App.css'
import defaultPic from './img/default.jpg'

const itemData = [
  {
    name: 'github',
    desc: '...',
    link: 'https://github.com/vv13',
    img: defaultPic,
  },
  {
    name: 'blog',
    desc: '...',
    link: 'https://blog.vv13.cn',
    img: defaultPic,
  },
  {
    img: defaultPic,
  },
  {
    img: defaultPic,
  },
  {
    img: defaultPic,
  },
  {
    img: defaultPic,
  },
]
class App extends Component {
  state = {
    currentIndex: 0,
    deg: 0,
  }


  rotate(element, index) {
    let offset = this.state.currentIndex - index
    if (offset <= -4) {
      offset = 6 + offset
    } else if (offset >= 4) {
      offset = offset - 6
    }
    this.setState({
      deg: this.state.deg + 60 * offset,
      currentIndex: index,
    })
  }

  titleInfo(info) {
    return (
      <div className="chamber_info">
        <h1>{info.name}</h1>
        <p>{info.desc}</p>
        <a target="_blank" href={info.link}>跳转</a>
      </div>
    )
  }

  render() {
    const { deg, currentIndex } = this.state
    return (
      <div>
        <div className="chamber_wrap">
          <ul className="chamber" style={{ transform: `rotate(${deg}deg)` }}>
            {itemData.map((element, index) => {
              return (
                <li
                  key={index}
                  style={{ transform: `rotate(${index * 60}deg)` }}
                  className={`chamber_item circle__${index + 1} ${currentIndex === index ? '_active' : ''}`}
                  onClick={() => this.rotate(element, index)}
                >
                  {this.titleInfo(element)}
                  <img alt="" src={element.img} />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
