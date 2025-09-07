window.addEventListener('DOMContentLoaded', () => {
    const submit = document.getElementById('submit');
    const slider = document.getElementById("myRange");
    const people = document.getElementById('people');
    const nump = document.getElementById('numP');
    const toggle = document.getElementById('myToggle');
    const ams = document.querySelectorAll('#am-options .multi-choice');
    
    var submissions = JSON.parse(localStorage.getItem('submissions')) || [];
    let person = {};
    let amenities = [];

    slider.addEventListener("input", (e) => {
        let value = e.target.value;
        let color;
        if (value == 0) color = '#464444';
        else if (value < 3) color = 'green';
        else if (value == 3) color = "orange";
        else color = "red";
        slider.style.setProperty("--thumb-color", color);
        person['danger-level'] = value;
        person['name'] = localStorage.getItem('firstName') || 'User';
    });

    Array.from(ams).forEach(element => {
        element.addEventListener('click', () => {
            element.classList.toggle('selected');
            amenities = Array.from(ams)
            .map(el => el.querySelector('p').textContent);
            person['amenities'] = [...amenities];
            person['name'] = localStorage.getItem('firstName') || 'User';
        });
    });

    toggle.addEventListener('change', (e) => {
        person['injury'] = e.target.checked ? "yes" : "no";
    });

    people.addEventListener('input', (e) => {
        nump.textContent = people.value;
        person['num-people'] = people.value;
    });

    submit.addEventListener('click', () => {
        person['name'] = person['name'] || localStorage.getItem('firstName') || 'User';
        person['danger-level'] = person['danger-level'] || "0";
        person['amenities'] = person['amenities'] || [];
        person['injury'] = person['injury'] || 'no';
        person['num-people'] = person['num-people'] || '10';
        submissions.push({ ...person });
        localStorage.setItem('submissions', JSON.stringify(submissions));
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
