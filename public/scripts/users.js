// Client facing scripts here
$(() => {
  // prefills the user info form with the current user info.
  const preFillForm = () => {
    $.ajax({
      method: 'GET',
      url: `/api/user`
    })
    .then((response) => {
      const user = response.user[0];
      $("#header-firstName").text(user.first_name);
      $("#header-lastName").text(user.last_name);
      $("#edit-firstName").val(user.first_name);
      $("#edit-lastName").val(user.last_name);
      $("#edit-email").val(user.email);
      $("#edit-password").val("");
    })
  }

  $("#editUserForm").on("submit", function(event) {
    event.preventDefault();
    const userFormData = {
      first_name: $("#edit-firstName").val(),
      last_name: $("#edit-lastName").val(),
      email: $("#edit-email").val(),
      password: $("#edit-password").val()
    };
    $.ajax({
      method: 'PUT',
      url: `/api/user/`,
      data: userFormData,
    })
    .then((response) => {
      preFillForm();
    })
  });



preFillForm();

});
