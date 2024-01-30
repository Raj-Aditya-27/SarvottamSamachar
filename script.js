function removeActiveClass(){
    const allTopics = document.querySelectorAll(".hover-topics");
    //Remove active class from all li elements
    allTopics.forEach(function(topic){
        topic.classList.remove('active');
    });
}

//function change color of topics on click
function changeColor(element){
    removeActiveClass();
    //Add active class to li element which is clicked
    element.classList.add('active');
    const inputValue = document.querySelector(".input-box");
    inputValue.value=null;
}

const search = document.getElementById('searchButton');
search.addEventListener('click',handleSearch);

//function to handle Search button click
function handleSearch(){
    removeActiveClass();

    //Get input value
    const inputValue = document.querySelector(".input-box").value.toLowerCase();
    
    //check if any inputValue matching li elements inner text
    const allTopics = document.querySelectorAll(".hover-topics");
    allTopics.forEach(function(element){
        const elementText = element.innerText.toLowerCase();
        if(elementText===inputValue){
            element.classList.add('active');
        }
    });
}