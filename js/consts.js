"use strict";
(function (Orientation) {
    Orientation[Orientation["V"] = 1] = "V";
    Orientation[Orientation["VERTICAL"] = 1] = "VERTICAL";
    Orientation[Orientation["H"] = 2] = "H";
    Orientation[Orientation["HORIZONTAL"] = 2] = "HORIZONTAL";
})(exports.Orientation || (exports.Orientation = {}));
var Orientation = exports.Orientation;
;
(function (Direction) {
    Direction[Direction["W"] = 1] = "W";
    Direction[Direction["WEST"] = 1] = "WEST";
    Direction[Direction["E"] = 2] = "E";
    Direction[Direction["EAST"] = 2] = "EAST";
    Direction[Direction["N"] = 3] = "N";
    Direction[Direction["NORTH"] = 3] = "NORTH";
    Direction[Direction["S"] = 4] = "S";
    Direction[Direction["SOUTH"] = 4] = "SOUTH";
    Direction[Direction["L"] = 1] = "L";
    Direction[Direction["LEFT"] = 1] = "LEFT";
    Direction[Direction["R"] = 2] = "R";
    Direction[Direction["RIGHT"] = 2] = "RIGHT";
    Direction[Direction["T"] = 3] = "T";
    Direction[Direction["TOP"] = 3] = "TOP";
    Direction[Direction["B"] = 4] = "B";
    Direction[Direction["BOTTOM"] = 4] = "BOTTOM";
})(exports.Direction || (exports.Direction = {}));
var Direction = exports.Direction;
;
(function (AlignH) {
    AlignH[AlignH["L"] = 1] = "L";
    AlignH[AlignH["LEFT"] = 1] = "LEFT";
    AlignH[AlignH["C"] = 2] = "C";
    AlignH[AlignH["CENTER"] = 2] = "CENTER";
    AlignH[AlignH["R"] = 3] = "R";
    AlignH[AlignH["RIGHT"] = 3] = "RIGHT";
})(exports.AlignH || (exports.AlignH = {}));
var AlignH = exports.AlignH;
;
(function (AlignV) {
    AlignV[AlignV["T"] = 1] = "T";
    AlignV[AlignV["TOP"] = 1] = "TOP";
    AlignV[AlignV["M"] = 2] = "M";
    AlignV[AlignV["MIDDLE"] = 2] = "MIDDLE";
    AlignV[AlignV["B"] = 3] = "B";
    AlignV[AlignV["BOTTOM"] = 3] = "BOTTOM";
})(exports.AlignV || (exports.AlignV = {}));
var AlignV = exports.AlignV;
;
(function (Align) {
    Align[Align["L"] = 1] = "L";
    Align[Align["LEFT"] = 1] = "LEFT";
    Align[Align["C"] = 2] = "C";
    Align[Align["CENTER"] = 2] = "CENTER";
    Align[Align["R"] = 3] = "R";
    Align[Align["RIGHT"] = 3] = "RIGHT";
    Align[Align["T"] = 1] = "T";
    Align[Align["TOP"] = 1] = "TOP";
    Align[Align["M"] = 2] = "M";
    Align[Align["MIDDLE"] = 2] = "MIDDLE";
    Align[Align["B"] = 3] = "B";
    Align[Align["BOTTOM"] = 3] = "BOTTOM";
})(exports.Align || (exports.Align = {}));
var Align = exports.Align;
;
var Services = (function () {
    function Services() {
    }
    Services.THEME_MANAGER = "qtk-theme-manager";
    return Services;
}());
exports.Services = Services;
;
