Meteor.startup(() => {

  Tools = {};

  getUnixTimestamp = () => {
    let date = new Date().getTime();
    return Math.floor(date / 1000);
  }

  Tools.getUnixTimestamp = getUnixTimestamp;

});
