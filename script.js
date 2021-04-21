const currTime = document.querySelector('.time');

// set time 
let time = () => {
    let date = new Date();
    let hour = `${date.getHours()}`.padStart(2, '0');
    let minute = `${date.getMinutes()}`.padStart(2, '0');
    let second = `${date.getSeconds()}`.padStart(2, '0');
    let displayTime = hour + ":" + minute + ":" + second;
    currTime.innerHTML = displayTime; 
    let timeChange = setTimeout(time, 1000);
}

window.onload = () => {
    time();
};

let hr = (new Date()).getHours();
let mode; 

// toggle mode
if ( hr > 6 && hr < 18) {
    mode = true;
} else {
    mode = false;
}

let main = document.querySelector('main');
let header = document.querySelector('header');

let posts = document.querySelectorAll('.post');
let color = [
    '36, 113, 255', '40, 36, 255', '142, 36, 255', '233, 36, 255', 
    '255, 36, 167', '255, 36, 47', '255, 124, 36', '255, 200, 36',
    '222, 255, 36', '156, 255, 36', '36, 255, 51', '36, 255, 131',
]

// set css night/day
if (!mode)  {
    document.body.classList.add('darkBackground', 'darkColor');
    main.classList.add('darkBorder');
    document.querySelector('.time').classList.add('timeDark');
    header.classList.add('darkColor');
} else {
    document.querySelector('.time').classList.add('timeLight');
}

// onClick toggle day/night
currTime.addEventListener("click", () => {
    if (mode) {
        mode = false;
        document.body.classList.add('darkBackground', 'darkColor');
        header.classList.add('darkColor');
        main.classList.add('darkBorder');
        document.querySelector('.time').classList.add('timeDark');
        document.querySelector('.time').classList.remove('timeLight');
    } else {
        mode = true;
        document.body.classList.remove('darkBackground', 'darkColor');
        header.classList.remove('darkColor');
        main.classList.remove('darkBorder');
        document.querySelector('.time').classList.remove('timeDark');
        document.querySelector('.time').classList.add('timeLight');
        
    }

    posts.forEach(ele => {
        mode ? ele.classList.remove('darkBorder') : ele.classList.add('darkBorder');
        mode ? ele.classList.remove('darkPostPara') : ele.classList.add('darkPostPara');

        let idx = parseInt(ele.className.slice(9,10));
        let postTitle = document.querySelector(`.title${idx}`);


        if (postTitle) {
            mode ? postTitle.classList.remove('darkColor') : postTitle.classList.add('darkColor');
        }        
    });
});


posts.forEach(ele => {
    let idx = parseInt(ele.className.slice(9));
    let currPost = ele.className.slice(5);
    let postTitle = document.querySelector(`.title${idx}`);

    if (!mode) {
        ele.classList.add('darkBorder', 'darkPostPara');

        if(postTitle) {
            postTitle.classList.add('darkColor');
        } 
    }

    ele.addEventListener("mouseover", () => {
        let currColor = `rgb(${color[idx-1]})`;

        // change header color
        header.style.color = currColor;

        // change main background color 
        main.style.backgroundColor = `rgba(${color[idx-1]}, 0.07)`;
        header.style.backgroundColor = `rgba(${color[idx-1]}, 0.07)`;

        // change border color 
        main.style.borderColor = `${currColor}`;
        document.querySelector('.posts').style.borderColor = `${currColor}`;

        document.querySelectorAll('.post').forEach(ele => {
            ele.style.borderColor = currColor;
        });

        // change curr post color & background color 
        if (idx < 10) {
            document.querySelector(`.${currPost}`).style.backgroundColor = `rgba(${color[idx-1]}, 0.05)`;
            document.querySelector(`.time${idx}`).style.color = `rgba(${color[idx-1]}, 0.7)`;
        }

        // if there is post title change title color 
        if(postTitle) {
            postTitle.style.color = currColor;
        } 
    });


    ele.addEventListener("mouseout", () => {
        header.style.color = '';
        main.style.backgroundColor = '';
        header.style.backgroundColor = '';
        main.style.borderColor = '';
        document.querySelector('.posts').style.borderColor = '';
        postTitle ? postTitle.style.color = '' : '';

        document.querySelectorAll('.post').forEach(ele => {
            ele.style.borderColor = '';
        });

        document.querySelector(`.${currPost}`).style.backgroundColor = 'inherit';

        if (idx < 10) {
            document.querySelector(`.time${idx}`).style.color = '#5e5e5e';
        }

        if(postTitle) {
            mode ? postTitle.classList.remove('darkColor') : postTitle.classList.add('darkColor');
        } 
    });
});