"use strict";
(() => {
  // src/script.ts
  var sampleResolution = 40;
  var canvasResolution = 100;
  var sampleFunction = (point) => {
    return Math.random() > 0.5 ? 1 : 0;
  };
  var getPoints = () => {
    const points = [];
    for (let x = 0; x < sampleResolution; x++) {
      for (let y = 0; y < sampleResolution; y++) {
        points.push(sampleFunction({ x, y }));
      }
    }
    return points;
  };
  var getSample = (point, samples) => {
    return samples[point.x * sampleResolution + point.y];
  };
  var MESHLOOKUP = [
    [],
    [[[0, 0], [0.5, 0], [0, 0.5]]],
    [[[1, 0], [1, 0.5], [0.5, 0]]],
    [[[0, 0], [1, 0], [0, 0.5]], [[1, 0], [0, 0.5], [1, 0.5]]],
    [[[1, 1], [1, 0.5], [0.5, 1]]],
    [[[0, 0], [0.5, 0], [0, 0.5]], [[1, 1], [1, 0.5], [0.5, 1]]],
    [[[1, 0], [1, 1], [0.5, 1]], [[0.5, 0], [1, 0], [0.5, 1]]],
    [[[0, 0], [1, 0], [0, 0.5]], [[1, 0], [0, 0.5], [1, 1]], [[0, 0.5], [1, 1], [0.5, 1]]],
    [[[0, 1], [0, 0.5], [0.5, 1]]],
    [[[0, 0], [0.5, 0], [0, 1]], [[0, 1], [0.5, 1], [0.5, 0]]],
    [[[1, 0], [1, 0.5], [0.5, 0]], [[0, 1], [0, 0.5], [0.5, 1]]],
    [[[0, 0], [1, 0], [0, 1]], [[0, 1], [1, 0], [0.5, 1]], [[1, 0], [0.5, 1], [1, 0.5]]],
    [[[0, 0.5], [1, 0.5], [0, 1]], [[0, 1], [1, 0.5], [1, 1]]],
    [[[0, 0], [1, 1], [0, 1]], [[0, 0], [1, 1], [0.5, 0]], [[0.5, 0], [1, 0.5], [1, 1]]],
    [[[0, 1], [1, 0], [1, 1]], [[0.5, 0], [0, 1], [1, 0]], [[0, 0.5], [0.5, 0], [0, 1]]],
    [[[0, 0], [1, 0], [0, 1]], [[1, 1], [1, 0], [0, 1]]]
  ].map((mesh) => mesh.map((tri) => tri.map(([x, y]) => ({ x, y }))));
  var marchTheCubes = (samples) => {
    const mesh = [];
    for (let x = 0; x < sampleResolution - 1; x++) {
      for (let y = 0; y < sampleResolution - 1; y++) {
        const TL = getSample({ x: x + 0, y: y + 0 }, samples);
        const TR = getSample({ x: x + 1, y: y + 0 }, samples);
        const BL = getSample({ x: x + 0, y: y + 1 }, samples);
        const BR = getSample({ x: x + 1, y: y + 1 }, samples);
        const meshId = (TL << 0) + (TR << 1) + (BR << 2) + (BL << 3);
        const triangles = MESHLOOKUP[meshId];
        console.log(meshId);
        const translated = triangles.map((m) => m.map((p) => ({ x: p.x + x, y: p.y + y })));
        mesh.push(...translated);
      }
    }
    return mesh;
  };
  var meshToWorldCoord = (point) => {
    return { x: (point.x + 1) * canvasResolution, y: (point.y + 1) * canvasResolution };
  };
  var render = (points, ctx) => {
    const mesh = marchTheCubes(points);
    ctx.fillStyle = "red";
    for (const triangle of mesh) {
      const v = triangle.map((p) => meshToWorldCoord(p));
      ctx.beginPath();
      ctx.moveTo(v[0].x, v[0].y);
      ctx.lineTo(v[1].x, v[1].y);
      ctx.lineTo(v[2].x, v[2].y);
      ctx.fill();
    }
    for (let x = 0; x < sampleResolution; x++) {
      for (let y = 0; y < sampleResolution; y++) {
        const sample = getSample({ x, y }, points);
        const brightness = Math.floor((1 - sample) * 255);
        ctx.beginPath();
        ctx.fillStyle = `rgb(${[brightness, brightness, brightness]})`;
        const circleCenter = meshToWorldCoord({ x, y });
        ctx.arc(circleCenter.x, circleCenter.y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
    }
  };
  var main = () => {
    const sampledPoints = getPoints();
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.height = (sampleResolution + 1) * canvasResolution;
    render(sampledPoints, ctx);
  };
  main();
})();
