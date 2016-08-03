module.exports = {
  getLocationByZip (zipCode, successCallback) {
    $.ajax({
      method: "GET",
      url: `http://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&sensor=true`,
      success(resp) {
        successCallback(resp);
      }
    });
  }
};
