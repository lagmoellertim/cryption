export function scorePassword(value) {
    var score = 0;
    if (!value) {
        return null;
    }

    // award every unique letter until 5 repetitions
    var letters = {};
    for (var i = 0; i < value.length; i++) {
        letters[value[i]] = (letters[value[i]] || 0) + 1;
        score += 5.0 / letters[value[i]];
    }

    // bonus points for mixing it up
    var variations = {
        digits: /\d/.test(value),
        lower: /[a-z]/.test(value),
        upper: /[A-Z]/.test(value),
        nonWords: /\W/.test(value),
    };

    let variationCount = 0;

    for (var check in variations) {
        variationCount += (variations[check] === true) ? 1 : 0;
    }

    score += (variationCount - 1) * 10;

    if (score > 80) {
        return 2;
    }
    if (score > 60) {
        return 1;
    }
    if (score >= 0) {
        return 0;
    }
    return null;
}