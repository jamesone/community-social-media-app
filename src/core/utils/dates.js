export function timeDifference(d, dd) {
    let minute = 60 * 1000,
        hour = minute * 60,
        day = hour * 24,
        month = day * 30,
        ms = Math.abs(d - dd);

    let months = parseInt(ms / month, 10);

        ms -= months * month;

    let days = parseInt(ms / day, 10);

        ms -= days * day;

    let hours = parseInt(ms / hour, 10);

        ms -= hours * hour;
    let minutes = parseInt(ms / minute, 10);

    let toReturn;

    // Determine readable time posted 
    if (days == 0) {
      if (hours == 0 || minutes == 0){
        toReturn = minutes + "m";
      } else {
        toReturn = hours + "h";
      }
    } else {
      toReturn = days + "d";
    }

    if (days < 0) {
        toReturn = "0 s"
    }

    return toReturn;
};
