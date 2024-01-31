function removeActiveClass() {
    const allTopics = document.querySelectorAll(".hover-topics");
    //Remove active class from all li elements
    allTopics.forEach(function (topic) {
        topic.classList.remove('active');
    });
}

//function change color of topics on click
function changeColor(element) {
    removeActiveClass();
    //Add active class to li element which is clicked
    element.classList.add('active');
    const inputValue = document.querySelector(".input-box");
    inputValue.value = null;
}

const search = document.getElementById('searchButton');
search.addEventListener('click', () => {
    const inputValue = document.querySelector(".input-box").value.toLowerCase();
    if (inputValue) {
        try {
            handleSearch();
            fetchNews(inputValue);
        }
        catch(e){
            console.log("invalid input");
        }
    }
});

//function to handle Search button click
function handleSearch() {
    removeActiveClass();

    //Get input value
    const inputValue = document.querySelector(".input-box").value.toLowerCase();

    //check if any inputValue matching li elements inner text
    const allTopics = document.querySelectorAll(".hover-topics");
    allTopics.forEach(function (element) {
        const elementText = element.innerText.toLowerCase();
        if (elementText === inputValue) {
            element.classList.add('active');
        }
    });
}

//Api key work
const API_KEY = "1d3a0eefa97b499d8fbc4ee93eeb40b7";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("Asia"));

async function fetchNews(query) {
    try {
        const response = await fetch(`${url}${query}&apikey=${API_KEY}`);
        const data = await response.json();
        show(data.articles);
    }
    catch (e) {
        console("Error news: ", e);
    }
}

function limitWords(text, limit) {
    const words = text.split(' ');
    const truncatedWords = words.slice(0, limit);
    return truncatedWords.join(' ');
}

async function show(data) {
    const cardContainer = document.querySelector(".cards-container");
    const size = data.length;
    cardContainer.innerHTML = "";

    for (let i = 0; i < size; i++) {
        const card = document.createElement('div');
        card.className = "card";

        // Check if image URL is provided and handle errors
        if (data[i].urlToImage) {
            const truncatedDescription = limitWords(data[i].description, 30);
            const date = new Date(data[i].publishedAt).toLocaleString("en-US", {
                timeZone: "Asia/Jakarta"
            });

            card.innerHTML = `
            <div class="card-header">
                <img src="${data[i].urlToImage}" alt="new-image" onerror="handleImageError(this)">
            </div>
            <div class="card-content flex">
                <h3 id="news-title">${data[i].title}</h3>
                <h6 class="news-source" id="news-source">${date}</h6>
                <p class="news-desc" id="news-desc">${truncatedDescription}</p>
            </div>`;
            
            card.firstElementChild.addEventListener('click',()=>{
                window.open(data[i].url,"_blank");
            })
            cardContainer.appendChild(card);
        }
    }
}

// Function to handle image loading errors
function handleImageError(imgElement) {
    // Remove the parent card when image fails to load
    const card = imgElement.closest('.card');
    if (card) {
        card.remove();
    }
}

//Topics in navbar
const newsTopic = document.querySelectorAll(".topic-elements li");
newsTopic.forEach(topic => {
    const cardContainer = document.querySelector(".cards-container");
    topic.addEventListener('click', (e) => {
        fetchNews(e.target.innerText);
    })
})



