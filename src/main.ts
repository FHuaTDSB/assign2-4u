const cubic = document.getElementById("cubic") as HTMLFormElement;

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
    console.log(discriminant)
})