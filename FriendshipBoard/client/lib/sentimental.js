// Calculates the negative sentiment of a sentence
// -------------------------------------------------- //

negativity = function (phrase) {
  var addPush = function(t, score){
    hits += score;
    words.push(t);
  };
    
  var noPunctuation = phrase.replace(/[^a-zA-Z ]+/g, ' ').replace('/ {2,}/',' '),
      tokens = noPunctuation.toLowerCase().split(" "),
      hits   = 0,
      words  = [];

  tokens.forEach(function(t) {
    if (neg5.indexOf(t) > -1) {
      addPush(t,5);
    } else if (neg4.indexOf(t) > -1) {
      addPush(t,4);
    } else if (neg3.indexOf(t) > -1) {
      addPush(t,3);
    } else if (neg2.indexOf(t) > -1) {
      addPush(t,2);
    } else if (neg1.indexOf(t) > -1) {
      addPush(t,1);
    }
  });

  return {
    score       : hits,
    comparative : hits / tokens.length,
    words       : words
  };
}


// Calculates the positive sentiment  of a sentence
// -------------------------------------------------- //

positivity = function (phrase) {
  var addPush = function(t, score){
    hits += score;
    words.push(t);
  };

  var noPunctuation = phrase.replace(/[^a-zA-Z ]+/g, ' ').replace('/ {2,}/',' '),
      tokens = noPunctuation.toLowerCase().split(" "),
      hits   = 0,
      words  = [];

  tokens.forEach(function(t) {
    if (pos5.indexOf(t) > -1) {
      addPush(t,5);
    } else if (pos4.indexOf(t) > -1) {
      addPush(t,4);
    } else if (pos3.indexOf(t) > -1) {
      addPush(t,3);
    } else if (pos2.indexOf(t) > -1) {
      addPush(t,2);
    } else if (pos1.indexOf(t) > -1) {
      addPush(t,1);
    }
  });

  return {
    score : hits,
    comparative : hits / tokens.length,
    words : words
  };
}


// Calculates overall sentiment
// -------------------------------------------------- //

analyze = function(phrase) {

  var pos = positivity(phrase),
      neg = negativity(phrase);

  return {
    score       : pos.score - neg.score,
    comparative : pos.comparative - neg.comparative,
    positive    : pos,
    negative    : neg
  };
}
