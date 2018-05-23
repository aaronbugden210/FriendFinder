var friends = require("../data/friends");

module.exports = function(app)
{
    app.get("/api/friends", function(req, res)
    {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res)
    {
        var friendMatch =
        {
            name: "",
            pic: "",
            scoreDifference: 0
        };

        var surveyData = req.body;
        var surveyScores = surveyData.scores;

        var scoresDiff = 0;

        for(var i = 0; i < friends.length; i++)
        {
            var newFriend = friends[i];

            console.log(newFriend.name);

            for(var j = 0; j < newFriend.scores.length; j++)
            {
                var friendScore = newFriend.scores[j];
                var surveyScore = surveyScores[j];

                scoresDiff += Math.abs(parseInt(surveyScore) - parseInt(friendScore));
            }

            if(scoresDiff <= friendMatch.scoreDifference)
            {
                friendMatch.name = newFriend.name;
                friendMatch.pic = newFriend.pic;
                friendMatch.scoreDifference = scoresDiff;
            }
        }

        friends.push(surveyData);

        res.json(friendMatch);
    });
};