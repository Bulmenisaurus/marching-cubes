"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/noisejs/index.js
  var require_noisejs = __commonJS({
    "node_modules/noisejs/index.js"(exports, module) {
      (function(global) {
        function Noise2(seed) {
          function Grad(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
          }
          Grad.prototype.dot2 = function(x, y) {
            return this.x * x + this.y * y;
          };
          Grad.prototype.dot3 = function(x, y, z) {
            return this.x * x + this.y * y + this.z * z;
          };
          this.grad3 = [
            new Grad(1, 1, 0),
            new Grad(-1, 1, 0),
            new Grad(1, -1, 0),
            new Grad(-1, -1, 0),
            new Grad(1, 0, 1),
            new Grad(-1, 0, 1),
            new Grad(1, 0, -1),
            new Grad(-1, 0, -1),
            new Grad(0, 1, 1),
            new Grad(0, -1, 1),
            new Grad(0, 1, -1),
            new Grad(0, -1, -1)
          ];
          this.p = [
            151,
            160,
            137,
            91,
            90,
            15,
            131,
            13,
            201,
            95,
            96,
            53,
            194,
            233,
            7,
            225,
            140,
            36,
            103,
            30,
            69,
            142,
            8,
            99,
            37,
            240,
            21,
            10,
            23,
            190,
            6,
            148,
            247,
            120,
            234,
            75,
            0,
            26,
            197,
            62,
            94,
            252,
            219,
            203,
            117,
            35,
            11,
            32,
            57,
            177,
            33,
            88,
            237,
            149,
            56,
            87,
            174,
            20,
            125,
            136,
            171,
            168,
            68,
            175,
            74,
            165,
            71,
            134,
            139,
            48,
            27,
            166,
            77,
            146,
            158,
            231,
            83,
            111,
            229,
            122,
            60,
            211,
            133,
            230,
            220,
            105,
            92,
            41,
            55,
            46,
            245,
            40,
            244,
            102,
            143,
            54,
            65,
            25,
            63,
            161,
            1,
            216,
            80,
            73,
            209,
            76,
            132,
            187,
            208,
            89,
            18,
            169,
            200,
            196,
            135,
            130,
            116,
            188,
            159,
            86,
            164,
            100,
            109,
            198,
            173,
            186,
            3,
            64,
            52,
            217,
            226,
            250,
            124,
            123,
            5,
            202,
            38,
            147,
            118,
            126,
            255,
            82,
            85,
            212,
            207,
            206,
            59,
            227,
            47,
            16,
            58,
            17,
            182,
            189,
            28,
            42,
            223,
            183,
            170,
            213,
            119,
            248,
            152,
            2,
            44,
            154,
            163,
            70,
            221,
            153,
            101,
            155,
            167,
            43,
            172,
            9,
            129,
            22,
            39,
            253,
            19,
            98,
            108,
            110,
            79,
            113,
            224,
            232,
            178,
            185,
            112,
            104,
            218,
            246,
            97,
            228,
            251,
            34,
            242,
            193,
            238,
            210,
            144,
            12,
            191,
            179,
            162,
            241,
            81,
            51,
            145,
            235,
            249,
            14,
            239,
            107,
            49,
            192,
            214,
            31,
            181,
            199,
            106,
            157,
            184,
            84,
            204,
            176,
            115,
            121,
            50,
            45,
            127,
            4,
            150,
            254,
            138,
            236,
            205,
            93,
            222,
            114,
            67,
            29,
            24,
            72,
            243,
            141,
            128,
            195,
            78,
            66,
            215,
            61,
            156,
            180
          ];
          this.perm = new Array(512);
          this.gradP = new Array(512);
          this.seed(seed || 0);
        }
        Noise2.prototype.seed = function(seed) {
          if (seed > 0 && seed < 1) {
            seed *= 65536;
          }
          seed = Math.floor(seed);
          if (seed < 256) {
            seed |= seed << 8;
          }
          var p = this.p;
          for (var i = 0; i < 256; i++) {
            var v;
            if (i & 1) {
              v = p[i] ^ seed & 255;
            } else {
              v = p[i] ^ seed >> 8 & 255;
            }
            var perm = this.perm;
            var gradP = this.gradP;
            perm[i] = perm[i + 256] = v;
            gradP[i] = gradP[i + 256] = this.grad3[v % 12];
          }
        };
        var F2 = 0.5 * (Math.sqrt(3) - 1);
        var G2 = (3 - Math.sqrt(3)) / 6;
        var F3 = 1 / 3;
        var G3 = 1 / 6;
        Noise2.prototype.simplex2 = function(xin, yin) {
          var n0, n1, n2;
          var s = (xin + yin) * F2;
          var i = Math.floor(xin + s);
          var j = Math.floor(yin + s);
          var t = (i + j) * G2;
          var x0 = xin - i + t;
          var y0 = yin - j + t;
          var i1, j1;
          if (x0 > y0) {
            i1 = 1;
            j1 = 0;
          } else {
            i1 = 0;
            j1 = 1;
          }
          var x1 = x0 - i1 + G2;
          var y1 = y0 - j1 + G2;
          var x2 = x0 - 1 + 2 * G2;
          var y2 = y0 - 1 + 2 * G2;
          i &= 255;
          j &= 255;
          var perm = this.perm;
          var gradP = this.gradP;
          var gi0 = gradP[i + perm[j]];
          var gi1 = gradP[i + i1 + perm[j + j1]];
          var gi2 = gradP[i + 1 + perm[j + 1]];
          var t0 = 0.5 - x0 * x0 - y0 * y0;
          if (t0 < 0) {
            n0 = 0;
          } else {
            t0 *= t0;
            n0 = t0 * t0 * gi0.dot2(x0, y0);
          }
          var t1 = 0.5 - x1 * x1 - y1 * y1;
          if (t1 < 0) {
            n1 = 0;
          } else {
            t1 *= t1;
            n1 = t1 * t1 * gi1.dot2(x1, y1);
          }
          var t2 = 0.5 - x2 * x2 - y2 * y2;
          if (t2 < 0) {
            n2 = 0;
          } else {
            t2 *= t2;
            n2 = t2 * t2 * gi2.dot2(x2, y2);
          }
          return 70 * (n0 + n1 + n2);
        };
        Noise2.prototype.simplex3 = function(xin, yin, zin) {
          var n0, n1, n2, n3;
          var s = (xin + yin + zin) * F3;
          var i = Math.floor(xin + s);
          var j = Math.floor(yin + s);
          var k = Math.floor(zin + s);
          var t = (i + j + k) * G3;
          var x0 = xin - i + t;
          var y0 = yin - j + t;
          var z0 = zin - k + t;
          var i1, j1, k1;
          var i2, j2, k2;
          if (x0 >= y0) {
            if (y0 >= z0) {
              i1 = 1;
              j1 = 0;
              k1 = 0;
              i2 = 1;
              j2 = 1;
              k2 = 0;
            } else if (x0 >= z0) {
              i1 = 1;
              j1 = 0;
              k1 = 0;
              i2 = 1;
              j2 = 0;
              k2 = 1;
            } else {
              i1 = 0;
              j1 = 0;
              k1 = 1;
              i2 = 1;
              j2 = 0;
              k2 = 1;
            }
          } else {
            if (y0 < z0) {
              i1 = 0;
              j1 = 0;
              k1 = 1;
              i2 = 0;
              j2 = 1;
              k2 = 1;
            } else if (x0 < z0) {
              i1 = 0;
              j1 = 1;
              k1 = 0;
              i2 = 0;
              j2 = 1;
              k2 = 1;
            } else {
              i1 = 0;
              j1 = 1;
              k1 = 0;
              i2 = 1;
              j2 = 1;
              k2 = 0;
            }
          }
          var x1 = x0 - i1 + G3;
          var y1 = y0 - j1 + G3;
          var z1 = z0 - k1 + G3;
          var x2 = x0 - i2 + 2 * G3;
          var y2 = y0 - j2 + 2 * G3;
          var z2 = z0 - k2 + 2 * G3;
          var x3 = x0 - 1 + 3 * G3;
          var y3 = y0 - 1 + 3 * G3;
          var z3 = z0 - 1 + 3 * G3;
          i &= 255;
          j &= 255;
          k &= 255;
          var perm = this.perm;
          var gradP = this.gradP;
          var gi0 = gradP[i + perm[j + perm[k]]];
          var gi1 = gradP[i + i1 + perm[j + j1 + perm[k + k1]]];
          var gi2 = gradP[i + i2 + perm[j + j2 + perm[k + k2]]];
          var gi3 = gradP[i + 1 + perm[j + 1 + perm[k + 1]]];
          var t0 = 0.5 - x0 * x0 - y0 * y0 - z0 * z0;
          if (t0 < 0) {
            n0 = 0;
          } else {
            t0 *= t0;
            n0 = t0 * t0 * gi0.dot3(x0, y0, z0);
          }
          var t1 = 0.5 - x1 * x1 - y1 * y1 - z1 * z1;
          if (t1 < 0) {
            n1 = 0;
          } else {
            t1 *= t1;
            n1 = t1 * t1 * gi1.dot3(x1, y1, z1);
          }
          var t2 = 0.5 - x2 * x2 - y2 * y2 - z2 * z2;
          if (t2 < 0) {
            n2 = 0;
          } else {
            t2 *= t2;
            n2 = t2 * t2 * gi2.dot3(x2, y2, z2);
          }
          var t3 = 0.5 - x3 * x3 - y3 * y3 - z3 * z3;
          if (t3 < 0) {
            n3 = 0;
          } else {
            t3 *= t3;
            n3 = t3 * t3 * gi3.dot3(x3, y3, z3);
          }
          return 32 * (n0 + n1 + n2 + n3);
        };
        function fade(t) {
          return t * t * t * (t * (t * 6 - 15) + 10);
        }
        function lerp(a, b, t) {
          return (1 - t) * a + t * b;
        }
        Noise2.prototype.perlin2 = function(x, y) {
          var X = Math.floor(x), Y = Math.floor(y);
          x = x - X;
          y = y - Y;
          X = X & 255;
          Y = Y & 255;
          var perm = this.perm;
          var gradP = this.gradP;
          var n00 = gradP[X + perm[Y]].dot2(x, y);
          var n01 = gradP[X + perm[Y + 1]].dot2(x, y - 1);
          var n10 = gradP[X + 1 + perm[Y]].dot2(x - 1, y);
          var n11 = gradP[X + 1 + perm[Y + 1]].dot2(x - 1, y - 1);
          var u = fade(x);
          return lerp(
            lerp(n00, n10, u),
            lerp(n01, n11, u),
            fade(y)
          );
        };
        Noise2.prototype.perlin3 = function(x, y, z) {
          var X = Math.floor(x), Y = Math.floor(y), Z = Math.floor(z);
          x = x - X;
          y = y - Y;
          z = z - Z;
          X = X & 255;
          Y = Y & 255;
          Z = Z & 255;
          var perm = this.perm;
          var gradP = this.gradP;
          var n000 = gradP[X + perm[Y + perm[Z]]].dot3(x, y, z);
          var n001 = gradP[X + perm[Y + perm[Z + 1]]].dot3(x, y, z - 1);
          var n010 = gradP[X + perm[Y + 1 + perm[Z]]].dot3(x, y - 1, z);
          var n011 = gradP[X + perm[Y + 1 + perm[Z + 1]]].dot3(x, y - 1, z - 1);
          var n100 = gradP[X + 1 + perm[Y + perm[Z]]].dot3(x - 1, y, z);
          var n101 = gradP[X + 1 + perm[Y + perm[Z + 1]]].dot3(x - 1, y, z - 1);
          var n110 = gradP[X + 1 + perm[Y + 1 + perm[Z]]].dot3(x - 1, y - 1, z);
          var n111 = gradP[X + 1 + perm[Y + 1 + perm[Z + 1]]].dot3(x - 1, y - 1, z - 1);
          var u = fade(x);
          var v = fade(y);
          var w = fade(z);
          return lerp(
            lerp(
              lerp(n000, n100, u),
              lerp(n001, n101, u),
              w
            ),
            lerp(
              lerp(n010, n110, u),
              lerp(n011, n111, u),
              w
            ),
            v
          );
        };
        global.Noise = Noise2;
      })(typeof module === "undefined" ? exports : module.exports);
    }
  });

  // src/script.ts
  var import_noisejs = __toESM(require_noisejs());
  var sampleResolution = 30;
  var canvasResolution = 100;
  var perlin = new import_noisejs.Noise(Math.random());
  var sampleFunction = (point) => {
    return perlin.perlin2(point.x / 3, point.y / 3);
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
  var interpolateVertex = (vertex, samples) => {
    let interpolatedX;
    if (Number.isInteger(vertex.x)) {
      interpolatedX = vertex.x;
    } else {
      const weightLeft = vertex.y === 0 ? samples[0] : samples[3];
      const weightRight = vertex.y === 0 ? samples[1] : samples[2];
      interpolatedX = weightLeft / (weightLeft - weightRight);
    }
    let interpolatedY;
    if (Number.isInteger(vertex.y)) {
      interpolatedY = vertex.y;
    } else {
      const weightTop = vertex.x === 0 ? samples[0] : samples[1];
      const weightBottom = vertex.x === 0 ? samples[3] : samples[2];
      interpolatedY = weightTop / (weightTop - weightBottom);
    }
    return { x: interpolatedX, y: interpolatedY };
  };
  var marchTheCubes = (samples) => {
    const mesh = [];
    for (let x = 0; x < sampleResolution - 1; x++) {
      for (let y = 0; y < sampleResolution - 1; y++) {
        const TL = getSample({ x: x + 0, y: y + 0 }, samples);
        const TR = getSample({ x: x + 1, y: y + 0 }, samples);
        const BL = getSample({ x: x + 0, y: y + 1 }, samples);
        const BR = getSample({ x: x + 1, y: y + 1 }, samples);
        const meshId = (+(TL > 0) << 0) + (+(TR > 0) << 1) + (+(BR > 0) << 2) + (+(BL > 0) << 3);
        const lookupTriangles = MESHLOOKUP[meshId];
        const actualTriangles = [];
        for (const triangle of lookupTriangles) {
          const interpolatedTri = [];
          for (const vertex of triangle) {
            interpolatedTri.push(interpolateVertex(vertex, [TL, TR, BR, BL]));
          }
          actualTriangles.push(interpolatedTri);
        }
        const translated = actualTriangles.map(
          (m) => m.map((p) => ({ x: p.x + x, y: p.y + y }))
        );
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
