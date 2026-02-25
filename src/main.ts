const cubic = document.getElementById("cubic") as HTMLFormElement;

const trigSolve = (a: number, b: number, p: number, q: number): number[] => {
    const theta = Number(Math.acos(-q / (2 * Math.sqrt(-((p / 3) ** 3)))) / 3);
    const x1 = Number(2 * Math.sqrt(-p / 3) * Math.cos(theta) - b / (3 * a));
    const x2 = Number(2 * Math.sqrt(-p / 3) * Math.cos(theta + 2 * Math.PI / 3) - b / (3 * a));
    const x3 = Number(2 * Math.sqrt(-p / 3) * Math.cos(theta + 4 * Math.PI / 3) - b / (3 * a));
    return [x1, x2, x3]
}

cubic.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(cubic);
    const a = Number(formData.get("a"));
    const b = Number(formData.get("b"));
    const c = Number(formData.get("c"));
    const d = Number(formData.get("d"));
    const p = Number((3 * a * c - b ** 2) / (3 * a ** 2));
    const q = Number((27 * a ** 2 * d - 9 * a * b * c + 2 * b ** 3) / (27 * a ** 3));
    const discriminant = Number(((q / 2) ** 2 * 100 + (p / 3) ** 3 * 100) / 100);
    if (discriminant < 0) {
        console.log(trigSolve(a, b, p, q));
    }
})