const playerData = {
    "MS Dhoni": {
        role: "Wicket Keeper Batsman",
        batting: "Right hand batsman",
        dob: "July 7, 1981",
        origin: "Ranchi, Jharkhand, India",
        img: "assets/images/dhoni1.png"
    },
    "Suresh Raina": {
        role: "Batsman",
        batting: "Left hand batsman",
        dob: "November 27, 1986",
        origin: "Ghaziabad, Uttar Pradesh, India",
        img: "assets/images/rain.png"
    },
    "Ruturaj Gaikwad": {
        role: "Captain / Batsman",
        batting: "Right hand batsman",
        dob: "January 31, 1997",
        origin: "Pune, Maharashtra, India",
        img: "assets/images/ruru.png"
    },
    "Faf du Plessis": {
        role: "Batsman",
        batting: "Right hand batsman",
        dob: "July 13, 1984",
        origin: "Pretoria, South Africa",
        img: "assets/images/fahh.png"
    },
    "Shane Watson": {
        role: "All-rounder",
        batting: "Right hand batsman",
        dob: "June 17, 1981",
        origin: "Ipswich, Australia",
        img: "assets/images/watson.png"
    },
    "Ravindra Jadeja": {
        role: "All-rounder",
        batting: "Left hand batsman",
        dob: "December 6, 1988",
        origin: "Navagam-Ghed, Gujarat, India",
        img: "assets/images/jadeja.png"
    },
    "Dwayne Bravo": {
        role: "All-rounder / Bowler",
        batting: "Right hand batsman",
        dob: "October 7, 1983",
        origin: "Santa Cruz, Trinidad",
        img: "assets/images/bravo.png.png"
    },
    "Ambati Rayudu": {
        role: "Batsman",
        batting: "Right hand batsman",
        dob: "September 23, 1985",
        origin: "Guntur, Andhra Pradesh, India",
        img: "assets/images/rayudu.png"
    },
    "Deepak Chahar": {
        role: "Bowler",
        batting: "Right hand batsman",
        dob: "August 7, 1992",
        origin: "Agra, Uttar Pradesh, India",
        img: "assets/images/chahar.png.png"
    },
    "Shardul Thakur": {
        role: "Bowler",
        batting: "Right hand batsman",
        dob: "October 16, 1991",
        origin: "Palghar, Maharashtra, India",
        img: "assets/images/thakur.png"
    },
    "Shivam Dube": {
        role: "All-rounder",
        batting: "Left hand batsman",
        dob: "June 26, 1993",
        origin: "Mumbai, Maharashtra, India",
        img: "assets/images/dube.png"
    },
    "Sanju Samson": {
        role: "Wicket Keeper Batsman",
        batting: "Right hand batsman",
        dob: "November 11, 1994",
        origin: "Vizhinjam, Kerala, India",
        img: "assets/images/sanju.png"
    },
    "Sam Curran": {
        role: "All-rounder",
        batting: "Left hand batsman",
        dob: "June 3, 1998",
        origin: "Northampton, England",
        img: "assets/images/sam.png"
    },
    "Karthik Sharma": {
        role: "Wicket Keeper",
        batting: "Right hand batsman",
        dob: "July 15, 1995",
        origin: "Delhi, India",
        img: "assets/images/karthik.png"
    },
    "Urvil Patel": {
        role: "Wicket Keeper",
        batting: "Right hand batsman",
        dob: "October 17, 1998",
        origin: "Ahmedabad, Gujarat, India",
        img: "assets/images/urvil.png"
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const playerName = urlParams.get('name');

    if (playerName && playerData[playerName]) {
        const player = playerData[playerName];
        document.getElementById('player-name').textContent = playerName;
        document.getElementById('player-role').textContent = player.role;
        document.getElementById('player-batting').textContent = player.batting;
        document.getElementById('player-dob').textContent = player.dob;
        document.getElementById('player-origin').textContent = player.origin;
        document.getElementById('player-img').src = player.img;
        document.title = `${playerName} | CSK Details`;
    } else {
        document.getElementById('player-name').textContent = "Player Not Found";
        document.getElementById('player-role').style.display = "none";
        document.querySelector('.details-grid').style.display = "none";
    }
});
