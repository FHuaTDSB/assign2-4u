const cubic = document.getElementById("cubic") as HTMLFormElement;

const fixDecimal = (value: number): number => {
    return parseFloat(String(value.toFixed(12)));
}

const trigSolve = (a: number, b: number, p: number, q: number): number[] => {
    const theta: number = Math.acos(-q / (2 * Math.sqrt(-((p / 3) ** 3)))) / 3;
    const x1: number = 2 * Math.sqrt(-p / 3) * Math.cos(theta) - b / (3 * a);
    const x2: number = 2 * Math.sqrt(-p / 3) * Math.cos(theta + 2 * Math.PI / 3) - b / (3 * a);
    const x3: number = 2 * Math.sqrt(-p / 3) * Math.cos(theta + 4 * Math.PI / 3) - b / (3 * a);
    return [fixDecimal(x1), fixDecimal(x2), fixDecimal(x3)];
}

const cardano = (a: number, b: number, q: number, discriminant: number): number => {
    const x: number = Math.cbrt(-q / 2 + discriminant) + Math.cbrt(-q / 2 - discriminant) - b / (3 * a);
    return fixDecimal(x);
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
    const discriminant = Number(fixDecimal((q / 2) ** 2 + (p / 3) ** 3));
    if (discriminant < 0) {
        const solutions: number[] = trigSolve(a, b, p, q);
        console.log(solutions)
    } else if (discriminant > 0) {
        const solutions: [number, string, string] = [cardano(a, b, q, discriminant), "Complex", "Complex"];
        console.log(solutions)
    }
})