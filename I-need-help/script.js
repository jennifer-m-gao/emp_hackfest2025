const slider = document.getElementById("myRange");
var submissions = [];
let person = {};
let amenities = [];
const testperson = document.getElementById('test-person');
const testdatabase = document.getElementById('tester');
const submit = document.querySelector('button');
const ams = document.querySelectorAll('#am-options .multi-choice');
submit.style.border = '0px';
submit.style.padding = '20px';
submit.style.backgroundColor = '#136ce9ff';
submit.style.color = '#fff';
submit.style.borderRadius = '15px';
testperson.textContent = "Current Entry: " + JSON.stringify(person);
slider.addEventListener('change', () => {
function updateThumbColor(value) {
    let color;
    if (value == 0) {
      color = '#464444';
    }
    else if (value < 3) {
      color = "green";
    } else if (value == 3) {
      color = "orange";
    } else {
      color = "red";
    }
    slider.style.setProperty("--thumb-color", color);
    person['name'] = 'Bob';
    person['danger-level'] = value;
    testperson.textContent = "Current Entry: " + JSON.stringify(person);
  }
  updateThumbColor(slider.value);

  slider.addEventListener("input", (e) => {
    updateThumbColor(e.target.value);
  });
})
Array.from(ams).forEach(element => {
  element.addEventListener('click', () => {
    if (element.style.backgroundColor != 'lightgray') {
      element.style.backgroundColor = 'lightgray';
    }
    else {
      element.style.backgroundColor = '#fff';
    }
    let p = element.querySelector('p');
    let index = 0;
    let value = p.textContent;
    let present = false;
    for (var i = 0; i<amenities.length; i++) {
      if (amenities[i] == value) {
        present = true;
        index = i;
      }
    }
    if (present) {
      amenities.splice(index,1);
    }
    else {
      amenities.push(value);
    }
    person['name'] = 'Bob';
    person["amenities"] = [...amenities];
    testperson.textContent = "Current Entry: " + JSON.stringify(person);
  })
});

submit.addEventListener('click', (e) => {
  if (person['name'] == null || person['danger-level'] == null || person['amenities'] == null) {
    alert('One or more fields are not filled out');
  }
  else {
  submissions.push({ ...person });
  testdatabase.textContent = "Current Submissions: " + JSON.stringify(submissions);
  person = {};
  testperson.textContent = "Current Entry: " + JSON.stringify(person);
  }
});



