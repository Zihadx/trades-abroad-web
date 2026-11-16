/** Unsplash direct links. Each entry is a list: the first that loads wins, so a dead link never leaves a blank. */
const u = (id: string, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${w}`;
// Verified against Unsplash search pages
const V = { foreman: "1787672357797-f5fa35bb0d18", uniform: "1787672357491-d43acdf974cb", hardhat: "1787630551590-48debd4bd588", truck: "1689337091593-2992b537f02c", drill: "1643509867448-57001e0c333d", screw: "1643512290109-3ad082e25b92", tools: "1645651964715-d200ce0939cc", warehouse: "1772300164438-f73307d3b645", shed: "1473621038790-b778b4750efe", hammer: "1643509963821-563d2ddb0812" };
const L = (ids: string[], w?: number) => ids.map((i) => u(i, w));

export const tradeImg: Record<string, string[]> = {
  electrical: L(["1621905251918-48416bd8575a", V.uniform], 1200),
  plumbing: L(["1607472586893-edb57bdc0e39", V.hammer], 1200),
  welding: L(["1504328345606-18bbc8c9d7d1", V.shed], 1200),
  construction: L(["1504307651254-35680f356dfd", V.foreman], 1200),
  carpentry: L(["1504148455328-c376907d081c", V.drill], 1200),
  hvac: L(["1581094288338-2314dddb7ece", V.screw], 1200),
  mechanical: L(["1581092918056-0c4c3acd3789", V.tools], 1200),
  "heavy-equipment": L(["1541888946425-d81bb19240f5", V.truck], 1200),
  automotive: L(["1486262715619-67b85e0b08d3", V.tools], 1200),
  "other-trades": L([V.hardhat, V.warehouse], 1200),
};
export const destImg: Record<string, string[]> = {
  australia: L(["1506973035872-a4ec16b8e8d9", "1523482580672-f109ba8cb9be"], 1200),
  canada: L(["1517935706615-2717063c2225", "1503614472-8c93d56e92ce"], 1200),
  "united-kingdom": L(["1513635269975-59663e0ac1ad", "1486299267070-83823f5448dd"], 1200),
  germany: L(["1560969184-10fe8719e047", "1467269204594-9661b134dd2b"], 1200),
  uae: L(["1512453979798-5ea266f8880c", "1518684079-3c830dcef090"], 1200),
  "new-zealand": L(["1507699622108-4be3abd695ad", "1469521669194-babb45599def"], 1200),
};
export const img = {
  hero: L(["1503387762-592deb58ef4e", V.foreman], 2000),
  employers: L(["1531834685032-c34bf0d84c77", V.hardhat], 1400),
  bandBuild: L(["1541888946425-d81bb19240f5", "1504307651254-35680f356dfd", V.truck], 2000),
  bandWeld: L(["1504328345606-18bbc8c9d7d1", V.shed, V.warehouse], 2000),
  bandCity: L(["1512453979798-5ea266f8880c", "1513635269975-59663e0ac1ad"], 2000),
  space: L(["1446776811953-b23d57bd21aa", "1451187580459-43490279c0fa"], 2000),
  about: L(["1581094288338-2314dddb7ece", V.warehouse, V.foreman], 1600),
};
export const articleImg = (slug: string): string[] => ({
  "international-trades-careers": tradeImg.construction,
  "preparing-overseas": tradeImg.electrical,
  "trades-in-demand": tradeImg.welding,
  "international-recruitment": tradeImg.mechanical,
  "career-development": tradeImg.hvac,
}[slug] ?? tradeImg["other-trades"]);
