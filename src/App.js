import React, { Component } from 'react';
import './App.css';
import { itemData } from './config';


class App extends Component {
  state = {
    deg: 0,
    name: '',
    link: '',
    desc: '',
  }

  componentDidMount() {
    this.setState({
      name: itemData[0].name,
      link: itemData[0].link,
      desc: itemData[0].desc,
    })
  }
  rotate(element) {
    this.setState({
      deg: element.index - 1,
      name: element.name,
      link: element.link,
      desc: element.desc,
    });
  }

  render() {
    const { deg, name, link, desc } = this.state;
    return (
      <div>
        <div className="chamber__wrap">
          <ul
            className="chamber"
            style={{ transform: `rotate(${deg * -60}deg)` }}
          >
            {itemData.map((element, index) => {
              return (
                <li
                  key={index}
                  className={`circle__${element.index}`}
                  onClick={() => this.rotate(element)}
                >
                  <img alt="" src={element.img} />
                </li>
              );
            })}
          </ul>
        </div>
        <div className="desc">
          <a href={link} target="_blank" className="desc_title">{name}</a>
          <p>{desc}</p>
        </div>
      </div>
    );
  }
}

export default App;
