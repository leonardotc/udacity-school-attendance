/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
var model = {
  init: function() {
    if (!localStorage.attendance) {
      console.log('Creating attendance records...');
  
      var attendance = {"Slappy the Frog":[], 
        "Lilly the Lizard":[], 
        "Paulrus the Walrus":[], 
        "Gregory the Goat":[], 
        "Adam the Anaconda":[]};
      var attendance = {};
  
      for (name in attendance) {
        var total = 0;
        
        for (var i = 0; i <= 11; i++) {
          var checked = Math.random() >= 0.5;
          attendance[name].push(checked);
          
          if (checked) {
            total++;
          }
          
        }

        attendance[name].push(total);
        
      }
  
      this.setAttendance(attendance);
    }
  },
  
  getAttendance: function() {
    return JSON.parse(localStorage.attendance);
  },
  
  setAttendance: function(attendance) {
    return JSON.parse(attendance);
  },
  
  updateAttendance: function(name, position, st) {
    var attendace = this.getAttendance();
    
    if (attendance[name] && attendance[name][position]) {
      attendance[name][position] = st;
    }
    
    this.setAttendance(attendace);
  }
};

var octopus = {
  init: function() {
    model.init();
    view.init();
  }
};

var view = {
  
  init: function() {
    
  },
  
  
};


/* STUDENT APPLICATION */
$(function() {
  
  init: function() {
    this.allMissed = $('tbody .missed-col'),
    this.allCheckboxes = $('tbody input');
  },
  
  render: function() {
    var attendance = octopus.getAttendance();
 
    this.allMissed.each(function() {
        var studentRow = $(this).parent('tr'),
            dayChecks = $(studentRow).children('td').children('input'),
            numMissed = 0;

        dayChecks.each(function() {
            if (!$(this).prop('checked')) {
                numMissed++;
            }
        });

        $(this).text(numMissed);
    });
  }

    // Check boxes, based on attendace records
    $.each(attendance, function(name, days) {
        var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
            dayChecks = $(studentRow).children('.attend-col').children('input');

        dayChecks.each(function(i) {
            $(this).prop('checked', days[i]);
        });
    });

    // When a checkbox is clicked, update localStorage
    $allCheckboxes.on('click', function() {
        var studentRows = $('tbody .student'),
            newAttendance = {};

        studentRows.each(function() {
            var name = $(this).children('.name-col').text(),
                $allCheckboxes = $(this).children('td').children('input');

            newAttendance[name] = [];

            $allCheckboxes.each(function() {
                newAttendance[name].push($(this).prop('checked'));
            });
        });

        countMissing();
        localStorage.attendance = JSON.stringify(newAttendance);
    });

    countMissing();
}());
