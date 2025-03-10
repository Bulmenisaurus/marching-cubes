//@ts-ignore
import { Noise } from 'noisejs';
declare const Noise: typeof import('noisejs');

type Point = { x: number; y: number };
type Triangle = [Point, Point, Point];
type Mesh = Triangle[];

const sampleResolution = 30;
const canvasResolution = 100;

const perlin = new Noise(Math.random());

const sampleFunction = (point: Point): number => {
    // return Math.max(Math.random() - 0.5, 0);
    return perlin.perlin2(point.x / 3, point.y / 3);
    // return point.x / sampleResolution;
};

const getPoints = (): number[] => {
    const points: number[] = [];
    for (let x = 0; x < sampleResolution; x++) {
        for (let y = 0; y < sampleResolution; y++) {
            points.push(sampleFunction({ x, y }));
        }
    }

    return points;
};

const getSample = (point: Point, samples: number[]) => {
    return samples[point.x * sampleResolution + point.y];
};

// 0---1
// |   |
// 3---2
type ShortMesh = number[][][];
//prettier-ignore
const MESHLOOKUP = ([
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
    [[[0, 0], [1, 1], [0, 1]], [[0, 0,], [1, 1], [0.5, 0]], [[0.5, 0], [1, 0.5], [1, 1]]],
    [[[0, 1], [1, 0], [1, 1]], [[0.5, 0], [0, 1], [1, 0]], [[0, 0.5], [0.5, 0], [0, 1]]],
    [[[0, 0], [1, 0], [0, 1]], [[1, 1], [1, 0], [0, 1]]]
]).map(mesh => mesh.map(tri => tri.map(([x, y]) => ({ x, y }))));

const interpolateVertex = (vertex: Point, samples: number[]) => {
    let interpolatedX: number;
    if (Number.isInteger(vertex.x)) {
        interpolatedX = vertex.x;
    } else {
        // if the x is in between two vertices, move it farther from the on with a higher weight
        const weightLeft = vertex.y === 0 ? samples[0] : samples[3];
        const weightRight = vertex.y === 0 ? samples[1] : samples[2];
        interpolatedX = weightLeft / (weightLeft - weightRight);
    }

    let interpolatedY: number;
    if (Number.isInteger(vertex.y)) {
        interpolatedY = vertex.y;
    } else {
        const weightTop = vertex.x === 0 ? samples[0] : samples[1];
        const weightBottom = vertex.x === 0 ? samples[3] : samples[2];

        interpolatedY = weightTop / (weightTop - weightBottom);
    }

    return { x: interpolatedX, y: interpolatedY };
};

const marchTheCubes = (samples: number[]): Mesh => {
    const mesh: Mesh = [];

    // march through each group of 4 adjacent samples
    for (let x = 0; x < sampleResolution - 1; x++) {
        for (let y = 0; y < sampleResolution - 1; y++) {
            const TL = getSample({ x: x + 0, y: y + 0 }, samples);
            const TR = getSample({ x: x + 1, y: y + 0 }, samples);
            const BL = getSample({ x: x + 0, y: y + 1 }, samples);
            const BR = getSample({ x: x + 1, y: y + 1 }, samples);

            // 0---1
            // |   |
            // 3---2
            const meshId =
                (+(TL > 0) << 0) + (+(TR > 0) << 1) + (+(BR > 0) << 2) + (+(BL > 0) << 3);

            const lookupTriangles = MESHLOOKUP[meshId];

            // translate our mesh by the x and y
            const actualTriangles: Mesh = [];
            for (const triangle of lookupTriangles) {
                const interpolatedTri: Point[] = [];
                for (const vertex of triangle) {
                    interpolatedTri.push(interpolateVertex(vertex, [TL, TR, BR, BL]));
                }

                actualTriangles.push(<Triangle>interpolatedTri);
            }

            const translated = actualTriangles.map((m) =>
                m.map((p) => ({ x: p.x + x, y: p.y + y }))
            ) as Mesh;

            mesh.push(...translated);
        }
    }

    return mesh;
};

const meshToWorldCoord = (point: Point): Point => {
    return { x: (point.x + 1) * canvasResolution, y: (point.y + 1) * canvasResolution };
};

const render = (points: number[], ctx: CanvasRenderingContext2D) => {
    // draw the mesh
    const mesh = marchTheCubes(points);
    ctx.fillStyle = 'red';

    for (const triangle of mesh) {
        const v = triangle.map((p) => meshToWorldCoord(p));
        ctx.beginPath();

        ctx.moveTo(v[0].x, v[0].y);
        ctx.lineTo(v[1].x, v[1].y);
        ctx.lineTo(v[2].x, v[2].y);

        ctx.fill();
    }

    // draw the points
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

const main = () => {
    const sampledPoints = getPoints();
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    canvas.width = canvas.height = (sampleResolution + 1) * canvasResolution;

    render(sampledPoints, ctx);
};

main();
