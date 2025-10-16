// calculations 
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

export function calculatePavers(length, width, permit) {
  const area = length * width; // in square feet
  const bricksPerSqFt = 4; // average number of pavers per square foot
  const paverCost = 2; // cost per paver in dollars
  const laborCostPerSqFt = 12; // labor cost per square foot in dollars
  const permitCost = permit ? 300 : 0; // flat permit fee if needed

  const totalBricks = Math.ceil(area * bricksPerSqFt);
  const totalBrickCost = totalBricks * paverCost;
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

export function calculateConcrete(length, width, permit) {
  const area = length * width; // in square feet
  const concreteCostPerSqFt = 6; // cost per square foot in dollars
  const laborCostPerSqFt = 12; // labor cost per square foot in dollars
  const permitCost = permit ? 300 : 0; // flat permit fee if needed

  const totalBrickCost = area * concreteCostPerSqFt;
  const totalLaborCost = area * laborCostPerSqFt;
  const totalCost = totalBrickCost + totalLaborCost + permitCost;

  return {
    area,
    totalBrickCost,
    totalLaborCost,
    permitCost,
    totalCost
  };
}
