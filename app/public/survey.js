var config =
{
    ".chosen-select": {},
    ".chosen-select-deselect":
    {
        allow_single_deselect: true
    },
    ".chosen-select-no-single":
    {
        disable_search_threshold: 10
    },
    ".chosen-select-no-results":
    {
        no_results_text: "You have no friends..."
    },
    ".chosen-select-width":
    {
        width: "95%"
    }
};

for(var selector in config)
{
    $(selector).chosen(config[selector]);
}

$("#submitBtn").on("click", function(event)
{
    event.preventDefault();

    console.log("submit button clicked!");

    function validateForm()
    {
        var isValid = true;
        $(".form-control").each(function()
        {
            if($(this).val() === "")
            {
                isValid = false;
            }
        });

        $(".chosen-select").each(function()
        {
            if($(this).val() === "")
            {
                isValid = false;
            }
        });

        return isValid;
    }

    if(validateForm())
    {
        var info =
        {
            name: $("#nameInput").val().trim(),
            pic: $("#avatarInput").val().trim(),
            scores:
            [
                $("#ques1").val(),
                $("#ques2").val(),
                $("#ques3").val(),
                $("#ques4").val(),
                $("#ques5").val(),
                $("#ques6").val(),
                $("#ques7").val(),
                $("#ques8").val(),
                $("#ques9").val(),
                $("#ques10").val()
            ]
        };

        $.post("/api/friends", info, function(data)
        {
            $("#match-name").text(data.name);
            $("#match-img").attr("src", data.pic);

            $("#results-modal").modal("toggle");
        });
    }

    else
    {
        alert("You missed some questions. Please fill them out");
    }
});