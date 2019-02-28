import zxcvbn from "zxcvbn";

export const scorePassword = (password) => {
    const mapValueToName = {
        0: "bad",
        1: "weak",
        2: "good",
        3: "strong",
        4: "epic"
    };

    if (password === undefined) {
        return "invisible";
    }

    const result = zxcvbn(password);
    return mapValueToName[result.score];
}