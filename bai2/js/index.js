const submitBtn = document.querySelector("form .submit_btn");
const resetBtn = document.querySelector("form .reset_btn");
const form = document.getElementsByTagName("form")[0];
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const listStudent = document.querySelector("#show_list .row");

const genderRadios = document.querySelectorAll("#gender input");
const habitCheckboxs = document.querySelectorAll(
  "input[name=habits][type=checkbox]"
);

let data = localStorage.getItem("studentLists")
  ? JSON.parse(localStorage.getItem("studentLists"))
  : [];

renderList();

function handleStudentTagClick(e) {
  let id = e.target.attributes["ds-id"].value;

  submitBtn.setAttribute("ds-id", id);

  nameInput.value = data[id].name;
  ageInput.value = data[id].age;

  for (let checkbox of habitCheckboxs)
    if (data[id].habits.includes(checkbox.value)) checkbox.checked = true;

  for (let radio of genderRadios)
    if (radio.value === data[id].gender) {
      radio.checked = true;
      break;
    }
}

function renderList() {
  listStudent.innerHTML =
    data.length > 0
      ? data
          .map(
            (student) => `
      <div class="col-md-2" onClick=handleStudentTagClick(event)>
        <p class="border border-black text-center p-2" ds-id="${student.id}">${student.name}</p>
      </div>
    `
          )
          .join("")
      : "<p class='text-center'>Không có học sinh nào.</p>";
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formData = new FormData(form);

  if (formData.get("name")) {
    if (!e.target.getAttribute("ds-id")) {
      data = [
        ...data,
        {
          id: data.length,
          name: formData.get("name"),
          age: formData.get("age"),
          gender: formData.get("gender"),
          habits: formData.getAll("habits"),
        },
      ];
    } else {
      data[e.target.getAttribute("ds-id")] = {
        ...data[e.target.getAttribute("ds-id")],
        name: formData.get("name"),
        age: formData.get("age"),
        gender: formData.get("gender"),
        habits: formData.getAll("habits"),
      };
    }

    submitBtn.removeAttribute("ds-id");
    localStorage.setItem("studentLists", JSON.stringify(data));

    form.reset();
    renderList();
  } else {
    alert("Please enter a name");
  }
});

resetBtn.onclick = (e) => {
  e.preventDefault();
  form.reset();
};
