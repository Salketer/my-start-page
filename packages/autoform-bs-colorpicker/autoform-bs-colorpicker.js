/* global AutoForm, $ */

AutoForm.addInputType("bootstrap-colorpicker", {
  template: "afBootstrapColorpicker",
  valueOut: function () {
    if (this.val()) {
      
      return this.val();
    }
  },
//  valueConverters: {
//    "string": function (val) {
//      return (val instanceof Date) ? AutoForm.Utility.dateToDateStringUTC(val) : val;
//    },
//    "stringArray": function (val) {
//      if (val instanceof Date) {
//        return [AutoForm.Utility.dateToDateStringUTC(val)];
//      }
//      return val;
//    },
//    "number": function (val) {
//      return (val instanceof Date) ? val.getTime() : val;
//    },
//    "numberArray": function (val) {
//      if (val instanceof Date) {
//        return [val.getTime()];
//      }
//      return val;
//    },
//    "dateArray": function (val) {
//      if (val instanceof Date) {
//        return [val];
//      }
//      return val;
//    }
//  }
});

Template.afBootstrapColorpicker.helpers({
  atts: function addFormControlAtts() {
    var atts = _.clone(this.atts);
    // Add bootstrap class
    atts = AutoForm.Utility.addClass(atts, "form-control");
    delete atts.colorPickerOptions;
    return atts;
  }
});

Template.afBootstrapColorpicker.rendered = function () {
  var $input = this.data.atts.buttonClasses ? this.$('.input-group.color') : this.$('input');
  var data = this.data;

  // instanciate datepicker
  $input.colorpicker(data.atts.colorPickerOptions);

  // set and reactively update values
  this.autorun(function () {
    var data = Template.currentData();

    // set field value
    $input.colorpicker('setValue', data.value);
    
    
  });
};

Template.afBootstrapColorpicker.destroyed = function () {
  var $input = this.data.atts.buttonClasses ? this.$('.input-group.color') : this.$('input');
  $input.colorpicker('destroy');
};
