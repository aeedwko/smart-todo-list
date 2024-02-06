// Client facing scripts here

// display tasks
$(() => {
  $.ajax({
    method: 'GET',
    url: '/api/tasks'
  })
  .done((response) => {
      const $tasksList = $('#tasks');

      for (const task of response.tasks) {
        // the id of each category is coded into index.ejs
        $(`#${task.category_id}`).append(`<li id="task-${ task.id }" class="task">${ task.content }</li>`);
      }
    });
});

$("ul").on("click", ".task", function() {
  showForm($(this).text());
});

$("form").on("submit", function(event) {
  event.preventDefault();
  alert("hello");
});

// prefill and fade in the form
const showForm = function(taskData) {
  console.log(taskData);
  $("#edit-category").closest("ul").attr("id");
  $("#edit-content").val(taskData);
  $("form").fadeIn();
};
