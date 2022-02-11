export function getTier(worksheet) {
  if (
    meetsLevel("S1_IN_MAND_Scope", 1) &&
    meetsLevel("S1_IN_MAND_DataClassification", 1) &&
    meetsLevel("S1_IN_MAND_Integrity", 1) &&
    meetsLevel("S1_IN_MAND_Availability", 1) &&
    meetsLevel("S1_IN_MAND_DeploymentModel", 1)
  ) {
    return 0;
  } else if (
    meetsLevel("S1_IN_MAND_DataClassification", 2) &&
    meetsLevel("S1_IN_MAND_Integrity", 2) &&
    meetsLevel("S1_IN_MAND_Availability", 2)
  ) {
    return 1;
  } else if (
    meetsLevel("S1_IN_MAND_DataClassification", 3) &&
    meetsLevel("S1_IN_MAND_Integrity", 3) &&
    meetsLevel("S1_IN_MAND_Availability", 3)
  ) {
    if (!worksheet.getCell("S1_IN_MAND_DataResidency").value === "Other") {
      return 2;
    } else return 2;
  } else if (
    worksheet.getCell("S1_IN_MAND_Integrity").value === "High" ||
    worksheet.getCell("S1_IN_MAND_Availability").value === "High"
  ) {
    return 3;
  }
  return -1;
}

function meetsLevel(worksheet, cellName, level) {
  let criteria;
  let value = worksheet.getCell(cellName).value;

  for (let i = 1; i <= level; i++) {
    if (value === criteria) {
      return true;
    }
  }

  return false;
}

// return JSON object with the three layer names: SaaS, IaaS, PaaS
export function getLayerNames() {
  return {
    SaaS: "SaaS",
    PaaS: "PaaS",
    IaaS: "IaaS",
  };
}

// returns all input for a given layer: SaaS, IaaS, PaaS
export function getLayerCellNames(layer) {
  let names = {};

  if (layer !== "SaaS" && layer !== "PaaS" && layer !== "IaaS") {
    console.error(
      `Layer must be one of SaaS, PaaS, IaaS. ${layer} was passed instead`
    );
    return null;
  }

  names[`S1_IN_27001_${layer}`] = `S1_IN_27001_${layer}`;
  names[`S1_IN_27017_${layer}`] = `S1_IN_27017_${layer}`;
  names[`S1_IN_SOC2Type2_${layer}`] = `S1_IN_SOC2Type2_${layer}`;
  names[
    `S1_IN_PointerToCSARegistry_${layer}`
  ] = `S1_IN_PointerToCSARegistry_${layer}`;
  names[`S1_IN_27018_${layer}`] = `S1_IN_27018_${layer}`;

  if (layer !== "SaaS") {
    names[
      `S1_IN_InheritedGCApprovedCSP_${layer}`
    ] = `S1_IN_InheritedGCApprovedCSP_${layer}`;
  }
  return names;
}

// returns all input cell names for all layers
export function getAllLayerCellNames() {
  const layers = Object.keys(getLayerNames());
  let names = {};
  layers.forEach((layer) => {
    names = { ...names, ...getLayerCellNames(layer) };
  });
  return names;
}

// Determine if a cell is true (contains True OR Yes)
export function cellIsTrue(cell) {
  return cell.value === "TRUE" || cell.value === "Yes";
}
