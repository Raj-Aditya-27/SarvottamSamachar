function removeActiveClass() {
    const allTopics = document.querySelectorAll(".hover-topics");
    // Remove active class from all li elements
    allTopics.forEach(function (topic) {
      topic.classList.remove("active");
    });
  }
  
  // Function to change color of topics on click
  function changeColor(element) {
    removeActiveClass();
    // Add active class to li element which is clicked
    element.classList.add("active");
    const inputValue = document.querySelector(".input-box");
    inputValue.value = null;
  }
  
  // Function for search button click
  function search() {
    const inputValue = document
      .querySelector(".input-box")
      .value.toLowerCase()
      .trim();
      handleSearch();
    fetchNews(inputValue);
    console.log(inputValue);
  }
  
  // Function to handle Search button click
  function handleSearch() {
    removeActiveClass();
    // Get input value
    const inputValue = document
      .querySelector(".input-box")
      .value.toLowerCase()
      .trim();
    // Check if any inputValue matching li elements inner text
    const allTopics = document.querySelectorAll(".hover-topics");
    allTopics.forEach(function (element) {
      const elementText = element.innerText.toLowerCase();
      if (elementText === inputValue) {
        element.classList.add("active");
      }
    });
  }
  
  let query = "general"; // Default query
  const url = `https://saurav.tech/NewsAPI/top-headlines/category/${query}/in.json`;
  
  window.addEventListener("load", () => fetchNews(query));
  
  async function fetchNews(query) {
    const apiUrl = `https://saurav.tech/NewsAPI/top-headlines/category/${query}/in.json`;
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      show(data.articles);
    } catch (e) {
      console.log("Error news: ", e);
    }
  }
  
  // Function to display news data
  function show(data) {
    const cardContainer = document.querySelector(".cards-container");
    const size = data.length;
    cardContainer.innerHTML = "";
  
    for (let i = 0; i < size; i++) {
      const card = document.createElement("div");
      card.className = "card";
  
      // Check if image URL is provided and handle errors
      if (data[i].urlToImage) {
        const truncatedDescription = limitWords(data[i].description, 30);
        const date = new Date(data[i].publishedAt).toLocaleString("en-US", {
          timeZone: "Asia/Jakarta",
        });
  
        card.innerHTML = `
              <div class="card-header">
                  <img src="${data[i].urlToImage}" alt="new-image" onerror="handleImageError(this)">
              </div>
              <div class="card-content flex">
                  <h3 id="news-title">${data[i].title}</h3>
                  <h6 class="news-source" id="news-source">${data[i].source.name} - ${date}</h6>
                  <p class="news-desc" id="news-desc">${truncatedDescription}</p>
              </div>`;
  
        card.addEventListener("click", () => {
          window.open(data[i].url, "_blank");
        });
        cardContainer.appendChild(card);
      }
    }
  }
  
  // Function to limit number of words
  function limitWords(text, limit) {
    const words = text.split(" ");
    const truncatedWords = words.slice(0, limit);
    return truncatedWords.join(" ");
  }
  
  // Function to handle image loading errors
  function handleImageError(imgElement) {
    // Remove the parent card when image fails to load
    const card = imgElement.closest(".card");
    if (card) {
      card.remove();
    }
  }
  
  // Topics in navbar handling click
  const newsTopic = document.querySelectorAll(".topic-elements li");
  newsTopic.forEach((topic) => {
    const cardContainer = document.querySelector(".cards-container");
    topic.addEventListener("click", (e) => {
      console.log("clicked");
      console.log(e.target.innerText);
      const selectedtopic = e.target.innerText;
      if (selectedtopic === "Entertainment") fetchNews("entertainment");
      else if (selectedtopic === "Business") fetchNews("business");
      else if (selectedtopic === "Sports") fetchNews("sports");
      else fetchNews("technology");
    });
  });
  
  // Set up scroll event listener to show scroll-to-top button
  window.onscroll = function () {
    showScrollToTopButton();
  };
  
  // Function to show or hide the scroll-to-top button
  function showScrollToTopButton() {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  }
  
  // Function to scroll to the top of the page smoothly
  function scrollToTop() {
    // Current scroll position
    const scrollStep = -window.scrollY / (500 / 15); // 500ms duration, adjust speed by changing the number 15
  
    // Request animation frame
    const scrollInterval = setInterval(function () {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15); // Adjust scrolling speed here
  }
  
  // Menu button
  function showSidebar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "flex";
  }
  
  function hideSidebar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "none";
  }
  
  // Enter key
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("keydown", function (event) {
    // Check if the pressed key is Enter
    if (event.key === "Enter") {
      // Trigger the search function
      search();
    }
  });