
const slider = document.getElementById("myRange");
const people = document.getElementById('people');
const nump = document.getElementById('numP');
var submissions = JSON.parse(localStorage.getItem('submissions')) || [];
let person = {};
let amenities = [];
let injury = "";



const ams = document.querySelectorAll('#am-options .multi-choice');
const toggle = document.getElementById('myToggle');
submit.style.border = '0px';
submit.style.padding = '20px';
submit.style.backgroundColor = '#136ce9ff';
submit.style.color = '#fff';
submit.style.borderRadius = '15px';
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
    person['name'] = localStorage.getItem('firstName') || 'User';
    person['danger-level'] = value;
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
    for (var i = 0; i < amenities.length; i++) {
      if (amenities[i] == value) {
        present = true;
        index = i;
      }
    }
    if (present) {
      amenities.splice(index, 1);
    }
    else {
      amenities.push(value);
    }
    person['name'] = localStorage.getItem('firstName') || 'User';
    person["amenities"] = [...amenities];
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
});

people.addEventListener('change', (e) => {
  nump.textContent = people.value;
  person['num-people'] = people.value;
})
window.addEventListener('DOMContentLoaded', () => {
const submit = document.getElementById('submit');
submit.addEventListener('click', (e) => {
  // Ensure person always has defaults
  person['name'] = person['name'] || localStorage.getItem('firstName') || 'User';
  person['danger-level'] = person['danger-level'] || "0";
  person['amenities'] = person['amenities'] || [];
  person['injury'] = person['injury'] || 'no';
  person['num-people'] = person['num-people'] || '10';

  // Save submission
  submissions.push({ ...person });
  localStorage.setItem('submissions', JSON.stringify(submissions));

  // Reset inputs
  document.querySelectorAll('.multi-choice').forEach(el => el.style.backgroundColor = 'white');
  toggle.checked = false;
  slider.value = 0;
  slider.style.setProperty("--thumb-color", "#464444");
  nump.textContent = '10';

  // Clear person object AFTER resetting form
  person = {};

  // Style submit button to confirm

  console.log('Submission saved!', submissions);
});
});




const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  sidebar.classList.toggle('open');
});

