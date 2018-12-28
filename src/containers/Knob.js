import React, { PureComponent } from 'react';
import KnobView from '../components/Knob';

class Knob extends PureComponent {
  state = {
    degree: 90
  };

  handleDragStart = event => {
    const knob = event.target.getBoundingClientRect();
    const points = {
      x: knob.left + knob.width / 2,
      y: knob.top + knob.height / 2
    };

    const moveHandler = e => {
      this.currentDeg = this.getMouseDegree(e.clientX, e.clientY, points);
      if (this.currentDeg === this.startAngle) this.currentDeg--;
      let newValue = Math.floor(
        this.convertRange(90, 270, 45, 315, this.currentDeg)
      );
      this.setState({ degree: newValue });
    };

    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', e => {
      document.removeEventListener('mousemove', moveHandler);
    });
  };

  getMouseDegree = (mouseX, mouseY, targetPoints) => {
    const x = mouseX - targetPoints.x;
    const y = mouseY - targetPoints.y;
    let deg = (Math.atan(y / x) * 180) / Math.PI;
    if ((x < 0 && y >= 0) || (x < 0 && y < 0)) {
      deg += 90;
    } else {
      deg += 270;
    }
    let finalDeg = Math.min(Math.max(90, deg), 270);
    return finalDeg;
  };

  convertRange = (oldMin, oldMax, newMin, newMax, oldValue) => {
    return (
      ((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin
    );
  };

  render() {
    const { degree } = this.state;
    return <KnobView onDrag={this.handleDragStart} degree={degree} />;
  }
}

export default Knob;
