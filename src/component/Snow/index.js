import React from 'react'
import * as THREE from 'three';
import snowPng from './snow.png';
import { isPC } from './helper';

function randomRange(min, max) {
  return ((Math.random() * (max - min)) + min)
}

class Snow extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      screenX: null,
      screenY: null,
      scene: null,
      camera: null,
      renderer: null,
      stopId: null,
      amount: 1000,
      particles: [],
    };
    this.animate = this.animate.bind(this);
    this.mouseHandler = this.mouseHandler.bind(this);
    this.touchHandler = this.touchHandler.bind(this);
    this.resizeHandler = this.resizeHandler.bind(this);
  }
  init() {
    const screenX = document.documentElement.clientWidth;
    const screenY = document.documentElement.clientHeight;
    const container = document.createElement('div');
    container.setAttribute('id', 'snow');
    container.style.position = 'absolute';
    container.style.left = '0';
    container.style.right = '0';
    container.style.pointerEvents = 'none';
    document.body.appendChild(container);
    const camera = new THREE.PerspectiveCamera(75, screenX / screenY, 1, 2000);
    camera.position.z = 100;

    const scene = new THREE.Scene()

    const textureloader = new THREE.TextureLoader()
    const map = textureloader.load(snowPng);
    const material = new THREE.SpriteMaterial({map: map})

    for (let i = 0; i < this.state.amount; i++) {
      const particle = new THREE.Sprite(material)
      const randomScale = randomRange(10, 20)
      particle.position.x = randomRange(-1000, 1000)
      particle.position.y = randomRange(-1000, 1000)
      particle.position.z = randomRange(-1000, 1000)
      particle.scale.x = particle.scale.y = particle.scale.z = randomScale
      particle.v = new THREE.Vector3(0, -2, 0)
      particle.v.z = (1 * randomRange(-1, 1))
      particle.v.x = (1 * randomRange(-1, 1))
      this.state.particles.push(particle)
      scene.add(particle)
    }

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( screenX, screenY );
    container.appendChild( renderer.domElement );
    this.setState({
      screenX,
      screenY,
      camera,
      scene,
      renderer,
    });
  }

  componentWillMount() {
    this.mouseX = 0;
    this.mouseY = 0;
  }
  componentDidMount() {
    if (isPC()) {
      this.init();
      this.animate();
      window.addEventListener('mousemove', this.mouseHandler, false);
      window.addEventListener('touchstart', this.touchHandler, false);
      window.addEventListener('touchmove', this.touchHandler, false);
      window.addEventListener('resize', this.resizeHandler)
    }
  }

  componentWillUnmount() {
    this.clearWork();
  }

  resizeHandler() {
    this.clearWork();
    this.init();
  }
  clearWork() {
    document.body.removeChild(document.querySelector('#snow'))
    cancelAnimationFrame(this.state.stopId)
    this.setState({
      scene: null,
      camera: null,
      renderer: null,
      particles: [],
    });
  }
  animate() {
    const stopId = requestAnimationFrame(this.animate)
    if (!this.state.stopId) {
      this.setState({
        stopId,
      });
    }
    this.draw()
  }

  draw() {
    const { camera, renderer, amount, scene } = this.state;
    if (!camera || !renderer || !scene) return;
    for (let i = 0; i < amount; i++) {
      const particle = this.state.particles[i]
      const pp = particle.position;
      pp.add(particle.v)
      if (pp.y < -1000) pp.y = 1000;
      if (pp.x > 1000) pp.x = -1000;
      if (pp.x < -1000) pp.x = 1000;
      if (pp.z > 1000) pp.z = -1000;
      if (pp.z < -1000) pp.z = 1000;
    }
    camera.position.x += (this.mouseX - camera.position.x) * 0.0005;
    camera.position.y += (-this.mouseY - camera.position.y) * 0.0005;
    camera.lookAt(scene.position);

    renderer.render(scene, camera)
  }

  mouseHandler(e){
      this.mouseX = e.clientX - this.state.screenX / 2;
      this.mouseY = e.clientY - this.state.screenY / 2;
  }

  touchHandler(e){
      e.preventDefault();
      this.mouseX = e.touches[0].pageX - this.state.screenX / 2;
      this.mouseY = e.touches[0].pageY - this.state.screenY / 2;
  }

  render () {
    return null;
  }
}

export default Snow;
