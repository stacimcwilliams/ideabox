function Idea(titleInput, bodyInput){
  this.title = titleInput
  this.body = bodyInput
  this.quality = "swill"
  this.id = Date.now();
  this.count = 0;
}

function prepend(idea) {
  $('.idea-storage-list').prepend(
    `<article id="${idea.id}" class="idea-article">
      <input class="title" type="input" value="${idea.title}">
      <button class="delete-btn idea-article-btns" type="button"></button>
      <textarea class="body" type="input">${idea.body}</textarea>
      <button class="up-vote-btn idea-article-btns rating-section " type="button"></button>
      <button class="down-vote-btn idea-article-btns rating-section" type="button"></button>
      <p class="quality rating-section">quality: ${idea.quality}</p>
    </article>`
  );
}

function clearInputs(){
  $('.title-user-input').val('');
  $('.body-user-input').val('');
}

function stringifyIdea(idea) {
  localStorage.setItem(idea.id, JSON.stringify(idea));
}

function getParentId() {
  return JSON.parse(localStorage.getItem($(this).parent().attr("id")))
}

function changeRating () {
  var idea = getParentId.call(this)
  var thisIdea = $(this).siblings('.quality')
  if ($(this).hasClass('up-vote-btn')) {
    idea.count += 1;
  } else {
    idea.count -= 1;
  }
  if (idea.count <= 0) {
    idea.quality = "swill"
    thisIdea.text('quality: swill')
    idea.count = 0;
  } else if (idea.count === 1) {
    idea.quality = "plausible"
    thisIdea.text('quality: plausible')
  } else if (idea.count >= 2) {
    idea.quality = "genius"
    thisIdea.text("quality: genius")
    idea.count = 2;
  }
  stringifyIdea(idea);
}

$(document).ready(function() {
  for(var i =0; i < localStorage.length; i++){
    prepend(JSON.parse(localStorage.getItem(localStorage.key(i))));
  }
})

$('.save-btn').on('click', function () {
  var idea = new Idea($('.title-user-input').val(), $('.body-user-input').val());
  stringifyIdea(idea);
  prepend(idea);
  clearInputs();
})

$('.idea-storage-list').on('click', '.delete-btn', function(){
  $(this).parent().remove();
  var id = $(this).parent().attr("id");
  localStorage.removeItem(id);
})

$('.search-input').on('keyup', function(){
  var searchVal = $('.search-input').val()
  $.each($('.idea-article'), function(index, articleElement) {
    if ($(articleElement).children('.title').val().indexOf(searchVal) < 0) {
      $(articleElement).hide()
    } else {
      $(articleElement).show()
    }
  })
})

$('.idea-storage-list').on('click', '.up-vote-btn', function(){
  changeRating.call(this)
})

$('.idea-storage-list').on('click', '.down-vote-btn', function(){
  changeRating.call(this)
})

$('.idea-storage-list').on('blur', '.title', function() {
  var idea = getParentId.call(this)
  idea.title = $(this).val()
  stringifyIdea(idea);
})

$('.idea-storage-list').on('blur', '.body', function() {
  var idea = getParentId.call(this)
  getParentId.call(this).body = $(this).val()
  stringifyIdea(idea);
})
