const slider = document.getElementById("myRange");
const people = document.getElementById('people');
const nump = document.getElementById('numP');
var submissions = [{"name":"Bob","amenities":["Communication","Food"],"danger-level":"2", "injury":'yes', 'num-people':'9'}, {"name": "Annie", "amenities": ["Communication", "Water", "First Aid"], "danger-level":"1", "injury":'yes', 'num-people':'2'}, {"name": "Julian", "danger-level": "5", "amenities": ["Communication"], "injury":'no', 'num-people':'15'}];
let person = {};
let amenities = [];
let injury = "";
const testperson = document.getElementById('test-person');
const testdatabase = document.getElementById('tester');
const submit = document.querySelector('button');
const ams = document.querySelectorAll('#am-options .multi-choice');
const toggle = document.getElementById('myToggle');
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
toggle.addEventListener('change', (e) => {
  if (e.target.checked) {
    injury = "yes";
  }
  else {
    injury = "no";
  }
  person['injury'] = injury;
  testperson.textContent = "Current Entry: " + JSON.stringify(person);
});

people.addEventListener('change', (e) => {
  nump.textContent = people.value;
  person['num-people'] = people.value;
  testperson.textContent = "Current Entry: " + JSON.stringify(person);
})
submit.addEventListener('click', (e) => {
  if (person['name'] == null) {person['name'] = 'John';}
  if (person['danger-level'] == null) {person['danger-level'] = "0";}
  if (person['amenities'] == null) {person['amenities'] = [];}
  if (person['injury']==null) {person['injury'] = 'no';}
  if (person['num-people']==null){person['num-people']='10';}
  submissions.push({ ...person });
  localStorage.setItem('submissions', JSON.stringify(submissions));
  testdatabase.textContent = "Current Submissions: " + JSON.stringify(submissions);
  person = {};
  testperson.textContent = "Current Entry: " + JSON.stringify(person);
  document.querySelectorAll('.multi-choice').forEach(element => {
    element.style.backgroundColor = 'white';
  });
  toggle.checked = false;
  slider.value = 0;
  slider.style.setProperty("--thumb-color", "#464444");

  
});



