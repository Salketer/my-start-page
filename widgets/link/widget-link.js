Widgets.register('link', {
    info: {
        name: 'Link to a website',
        description: 'This widget allows you to create a simple button to reach your favorite website.'
    },
    settings: {
        href: {
            type: String,
            label: 'Website URL',
            max: 400
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
        icon: {
            type: String,
            label: 'Icon',
            autoform: {
                type: 'bootstrap-iconpicker',
                iconPickerOptions: {}
            }
        },
        iconColor: {
            type: String,
            label: 'Icon Color',
            optional: true,
            autoform: {
                type: 'bootstrap-colorpicker',
                colorPickerOptions: {
                    format: 'rgb'
                }
            }
        },
        background: {
            type: String,
            label: 'Background Image',
            optional: true,
            autoform: {
                afFieldInput: {
                    type: 'fileUpload',
                    collection: 'Images',
                    accept: 'image/*'
                }
            }
        }
    },
    data: {
        href: 'http://',
        bgColor: 'rgba(255,255,255,0.9)',
        icon: 'fa-bookmark',
        iconColor:'rgb(51, 122, 183)',
        background: ''
    },
    widgetTemplate: 'widgetLink'
});
if(Meteor.isClient){
    Template.widgetLink.helpers({
        'attributes': function () {
            var attributes = {};
            attributes.style = '';
            if (this.data.bgColor !== '') {
                attributes.style += 'background-color:' + this.data.bgColor + ';';
            }
            if (this.data.background !== '' && Images.findOne(this.data.background)) {
                attributes.style += 'background-image:url("' + Images.findOne(this.data.background).url() + '");';
            }
            if (this.data.iconColor !== '') {
                attributes.style += 'color:' + this.data.iconColor + ';';
            }
            return attributes;
        }
    });
}