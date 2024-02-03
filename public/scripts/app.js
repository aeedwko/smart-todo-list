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
        $(`#${task.category_id}`).append(`<li>${ task.content }</li>`);
      }
    });
});
