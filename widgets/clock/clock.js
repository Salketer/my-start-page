var AddressSchema = new SimpleSchema({
    fullAddress: {
        type: String
    },
    lat: {
        type: Number,
        decimal: true
    },
    lng: {
        type: Number,
        decimal: true
    },
    street: {
        type: String,
        max: 100
    },
    city: {
        type: String,
        max: 50
    },
    state: {
        type: String,
        regEx: /^A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]$/
    },
    zip: {
        type: String,
        regEx: /^[0-9]{5}$/
    },
    country: {
        type: String
    }
});

Widgets.register('clock', {
    info: {
        name: 'Simple clock',
        description: 'This widget displays a clock showing the current time.'
    },
    settings: {
        titre: {
            type: String,
            label: 'Title',
            max: 400
        },
        clock_type: {
            type: String,
            allowedValues: ['digital', 'analog'],
            autoform: {
                options: [
                    {label: "Digital", value: "digital"},
                    {label: "Analog", value: "analog"},
                ]
            }
        },
        bgColor: {
            type: String,
            label: 'Background Color',
            optional: true,
            autoform: {
                type: 'bootstrap-colorpicker',
                colorPickerOptions: {
                    format: 'rgba'
                }
            }
        },
        clockColor: {
            type: String,
            label: 'Background Color',
            optional: true,
            autoform: {
                type: 'bootstrap-colorpicker',
                colorPickerOptions: {
                    format: 'rgba'
                }
            }
        },
        target_place: {
            type: Object,
            label: 'Show time from',
            optional: true,
            autoform: {
                type: 'googleplace'
            },
            blackbox: true
        }

    },
    data: {
        titre: '',
        bgColor: 'rgba(255,255,255,0.9)',
        clockColor: 'rgba(0,0,0,1)',
        clock_type: 'analog'
    },
    time_offset: 0,
    widgetTemplate: 'widgetClock',
    beforeModify: function (change) {
        if (change.data && change.data.target_place) {
            var widget_id = this._id;
            Meteor.http.get('https://maps.googleapis.com/maps/api/timezone/json?location=' + change.data.target_place.lat + ',' + change.data.target_place.lng + '&timestamp=' + (Math.round((new Date().getTime()) / 1000)).toString(),
                function (error, response) {
                    if (response.data.timeZoneId != null) {
                        Widgets_Collection.update(widget_id,{$set:{time_offset:response.data.dstOffset+response.data.rawOffset}});
                    }
                });
        }
        return change;
    }
});

gmapinitialize = function () {
};
if (Meteor.isClient) {
    Template.widgetClock.rendered = function () {
        if (typeof google == 'undefined' || typeof google.maps == 'undefined') {
            Gridfully.getGoogleAPI("maps", "3", {
                callback: function () {
                }, other_params: 'libraries=places'
            });
        }
        //if(this.data.data.target_place) {
        //    Meteor.http.get('https://maps.googleapis.com/maps/api/timezone/json?location='+this.data.data.target_place.lat+','+this.data.data.target_place.lng+'&timestamp='+(Math.round((new Date().getTime())/1000)).toString(),
        //        function(error,response){
        //            if(response.data.timeZoneId != null){
        //                Widgets_Collection.findOne(self.data._id).modify({time_offset:response.data.dstOffset+response.data.rawOffset});
        //        }
        //    });
        //}
        var self = this;
        var r = function (el, deg) {
            el.setAttribute('transform', 'rotate(' + deg + ' 50 50)')
        };
        var clock = function () {
            var widget = Widgets_Collection.findOne(self.data._id);
            var d = new Date();
            var offset = widget.time_offset + d.getTimezoneOffset()*60;
            d.setTime(d.getTime() + offset*1000);
            if (widget.data.clock_type == 'digital') {
                var text = self.$('.time_text');
                var m = d.getMinutes(widget);
                if (m < 10) {
                    m = "0" + m;
                }
                text.text(d.getHours() + ':' + m);
            } else {
                var sec = self.find('.sec');
                var min = self.find('.min');
                var hour = self.find('.hour');

                r(sec, 6 * d.getSeconds());
                r(min, 6 * d.getMinutes());
                r(hour, 30 * (d.getHours() % 12) + d.getMinutes() / 2);
            }
        };
        clock();
        this.clock_interval = Meteor.setInterval(clock, 1000);
    };
    Template.widgetClock.onDestroyed(function () {
        Meteor.clearInterval(this.clock_interval);
    });
    Template.widgetClock.helpers({
        'style': function () {
            return {style: 'fill:' + this.data.clockColor};
        },
        bgColor: function () {
            return this.data.bgColor;
        },
        isDigital: function () {
            return this.data.clock_type == 'digital';
        }
    });
}