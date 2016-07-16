/**
 * This script removes the meter activation & read items list.
 * An Edgecast's redirection will switch users to toggle-on if needed.
 */

(function () {
    'use strict';

    if (window.localStorage) {
        localStorage.removeItem('us_meter_activation');
        localStorage.removeItem('us_meter_readed');
    }
}());
