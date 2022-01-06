module.exports = {
  formatDate: (date) => {
    return `${moment(date).format("MMM Do YYYY")} at ${moment(date()).format(
      "hh a"
    )}`;
  },
};
