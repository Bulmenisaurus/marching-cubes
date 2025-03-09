type Point = { x: number, y: number };
type Triangle = [Point, Point, Point];
type Mesh = Triangle[];

const sampleResolution = 10;
const canvasResolution = 100;

const sampleFunction = (point: Point): number => {
    if (point.x > 2 && point.x < 7 && point.y > 2 && point.y < 7) {
        return 1;
    } else {
        return 0;
    }
    // return point.x / sampleResolution;
}

const getPoints = (): number[] => {
    const points: number[] = [];
    for (let x = 0; x < sampleResolution; x++) {
        for (let y = 0; y < sampleResolution; y++) {
            points.push(sampleFunction({ x, y }))
        }
    }

    return points;
}

const getSample = (point: Point, samples: number[]) => {
    return samples[point.x * sampleResolution + point.y];
}

// TODO: rest of lookup
const MESHLOOKUP: Mesh[] = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [[{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }], [{ x: 1, y: 1 }, { x: 1, y: 0, }, { x: 0, y: 1 }]]
];

const marchTheCubes = (samples: number[]): Mesh => {
    const mesh: Mesh = [];

    mesh.push(
        [
            { x: 8, y: 9 },
            { x: 9, y: 9 },
            { x: 9, y: 8 }
        ]
    )

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
            const meshId = (TL << 0) + (TR << 1) + (BR << 2) + (BL << 3);

            const triangles = MESHLOOKUP[meshId];
            console.log(meshId)

            // translate our mesh by the x and y
            const translated = triangles.map(m => m.map(p => ({ x: p.x + x, y: p.y + y }))) as Mesh;

            mesh.push(...translated)
        }
    }

    return mesh;
}

const meshToWorldCoord = (point: Point): Point => {
    return { x: (point.x + 1) * canvasResolution, y: (point.y + 1) * canvasResolution }
}

const render = (points: number[], ctx: CanvasRenderingContext2D) => {
    // draw the mesh
    const mesh = marchTheCubes(points);
    ctx.fillStyle = 'red'




    // debugger;
    for (const triangle of mesh) {
        const v = triangle.map(p => meshToWorldCoord(p));
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
            const brightness = Math.floor(sample * 255);

            ctx.beginPath();
            ctx.fillStyle = `rgb(${[brightness, brightness, brightness]})`;

            const circleCenter = meshToWorldCoord({ x, y });
            ctx.arc(circleCenter.x, circleCenter.y, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        }
    }

}

const main = () => {
    const sampledPoints = getPoints();
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    canvas.width = canvas.height = (sampleResolution + 1) * canvasResolution;

    render(sampledPoints, ctx);
}

main();