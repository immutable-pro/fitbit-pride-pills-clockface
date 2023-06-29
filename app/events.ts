import document from "document";

const onClick = (_evt) => console.log("click");

export const setupTouchEvents = () => {
  document.getElementById("background").addEventListener("click", onClick);
  document.getElementsByTagName("line").forEach((element) => {
    element.addEventListener("click", onClick);
  });
  document.getElementsByTagName("circle").forEach((element) => {
    element.addEventListener("click", onClick);
  });
};
