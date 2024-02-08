// Client facing scripts here

$(() => {
  displayTasks();

  $("ul").on("click", ".task", function() {
    showForm($(this));
  });
});

// add task form
$("#addTaskForm").on("submit", function(event) {
  event.preventDefault();

  const taskFormData = {
    content: $("#add-content").val(),
    category_id: 1, // TODO: api will return the appropriate category
    user_id: 1, // $("#add-user_id").val() // TODO: refactor user_id to user_email
    completed: false
  };

  $.ajax({
    method: 'POST',
    url: '/api/tasks/add',
    data: taskFormData
  })
  .done((response) => {
    displayTasks();
  });
});

// edit task form
$("#editTaskForm").on("submit", function(event) {
  event.preventDefault();

  const taskFormData = {
    id: $("#edit-id").val(),
    category_id: $("#edit-category").val(),
    content: $("#edit-content").val(),
    completed: $("#edit-completed").val()
  }

  $.ajax({
    method: 'PUT',
    url: `/api/tasks/${ taskFormData.id }/modify`,
    data: taskFormData,
  })
  .done((response) => {
    displayTasks();
    $("#editTaskForm").fadeOut();
  })
});

// display all tasks
const displayTasks = function() {

  // reset the table
  $(".category").empty();

  $.ajax({
    method: 'GET',
    url: '/api/tasks'
  })
  .done((response) => {
      const $tasksList = $('#tasks');

      for (const task of response.tasks) {
        // the id of each category is coded into index.ejs
        console.log(task);
        if (task.completed === false) { // only display tasks that are not marked complete
          $(`#category-${task.category_id}`).append(`<li id="task-${ task.id }" class="task">${ task.content }</li>`);
        }
      }
    });
};

// prefill and show the form
const showForm = function(taskData) {

  // remove the prefix
  const taskId = getId(taskData.attr("id"), "task-");
  const categoryId = getId(taskData.closest("ul").attr("id"), "category-");

  $("#edit-id").val(taskId);
  $("#edit-category").val(categoryId);
  $("#edit-content").val(taskData.text());
  $("#edit-completed").prop('checked', false);
  $("#editTaskForm").fadeIn();
};

// helper function to remove prefix of the HTML element id
const getId = function(htmlId, prefix) {
  return htmlId.replace(prefix, "");
}
