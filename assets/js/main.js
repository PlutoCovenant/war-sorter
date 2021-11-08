/*===== Populate List =====*/
var playerList = [];

//Fetch list of players
$.getJSON("https://plutocovenant.github.io/war-sorter/players.json", function (data) {
  data.players.forEach(function (player) {
    playerList.push(player);
  });

  function compare(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }
  playerList.sort(compare);
});

//Add new group on click
$("#addGroup").click(function () {
  var groups = $(".list").length + 1;
  if (groups < 11) {
    $(".wrapper").append(`<div class="list">
    <div class="header group${groups}">Group ${groups}</div>
    <ul id="group${groups}"></ul>
  </div>`);

    const group = document.getElementById("group1");
    new Sortable(document.getElementById(`group${groups}`), {
      group: "shared", // set both lists to same group
      animation: 150,
    });
  }
});

//Remove last group (If empty) on click
$("#removeGroup").click(function () {
  var groups = $(".list").length;
  if ($(".list").last().text().length > 20) {
    alert("Remove Player from last group.");
  } else if (groups > 0) {
    $(".list").last().remove();
  }
});

//Run on checkbox fill or unfill to add or remove company lists
$('input[type="checkbox"]').click(function () {
  var value = this.value;
  if ($(this).prop("checked") == true) {
    playerList.forEach(function (player) {
      if (player.shotcall == true && player.company == value) {
        $("#groupStart").append(
          `<li class="main ${player.role} sc">${player.name} <span class="comp">(${player.company})</span></li>`
        );
      } else if (player.company == value) {
        $("#groupStart").append(
          `<li class="main ${player.role}">${player.name}  <span class="comp">(${player.company})</span></li>`
        );
      }
    });
  } else if ($(this).prop("checked") == false) {
    $(".main").each(function () {
      if ($(this).text().includes(`(${value})`)) {
        $(this).remove();
      }
    });
  }
});

//Add temporary player on click
$("#addTemp").click(function () {
  var tempName = $("#tempName").val();
  var tempRole = $("#tempRole").val();
  var tempCompany = $("#tempComp").val();

  $("#groupStart").append(
    `<li class="main ${tempRole}">${tempName} <span class="comp">(${tempCompany})</span></li>`
  );
});

//Make initial player list sortable
new Sortable(groupStart, {
  group: "shared", // set both lists to same group
  animation: 150,
});
