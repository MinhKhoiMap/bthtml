const submitBtn = $("form .submit_btn");
const resetBtn = $("form .reset_btn");
const form = $("form").eq(0);
const nameInput = $("#name");
const ageInput = $("#age");
const listStudent = $("#show_list .row");

const genderRadios = $("#gender input");
const habitCheckboxs = $('input[name="habits"][type="checkbox"]');

let data = localStorage.getItem("studentLists")
  ? JSON.parse(localStorage.getItem("studentLists"))
  : [];

renderList();

function handleStudentTagClick(e) {
  let id = $(e.target).attr("ds-id");

  submitBtn.attr("ds-id", id);

  nameInput.val(data[id].name);
  ageInput.val(data[id].age);

  for (let checkbox of habitCheckboxs)
    if (data[id].habits.includes($(checkbox).val())) $(checkbox).prop("checked", true);

  for (let radio of genderRadios)
    if ($(radio).val() === data[id].gender) {
      $(radio).prop("checked", true);
      break;
    }
}

function renderList() {
  listStudent.html(
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
      : "<p class='text-center'>Không có học sinh nào.</p>"
  );
}

submitBtn.on("click", (e) => {
  e.preventDefault();
  const formData = new FormData(form[0]);

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

    submitBtn.removeAttr("ds-id");
    localStorage.setItem("studentLists", JSON.stringify(data));

    form[0].reset();
    renderList();
  } else {
    alert("Please enter a name");
  }
});

resetBtn.on("click", (e) => {
  e.preventDefault();
  form[0].reset();
});