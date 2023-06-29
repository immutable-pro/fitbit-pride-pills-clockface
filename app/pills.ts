import document from "document";

const colors = [
  "#ff1e26",
  "#f3941e",
  "#ffff00",
  "#06bd00",
  "#001a98",
  "#760088",
  "#000000",
  "#603814",
  "#75d5eb",
  "#f6aab7",
  "#ffffff",
  "#55cdfd",
];

export const fillPillColors = () =>
  colors.forEach(
    (color, i) =>
      ((document.getElementById(`pill-${i}`) as LineElement).style.fill = color)
  );
