var parsedArray = []

function prepend(idea) {
  $('.idea-storage-list').prepend(
    `<article id="${idea.id}" class="idea">
    <h2 class="title">${idea.title}</h2>
    <input class="delete-btn" type="submit" value="" src="icons/delete.svg">
    <p class="idea-description">${idea.body}</p>
    <button class="up-vote-btn rating" type="button" name="button"></button>
    <button class="down-vote-btn rating"type="button" name="button"></button>
    <p class="rating">Quality: ${idea.quality}</p>
    </article>`
  );
}

function clearInputs(){
  $('.title-user-input').val('');
  $('.body-user-input').val('');
}

function Idea(titleInput, bodyInput){
  this.title = titleInput
  this.body = bodyInput
  this.quality = "swill"  || quality //need to research and add switch case
  this.id = Date.now();
}

$(document).ready(function() {
  for(var i =0; i < localStorage.length; i++){
    parsedArray.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
  }
  for(var i=0; i< parsedArray.length; i++){
      prepend(parsedArray[i]);
  }
})

$('.save-btn').on('click', function () {
  var idea = new Idea($('.title-user-input').val(), $('.body-user-input').val());
  localStorage.setItem(idea.id, JSON.stringify(idea));
  prepend(idea);
  clearInputs();
})

$('.idea-storage-list').on('click', '.delete-btn', function(){
  $(this).parent().remove();
  var id = $(this).parent().attr("id")
  localStorage.removeItem(id);
  }
)

$('.search-input').on('keyup', function(){
  var searchVal = $('.search-input').val()
  $.each($('.idea'), function(index, articleElement) {
    if ($(articleElement).children("h2").text().indexOf(searchVal) < 0) {
      $(articleElement).hide()
    } else {
      $(articleElement).show()
    }
  })
})

function deleteIdea(titles) {
  parsedArray[i].title.push
}
