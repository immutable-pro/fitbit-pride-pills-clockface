import document from "document";

const colors = [
  "#ff1e26", // 3 o'clock, red
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
  colors.forEach((color, i) => {
    const pill = document.getElementById(`pill-${i}`) as LineElement;
    pill.style.fill = color;
    if (i === 6) {
      // Nine o'clock, black pill
      pill.style.visibility = "hidden";
    }
  });
