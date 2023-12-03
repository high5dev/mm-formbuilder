const moment = require("moment");
exports.postMoment =(dt) => {
    if (dt) {
      const a = moment(new Date()); //now
      const b = moment(dt);
      let seconds = a.diff(b, 'seconds');
      let minutes = a.diff(b, 'minutes'); // 44700
      let hours = a.diff(b, 'hours'); // 745
      let days = a.diff(b, 'days'); // 31
      let weeks = a.diff(b, 'weeks');
      if (weeks > 0) {
        const result = weeks.toString() + ' ' + 'weeks';
        return result;
      } else {
        if (days > 0) {
          const result = days.toString() + ' ' + 'days';
          return result;
        } else {
          if (hours > 0) {
            const result = hours.toString() + ' ' + 'hours';
            return result;
          } else {
            if (minutes > 0) {
              const result = minutes.toString() + ' ' + 'minutes';
              return result;
            } else {
              if (seconds > 10) {
                const result = seconds.toString() + ' ' + 'seconds';
                return result;
              } else {
                const result = 'a few seconds ago';
                return result;
              }
            }
          }
        }
      }
    } else {
      return;
    }
  };