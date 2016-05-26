/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
 
$(function() {
  
  var model = {
    _total: 12,
    _metadata: {"name-col":"Student Name", "missed-col":"Days Missed-col"},
    
    init: function() {
      if (!localStorage.attendance) {
    
        var attendance = {"Slappy the Frog":[], "Lilly the Lizard":[], 
          "Paulrus the Walrus":[], "Gregory the Goat":[], "Adam the Anaconda":[]};

        for (name in attendance) {
          for (var i = 0; i < this.total(); i++) {
            attendance[name].push(Math.random() >= 0.5);
          }
        }
    
        this.setAttendance(attendance);
      }
    },
    
    metadata: function() {
      return this._metadata;
    },
    
    total: function() {
      return this._total;
    },
    
    getAttendance: function() {
      return JSON.parse(localStorage.attendance);
    },
    
    setAttendance: function(attendance) {
      localStorage.attendance = JSON.stringify(attendance);
    },
    
    updateAttendance: function(position, name, st) {
      var attendance = this.getAttendance();
      
      attendance[name][position] = st;
      
      this.setAttendance(attendance);
    },
    
    countMissed: function(name) {
      var attendance = this.getAttendance();
      var total = 0;
      
      for (var i = 0; i < attendance[name].length; i++) {
        if (attendance[name][i]) {
          total ++;
        }
      }
      
      return total;
    }
    
  };
  
  var octopus = {
    init: function() {
      model.init();
      view.init();
    },
    
    maxRecords: function() {
      return model.total();
    },
    
    metadata: function() {
      return model.metadata();
    },
    
    getAttendance: function() {
      return model.getAttendance();
    },
    
    countMissed: function(name) {
      return model.countMissed(name);
    },
    
    updateAttendance: function(idx, name, checked) {
      model.updateAttendance(idx,name, checked);
      view.render();
    }
  };
  
  var view = {
    
    init: function() {
      this.tHeader = $("#header")
      this.tBody = $("#body")
      
      this.render();
    },
    
    render: function() {
      this.tHeader.empty();
      this.tBody.empty();
      
      this.renderHeader();
      this.renderBody();
    },
    
    renderHeader: function() {
      var total = octopus.maxRecords();
      var meta = octopus.metadata();
      
      var tr = $('<tr>');
      
      var th = $('<th class="name-col">');
      th.text(meta["name-col"]);
      
      tr.append(th);
      
      for (var i = 0; i < total; i++) {
        th = $('<th>');
        th.text(i+1);
        tr.append(th);
      }
  
      var th = $('<th class="missed-col">');
      th.text(meta["missed-col"]);
      tr.append(th);
      
      this.tHeader.append(tr);
      
    },
    
    renderBody: function() {
      var attendance = octopus.getAttendance();

      for (student in attendance) {
        
        var tr = $('<tr class="student">');
        tr.append($('<td class="name-col">' + student + '</td>')) 
        
        for (var i = 0; i < attendance[student].length; i++) {
          var td = $('<td class="attend-col">');
          
          var input = $('<input type="checkbox">')
          input.attr('checked',attendance[student][i]);
          td.append(input);
          tr.append(td);
          
          input.change((function(idx, name) {
            return function() {
              octopus.updateAttendance(idx, name, this.checked);
            };
          })(i, student));
        }
        
        tr.append($('<td class="missed-col">' + octopus.countMissed(student) + '</td>')) 
        
        this.tBody.append(tr);
        
      }
    }
  
  }
  
  octopus.init();
});