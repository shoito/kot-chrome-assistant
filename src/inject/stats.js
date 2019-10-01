(() => {
  let countable = 0;
  document.querySelectorAll("td[data-ht-sort-index=ALL_WORK_MINUTE]").forEach(td => {
    if (td.innerText) {
      countable++;
    }
  });

  if (countable === 0) {
    return;
  }

  console.log("Content Scripts is injected by KoT Chrome Assistant.")

  const th_allWorkTime = document.querySelector("th.all_work_time")
  const td_allWorkTime = document.querySelector("td.all_work_time")

  if (!(th_allWorkTime && td_allWorkTime)) {
    return;
  }

  const allWorkTime = parseFloat(td_allWorkTime.innerText);
  const avgWorkTime = Math.round(allWorkTime * 100 / countable) / 100;
  console.log(`集計可能日数: ${countable}, 労働合計時間: ${allWorkTime}, 労働平均時間: ${avgWorkTime}`);

  const th = document.createElement("th");
  const p = document.createElement("p");
  p.textContent = "労働平均";
  th.appendChild(p);
  th_allWorkTime.parentNode.appendChild(th);

  const td = document.createElement("td");
  td.setAttribute("rowspan", 2);
  td.textContent = avgWorkTime;
  td_allWorkTime.parentNode.appendChild(td);
})();