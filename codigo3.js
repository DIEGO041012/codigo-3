
$(".option").click(function(){
    $(".option").removeClass("active");
    $(this).addClass("active");
    
 });


 const angle = 20;

const lerp = (start, end, amount) => {
  return (1 - amount) * start + amount * end;
};

const remap = (value, oldMax, newMax) => {
  const newValue = ((value + oldMax) * (newMax * 2)) / (oldMax * 2) - newMax;
  return Math.min(Math.max(newValue, -newMax), newMax);
};

document.addEventListener("DOMContentLoaded", (event) => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((e) => {
    e.addEventListener("mousemove", (event) => {
      const rect = e.getBoundingClientRect();
      const centerX = (rect.left + rect.right) / 2;
      const centerY = (rect.top + rect.bottom) / 2;
      const posX = event.pageX - centerX;
      const posY = event.pageY - centerY;
      const x = remap(posX, rect.width / 2, angle);
      const y = remap(posY, rect.height / 2, angle);
      e.style.setProperty("--rotateX", `${y}deg`);
      e.style.setProperty("--rotateY", `${-x}deg`);
    });

    e.addEventListener("mouseout", (event) => {
      e.style.setProperty("--rotateX", "0deg");
      e.style.setProperty("--rotateY", "0deg");
    });
  });

  const update = () => {
    cards.forEach((e) => {
      let currentX = parseFloat(e.style.getPropertyValue("--rotateY"));
      let currentY = parseFloat(e.style.getPropertyValue("--rotateX"));
      if (isNaN(currentX)) currentX = 0;
      if (isNaN(currentY)) currentY = 0;
      const x = lerp(currentX, parseFloat(e.dataset.rotateY), 0.05);
      const y = lerp(currentY, parseFloat(e.dataset.rotateX), 0.05);
      e.style.setProperty("--rotateY", `${x}deg`);
      e.style.setProperty("--rotateX", `${y}deg`);
    });
  };

  setInterval(update, 1000 / 60);
});
