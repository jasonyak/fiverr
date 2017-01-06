"use strict";
var UserProfile = (function () {
    function UserProfile(firstname, lastname, timezone, birthDate, country, state, city) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.timezone = timezone;
        this.birthDate = birthDate;
        this.country = country;
        this.state = state;
        this.city = city;
    }
    return UserProfile;
}());
exports.UserProfile = UserProfile;
//# sourceMappingURL=UserProfile.js.map