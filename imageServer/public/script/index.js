const getID = (elem) => elem.substring(0, elem.length - 4);

const buildTable = () => {
  // ask for file list
  $.get("/files", (data) => {
    $("#imgDisplay").html(""); // clear image display
    $("#file").val(""); // clear file input
    $("#tableBody").html(
      data
        //add rows to table
        .map((elem) => {
          return `
            <tr>
              <td>${elem}</td>
              <td>
                <button id="show-${getID(elem)}">Show</button>
                <button id="del-${getID(elem)}">delete</button>
              </td>
            </tr>`;
        })
        .join("")
    );

    // add button actions
    data.forEach((elem) => {
      $("#tableBody")
        .off("click", `#show-${getID(elem)}`) // unbind previous function if necessary
        .on("click", `#show-${getID(elem)}`, () => $("#imgDisplay").html(`<img src="images/${elem}" />`)); // bind function
      $("#tableBody")
        .off("click", `#del-${getID(elem)}`)
        .on("click", `#del-${getID(elem)}`, () => $.get(`/delete?del=images/${elem}`, buildTable));
    });
  });
};

// Upload action
const buildForm = () => {
  $("#frmUpload").on("submit", (e) => {
    if ($("#file")[0].files[0]) {
      $.ajax({
        url: "/upload",
        method: "POST",
        data: new FormData($("#frmUpload")[0]),
        processData: false,
        contentType: false,
        enctype: "multipart/form-data",
      });
      e.preventDefault();
      buildTable();
    }
  });
};

// Run when document is fully loaded

$(() => {
  buildForm();
  buildTable();
});
