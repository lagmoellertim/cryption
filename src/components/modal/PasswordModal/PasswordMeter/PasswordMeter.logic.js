export function scorePassword(password) {
    var score = 0;
    if (!password) {
        return null;
    }

    // award every unique letter until 5 repetitions
    var letters = {};
    for (var i = 0; i < password.length; i++) {
        letters[password[i]] = (letters[password[i]] || 0) + 1;
        score += 5.0 / letters[password[i]];
    }

    // bonus points for mixing it up
    var variations = {
        digits: /\d/.test(password),
        lower: /[a-z]/.test(password),
        upper: /[A-Z]/.test(password),
        nonWords: /\W/.test(password),
    };

    let variationCount = 0;

    for (var check in variations) {
        variationCount += (variations[check] === true) ? 1 : 0;
    };

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