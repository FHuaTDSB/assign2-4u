const cubic: HTMLFormElement = document.getElementById("cubic") as HTMLFormElement;
const graph: HTMLCanvasElement = document.getElementById("graph") as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = graph.getContext("2d") as CanvasRenderingContext2D;

const fixDecimal = (value: number, fix: number): number => {
    return parseFloat(value.toFixed(fix));
}

const trigSolve = (a: number, b: number, p: number, q: number): [number, number, number] => {
    const theta: number = Math.acos(-q / (2 * Math.sqrt(-((p / 3) ** 3)))) / 3;
    const x1: number = 2 * Math.sqrt(-p / 3) * Math.cos(theta) - b / (3 * a);
    const x2: number = 2 * Math.sqrt(-p / 3) * Math.cos(theta + 2 * Math.PI / 3) - b / (3 * a);
    const x3: number = 2 * Math.sqrt(-p / 3) * Math.cos(theta + 4 * Math.PI / 3) - b / (3 * a);
    return [fixDecimal(x1, 2), fixDecimal(x2, 2), fixDecimal(x3, 2)];
}

const cardano = (a: number, b: number, q: number, discriminant: number): number => {
    const x: number = Math.cbrt(-q / 2 + discriminant) + Math.cbrt(-q / 2 - discriminant) - b / (3 * a);
    return fixDecimal(x, 2);
}

cubic.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(cubic);
    const a: number = Number(formData.get("a"));
    const b: number = Number(formData.get("b"));
    const c: number = Number(formData.get("c"));
    const d: number = Number(formData.get("d"));

    const p: number = (3 * a * c - b ** 2) / (3 * a ** 2);
    const q: number = (27 * a ** 2 * d - 9 * a * b * c + 2 * b ** 3) / (27 * a ** 3);
    const discriminant = Number(fixDecimal((q / 2) ** 2 + (p / 3) ** 3, 12));

    let solutions: [number, number | string, number | string] = [0, 0, 0]
    if (discriminant < 0) {
        solutions = trigSolve(a, b, p, q);
    } else if (discriminant > 0) {
        solutions = [cardano(a, b, q, discriminant), "Complex", "Complex"];
    } else {
        if (p == 0 && q == 0) {
            for (let i = 0; i < 3; i++) {
                solutions[i] = cardano(a, b, q, discriminant);
            }
        } else {
            for (let i = 0; i < 2; i++) {
                solutions[i] = Math.cbrt(q / 2) - b / (3 * a);
            }
            solutions[2] = cardano(a, b, q, discriminant);
        }
    }

    const equation = document.getElementById("equation") as HTMLElement;
    const coefficients: number[] = [a, b, c];
    const coefficientDisplay = document.getElementsByClassName("coefficient") as HTMLCollectionOf<HTMLElement>;
    const tableValues = document.getElementsByClassName("table-value") as HTMLCollectionOf<HTMLElement>;

    equation.style.display = "block";
    tableValues[0].innerText = String(p);
    tableValues[1].innerText = String(q);
    tableValues[2].innerText = String(discriminant);
    ctx.clearRect(0, 0, 600, 600)
    ctx.beginPath();
    for (let i = 0; i < 30; i++) {
        ctx.moveTo(i * 20, 0);
        ctx.lineTo(i * 20, 600);
        ctx.moveTo(0, i * 20);
        ctx.lineTo(600, i * 20);
    }
    ctx.strokeStyle = "rgb(200, 200, 200)"
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(300, 0);
    ctx.lineTo(300, 600);
    ctx.moveTo(0, 300);
    ctx.lineTo(600, 300);
    ctx.strokeStyle = "black"
    ctx.stroke();
    ctx.beginPath();
    for (let i = 0; i < 3; i++) {
        if (typeof tableValues[i + 3] === "number") {
            tableValues[i + 3].innerText = `(${String(solutions[i])}, 0)`;
        } else {
            tableValues[i + 3].innerText = String(solutions[i]);
        }
        if (coefficients[i] == 1) {
            coefficientDisplay[i].innerText = "";
        } else {
            coefficientDisplay[i].innerText = String(coefficients[i]);
        }
        if (typeof solutions[i] === "number") {
            ctx.arc(Number(solutions[i]) * 20 + 300, 300, 3, 0, 2 * Math.PI);
        }
    }
    coefficientDisplay[3].innerText = String(d);
    ctx.fillStyle = "blue";
    ctx.fill();
})