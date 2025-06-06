export function calculateBlocks({
  gender,
  age,
  height,
  weight,
  activityLevel,
}) {
  const baseBlocks = weight / 7;

  let activityMultiplier = 1;
  if (activityLevel === "0") activityMultiplier = 1;
  else if (activityLevel === "1-2") activityMultiplier = 1.1;
  else if (activityLevel === "3-4") activityMultiplier = 1.25;
  else if (activityLevel === "5+") activityMultiplier = 1.4;

  const totalBlocks = Math.round(baseBlocks * activityMultiplier);

  // Makro dağılım (bloka göre)
  const proteinBlocks = Math.round(totalBlocks * 0.3);
  const carbBlocks = Math.round(totalBlocks * 0.4);
  const fatBlocks = totalBlocks - proteinBlocks - carbBlocks;

  // Öğünlere bölme (isteğe bağlı)
  // ...

  return {
    totalBlocks,
    proteinBlocks,
    carbBlocks,
    fatBlocks,
  };
}
