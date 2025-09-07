window.addEventListener('DOMContentLoaded', () => {
    // Getting elements
    const submit = document.getElementById('submit');
    const slider = document.getElementById("myRange");
    const people = document.getElementById('people');
    const nump = document.getElementById('numP');
    const toggle = document.getElementById('myToggle');
    const ams = document.querySelectorAll('#am-options .multi-choice');
    // User's name drawn from local storage, if not entered then use 'user'
    const name = localStorage.getItem('firstName') || 'User'
    // Submissions are stored in this array which is stored in local storage, 
    // this variable retrieves that array to add to it if present and if it is not present 
    // in local storage it then creates a new array
    var submissions = JSON.parse(localStorage.getItem('submissions')) || [];
    // temporary dictionary for a user's help request that will be added to
    // the submissions array
    let person = {};
    // list of amenities user has chosen from multiselect
    let amenities = [];
    // dynamic code for danger slider
    slider.addEventListener("input", (e) => {
        let value = e.target.value;
        let color;
        // if slider's value is 0 then the slider's thumb is gray
        if (value == 0) color = '#464444';
        // if the value is 1-2 is the thumb is green
        else if (value < 3) color = 'green';
        // if the valur is 3 then the thumb is orange 
        else if (value == 3) color = "orange";
        // 4-5 is red
        else color = "red";
        // sets the color of the thumb to determined color
        slider.style.setProperty("--thumb-color", color);
        // adds danger value from slider selected by user to the person dictionary
        person['danger-level'] = value;
        
    });
    // multi select amenities dynamic code 
    Array.from(ams).forEach(element => {
        element.addEventListener('click', () => {
            // if a choice is selected then it toggles (adds) the selected class to the
            // element's classlist, turning it gray, otherwise if it is unselected it toggles
            // it back to white by removing selected from the classlist
            element.classList.toggle('selected');
            //goes through amenities, finds the selected elements and then creates a new array that has the p tag values inside the elements 
            amenities = Array.from(ams).filter(el => el.classList.contains('selected')).map(el => el.querySelector('p').textContent);
            //adds the amenities list to the dictionary
            person['amenities'] = [...amenities];
            
        });
    });

    //code for the injuries toggle
    toggle.addEventListener('change', (e) => {
        // if checked then yes injury otherwise no
        person['injury'] = e.target.checked ? "yes" : "no";
    });
    //code for number of people slider
    people.addEventListener('input', (e) => {
        //sets the number next to the slider to the value of the slider
        nump.textContent = people.value;
        //adds the value of the slider to the dictionary
        person['num-people'] = people.value;
    });
    //code for submit button
    submit.addEventListener('click', () => {
        //sets values for dictionary fiels, (name is set to name here once), and adds default values if a 
        //wasn't filled out
        person['name'] = name;
        person['danger-level'] = person['danger-level'] || "0";
        person['amenities'] = person['amenities'] || [];
        person['injury'] = person['injury'] || 'no';
        person['num-people'] = person['num-people'] || '10';
        //adds the dictionary to the submission array as another entry
        submissions.push({ ...person });
        //saves the submissions array to local storage for use else where
        localStorage.setItem('submissions', JSON.stringify(submissions));
        //resets form
        ams.forEach(el => el.classList.remove('selected'));
        toggle.checked = false;
        slider.value = 0;
        slider.style.setProperty("--thumb-color", "#464444");
        nump.textContent = '10';
        person = {};
    });

    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        sidebar.classList.toggle('open');
    });
});
