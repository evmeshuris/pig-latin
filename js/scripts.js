/*global $*/
const startOverText = "Start Over";
$(document).ready(function () {
  $("#suggesterForm").submit(function (event) {
    event.preventDefault();

    if ($("#btnSubmit").html() == startOverText) {
      resetForm();
      return;
    }

    const name = $("#name").val();
    const age = parseInt($("#age").val());
    const occupation = parseInt($("#occupation").val());
    const experience = parseInt($("#experience").val());
    let answer = $("input:radio[name=answer]:checked").val();
    let kids_ans = age >= 5 && age < 13;

    if (answer === "no") {
      showResult(name, "Biology");
    }

    if (answer === "yes" && kids_ans) {
      showResult(name, "Codding for Kids");
    } else if (age >= 13 && age < 21) {
      showResult(name, "Python");
    } else if (experience > 10 && occupation === 4) {
      showResult(name, "Brainfuck");
    } else if (occupation >= 1 && age >= 18) {
      showResult(name, "C#");
    } else if (age >= 18 && occupation === 0) {
      showResult(name, "HTML and CSS");
    } else {
      showResult(name, "Biology");
    }
  });
});

function showResult(name, language) {
  if ($("#btnSubmit").html() == startOverText) {
    return;
  }

  $("#spanResName").text(name);
  $("#spanResLang").text(language);
  $("#divResult").show();
  $("#btnSubmit").html(startOverText);
}

function resetForm() {
  $("#name").val("");
  $("#age").val("");
  $("#occupation").val("");
  $("#experience").val("");
  $("input:radio[name=answer]:checked").val("");
  $("#divResult").hide();
  $("#btnSubmit").html("Submit");
}
