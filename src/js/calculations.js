// calculations.js
export function calculateMasonry(linearFeet, height, permit) {
  const area = linearFeet * height; // in square feet
  const bricksPerSqFt = 3; // average number of bricks per square foot
  const brickCost = 3.5; // cost per brick in dollars
  const laborCostPerSqFt = 10; // labor cost per square foot in dollars
  const permitCost = permit ? 300 : 0; // flat permit fee if needed

  const totalBricks = Math.ceil(area * bricksPerSqFt);
  const totalBrickCost = totalBricks * brickCost;
  const totalLaborCost = area * laborCostPerSqFt;
  const totalCost = totalBrickCost + totalLaborCost + permitCost;

  return {
    area,
    totalBricks,
    totalBrickCost,
    totalLaborCost,
    permitCost,
    totalCost
  };
}
// estimate rendering function
export function renderPreview(result) {
  const preview = document.getElementById('preview');
  preview.innerHTML = `
    <h2>Estimate Preview</h2>
    <p>Area: ${result.area.toFixed(2)} sq ft</p>
    <p>Total Bricks: ${result.totalBricks}</p>
    <p>Brick Cost: $${result.totalBrickCost.toFixed(2)}</p>
    <p>Labor Cost: $${result.totalLaborCost.toFixed(2)}</p>
    <p>Permit Cost: $${result.permitCost.toFixed(2)}</p>
    <h3>Total Cost: $${result.totalCost.toFixed(2)}</h3>
  `;
}