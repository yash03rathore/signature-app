import React, { useState, useRef, useEffect } from 'react';
import './index.css';

const App = () => {
  const [color, setColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState('5');
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set initial styles
    ctx.fillStyle = color;
    ctx.strokeStyle = color;

    // Handle mouse and touch events
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const getCoordinates = (event) => {
      const canvasBounds = canvas.getBoundingClientRect();
      const offsetX = event.clientX - canvasBounds.left;
      const offsetY = event.clientY - canvasBounds.top;
      return { offsetX, offsetY };
    };

    const handleMouseDown = (event) => {
      const { offsetX, offsetY } = getCoordinates(event);
      isDrawing = true;
      lastX = offsetX;
      lastY = offsetY;
    };

    const handleMouseMove = (event) => {
      if (isDrawing) {
        const { offsetX, offsetY } = getCoordinates(event);

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();

        lastX = offsetX;
        lastY = offsetY;
      }
    };

    const handleMouseUp = () => {
      isDrawing = false;
    };

    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('contextmenu', handleContextMenu);

    return () => {
      // Cleanup event listeners on component unmount
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [color]);

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleBackgroundColorChange = (event) => {
    setBackgroundColor(event.target.value);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = event.target.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = event.target.value;
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'my-canvas.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    
    <div className="main">
      <h1 className="heading">SignatureApp</h1>
      <div className="top">
        <div className="block">
          <p >Text color picker</p>
          <input
            className="form-control"
            type="color"
            value={color}
            onChange={handleColorChange}
          />
        </div>
        <div className="block">
          <p>Background</p>
          <input
            className="form-control"
            type="color"
            value={backgroundColor}
            onChange={handleBackgroundColorChange}
          />
        </div>
        <div className="block">
          <p>Font size</p>
          <select
            className="custom-select"
            type="select"
            value={fontSize}
            onChange={handleFontSizeChange}
          >
            <option value="5">5px</option>
            <option value="10">10px</option>
            <option value="20">20px</option>
            <option value="30">30px</option>
            <option value="40">40px</option>
            <option value="50">50px</option>
          </select>
        </div>
      </div>

      <canvas
        className="canvas"
        ref={canvasRef}
        width="800"
        height="500"
        style={{ border: '2px solid black' }}
      ></canvas>

      <div className="bottom">
        <button type="button" className="btn btn-danger" onClick={handleClear}>
          Clear
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleSave}
        >
          Save & download
        </button>
      </div>
    </div>
  );
};

export default App;
