const super__style = "super--style";
const super__style__body = [super__style, "body"].join("--");
const click__class__name = [super__style, "clicked"].join("--");
//////////////////////////////////////
/////////////////////////////////////
function super__cell__tooltip(table) {
  return [
    ...table.querySelectorAll("th"),
    ...table.querySelectorAll("td"),
  ].forEach((cell) => {
    return cell.setAttribute(
      "in",
      [
        "ردیف",
        Number(cell.parentNode.rowIndex) + 1,
        "ستون",
        Number(cell.cellIndex) + 1,
      ].join(" ")
    );
  });
}
////////////////////////////////////////////
////////////////////////////////////////////
function super__context__menu(table, cell) {
  let init = document.createElement("div");
  init.classList.add(
    super__style,
    [super__style, "context", "menu"].join("--")
  );
  init.setAttribute("title", cell.getAttribute("in"));
  init.append(
    super__find__cell(table),
    super__color(table, cell),
    super__background__color(table, cell),
    super__cell__editor(cell)
  );
  if (cell.parentNode.rowIndex > 0) {
    init.append(
      super__row__add__button(table, cell),
      super__row__remove__button(table, cell)
    );
  } else {
    init.append(
      super__column__add__button(table, cell),
      super__column__remove__button(table, cell)
    );
  }
  if (table.rows) {
    init.append(super__export__excel(table));
  }
  window.addEventListener("click", (e) => {
    if (e.target === document.body) {
      document.body.classList.remove(super__style__body);
      return init.remove();
    }
  });
  document.body.classList.add(super__style__body);
  return document.body.append(init);
}
////////////////////////////////
////////////////////////////////
const super__color = (table, cell) => {
  let init = document.createElement("div");
  let cell__color__input = document.createElement("input");
  let column__color__input = document.createElement("input");
  let row__color__input = document.createElement("input");
  init.classList.add(super__style, [super__style, "color", "init"].join("--"));
  cell__color__input.setAttribute("name", "سلول");
  column__color__input.setAttribute("name", "ستون");
  row__color__input.setAttribute("name", "ردیف");
  init.append(
    "تنظیم رنگ قلم",
    cell__color__input,
    column__color__input,
    row__color__input
  );
  [cell__color__input, column__color__input, row__color__input].forEach(
    (input) => {
      input.type = "color";
      input.style.background = cell.style.background;
      input.style.color = cell.style.color;
    }
  );
  cell__color__input.addEventListener("change", () => {
    cell.style.color = cell__color__input.value;
  });
  column__color__input.addEventListener("change", () => {
    [...table.querySelectorAll("th"), ...table.querySelectorAll("td")].forEach(
      (t) => {
        if (t.cellIndex === cell.cellIndex) {
          t.style.color = column__color__input.value;
        }
      }
    );
  });
  row__color__input.addEventListener("change", () => {
    test__table.querySelectorAll("tr").forEach((tr) => {
      if (tr.rowIndex === cell.parentNode.rowIndex) {
        for (let c of tr.cells) {
          c.style.color = row__color__input.value;
        }
      }
    });
  });
  return init;
};
////////////////////////////////////////////////////
///////////////////////////////////////////////////
const super__background__color = (table, cell) => {
  let init = document.createElement("div");
  let cell__color__input = document.createElement("input");
  let column__color__input = document.createElement("input");
  let row__color__input = document.createElement("input");
  init.classList.add(
    super__style,
    [super__style, "background", "color", "init"].join("--")
  );
  cell__color__input.setAttribute("name", "سلول");
  column__color__input.setAttribute("name", "ستون");
  row__color__input.setAttribute("name", "ردیف");
  init.append(
    "تنظیم رنگ پس زمینه",
    cell__color__input,
    column__color__input,
    row__color__input
  );
  [cell__color__input, column__color__input, row__color__input].forEach(
    (input) => {
      input.type = "color";
      input.style.background = cell.style.background;
      input.style.color = cell.style.color;
    }
  );
  cell__color__input.addEventListener("change", () => {
    cell.style.background = cell__color__input.value;
  });
  column__color__input.addEventListener("change", () => {
    [...table.querySelectorAll("th"), ...table.querySelectorAll("td")].forEach(
      (t) => {
        if (t.cellIndex === cell.cellIndex) {
          t.style.background = column__color__input.value;
        }
      }
    );
  });
  row__color__input.addEventListener("change", () => {
    test__table.querySelectorAll("tr").forEach((tr) => {
      if (tr.rowIndex === cell.parentNode.rowIndex) {
        for (let c of tr.cells) {
          c.style.background = row__color__input.value;
        }
      }
    });
  });
  return init;
};
////////////////////////////////////////////
////////////////////////////////////////////
const super__find__cell = (table) => {
  let init = document.createElement("div");
  let input = document.createElement("input");
  init.classList.add(
    super__style,
    [super__style, "find", "cell", "init"].join("--")
  );
  input.classList.add(
    super__style,
    [super__style, "find", "cell", "input"].join("--")
  );
  input.placeholder = "جستجو در سلول های جدول ...";
  input.addEventListener("input", () => {
    init.querySelectorAll("button").forEach((button) => button.remove());
    if (input.value) {
      [
        ...table.querySelectorAll("th"),
        ...table.querySelectorAll("td"),
      ].forEach((cell) => {
        if (cell.textContent.includes(input.value)) {
          let button = document.createElement("button");
          button.classList.add(
            super__style,
            [super__style, "find", "cell", "button"].join("--")
          );
          button.append(cell.textContent);
          init.append(button);
          button.addEventListener("click", () => {
            document
              .querySelector("." + [super__style, "context", "menu"].join("--"))
              .remove();
            return cell.click();
          });
        }
      });
    }
  });
  init.append(input);
  return init;
};
////////////////////////////////////////
///////////////////////////////////////
const super__cell__editor = (cell) => {
  let init = document.createElement("div");
  let textarea = document.createElement("textarea");
  let button = document.createElement("button");
  let span = document.createElement("span");
  init.classList.add(
    super__style,
    [super__style, "cell", "editor", "init"].join("--")
  );
  textarea.classList.add(
    super__style,
    [super__style, "cell", "editor", "textarea"].join("--")
  );
  button.classList.add(
    super__style,
    [super__style, "cell", "editor", "button"].join("--")
  );
  span.classList.add(
    super__style,
    [super__style, "cell", "editor", "button", "span"].join("--")
  );
  fetch("/svg/check.svg")
    .then((response) => {
      return response.text();
    })
    .then((svg) => {
      span.innerHTML = svg;
    });
  (textarea.value = cell.innerText), button.append(span, "ثبت/ویرایش");
  textarea.placeholder = "متن ...";
  init.append(textarea, button);
  button.addEventListener("click", () => {
    cell.textContent = textarea.value;
    document.body.classList.remove(super__style__body);
    return document
      .querySelector("." + [super__style, "context", "menu"].join("--"))
      .remove();
  });
  return init;
};
////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
const super__column__add__button = (table, cell) => {
  let init = document.createElement("button");
  let span = document.createElement("span");
  init.classList.add(
    super__style,
    [super__style, "column", "add", "button"].join("--")
  );
  span.classList.add(
    super__style,
    [super__style, "column", "add", "button", "span"].join("--")
  );
  fetch("/svg/add.svg")
    .then((response) => {
      return response.text();
    })
    .then((svg) => {
      span.innerHTML = svg;
    });
  init.append(span, "ایجاد ستون جدید");
  init.addEventListener("click", () => {
    table
      .querySelector("thead")
      .querySelectorAll("tr")
      .forEach((tr) => {
        let th = document.createElement("th");
        th.append("ستون جدید!");
        tr.insertBefore(th, tr.cells[cell.cellIndex + 1]);
        th.addEventListener("click", () => {
          return super__context__menu(table, th);
        });
      });
    table
      .querySelector("tbody")
      .querySelectorAll("tr")
      .forEach((tr) => {
        let td = document.createElement("td");
        td.append("سلول جدید!");
        tr.insertBefore(td, tr.cells[cell.cellIndex + 1]);
        td.addEventListener("click", () => {
          return super__context__menu(table, td);
        });
      });
    super__cell__tooltip(table);
  });
  return init;
};
/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
const super__column__remove__button = (table, cell) => {
  let init = document.createElement("button");
  let span = document.createElement("span");
  let table__rows = table.querySelectorAll("tr");
  init.classList.add(
    super__style,
    [super__style, "column", "remove", "button"].join("--")
  );
  span.classList.add(
    super__style,
    [super__style, "column", "remove", "button", "span"].join("--")
  );
  fetch("/svg/delete.svg")
    .then((response) => {
      return response.text();
    })
    .then((svg) => {
      span.innerHTML = svg;
    });
  init.append(span, "حذف ستون");
  init.addEventListener("click", () => {
    const index = Number(cell.cellIndex);
    table__rows.forEach((row) => {
      row.deleteCell(index);
    });
    document.body.classList.remove(super__style__body);
    super__cell__tooltip(table);
    return document
      .querySelector("." + [super__style, "context", "menu"].join("--"))
      .remove();
  });
  return init;
};
//////////////////////////////////////////////////
//////////////////////////////////////////////////
const super__row__add__button = (table, cell) => {
  let init = document.createElement("button");
  let span = document.createElement("span");
  init.classList.add(
    super__style,
    [super__style, "row", "add", "button"].join("--")
  );
  span.classList.add(
    super__style,
    [super__style, "row", "add", "button", "span"].join("--")
  );
  fetch("/svg/add.svg")
    .then((response) => {
      return response.text();
    })
    .then((svg) => {
      span.innerHTML = svg;
    });
  init.append(span, "ایجاد ردیف جدید");
  init.addEventListener("click", () => {
    table
      .querySelector("tbody")
      .querySelectorAll("tr")
      .forEach((tr) => {
        if (tr.rowIndex === cell.parentNode.rowIndex) {
          let row = document.createElement("tr");
          table
            .querySelector("tbody")
            .insertBefore(
              row,
              table.querySelector("tbody").rows[cell.parentNode.rowIndex]
            );
          let number = 0;
          while (number < Number(table.querySelector("tr").cells.length)) {
            let td = document.createElement("td");
            td.append("ردیف جدید!");
            row.append(td);
            td.addEventListener("click", () => {
              return super__context__menu(table, td);
            });
            ++number;
          }
        }
      });
    super__cell__tooltip(table);
  });
  return init;
};
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
const super__row__remove__button = (table, cell) => {
  let init = document.createElement("button");
  let span = document.createElement("span");
  init.classList.add(
    super__style,
    [super__style, "row", "remove", "button"].join("--")
  );
  span.classList.add(
    super__style,
    [super__style, "row", "remove", "button", "span"].join("--")
  );
  fetch("/svg/delete.svg")
    .then((response) => {
      return response.text();
    })
    .then((svg) => {
      span.innerHTML = svg;
    });
  init.append(span, "حذف ردیف");
  init.addEventListener("click", () => {
    table.querySelector("tbody").rows[cell.parentNode.rowIndex - 1].remove();
    document.body.classList.remove(super__style__body);
    super__cell__tooltip(table);
    return document
      .querySelector("." + [super__style, "context", "menu"].join("--"))
      .remove();
  });
  return init;
};
/////////////////////////////////////////
////////////////////////////////////////
const super__export__excel = (table) => {
  let init = document.createElement("button");
  let span = document.createElement("span");
  init.classList.add(
    super__style,
    [super__style, "export", "excel", "init"].join("--")
  );
  span.classList.add(
    super__style,
    [super__style, "export", "excel", "span"].join("--")
  );
  fetch("/svg/export.svg")
    .then((response) => {
      return response.text();
    })
    .then((svg) => {
      span.innerHTML = svg;
    });
  init.append(span, "خروجی جدول به اکسل!");
  init.addEventListener("click", () => {
    try {
      const blob = new Blob([table.outerHTML], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
      location.href = URL.createObjectURL(blob);
    } catch (error) {
      alert(error);
    }
  });
  return init;
};
////////////////////////////////////////////////////
////////////////////////////////////////////////////
document.querySelectorAll("table").forEach((table) => {
  super__cell__tooltip(table);
  [...table.querySelectorAll("td"), ...table.querySelectorAll("th")].forEach(
    (cell) => {
      cell.addEventListener("click", () => {
        return super__context__menu(table, cell);
      });
    }
  );
});
