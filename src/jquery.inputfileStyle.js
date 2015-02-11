/**
 * Created by Agustin on 03/02/2015.
 * Plugin de jquery para la adaptacion de un input de tipo File a estidos determinados
 * Acepta formatos de extension de cualquier longitud separados por "|"
 *
 */

jQuery.fn.extend({
    inputFileCss:function(settings){
        /**
         *
         * @type {{self: (*|jQuery|HTMLElement), class: string, selector: string, textTemplate: string, attrData: string, idSelector: string, extension: string, selectorMsg: string, msgCorrect: string, msgIncorrect: string, classCorrect: string, classIncorrect: string}}
         */
        var config = {
            self : $(this),
            class: 'default-class',
            selector: 'defualt-selector',
            textTemplate: 'Adjuntar',
            attrData: 'data-index',
            idSelector: 'file-',
            extension: "gif|jpg|jpeg|tiff|png",
            selectorMsg: '.input-portal-ref',
            msgCorrect: "Formato correcto,muchas gracias",
            msgIncorrect: "Este formato de archivo no puede ser cargado, solo imagenes por favor",
            classCorrect: "succes",
            classIncorrect: "alert"
        };

        if (settings){$.extend(config, settings);}
        var regex = new RegExp("\.("+config.extension+")$","i");

        $(this).each(function(i){
            var self = $(this);
            self.css({display:'none'});
            var template = document.createElement("span");
            template.innerHTML = config.textTemplate;
            template.id = config.idSelector + i;
            template.className = config.class;
            self.parent().append(template);
            $("#"+config.idSelector + i).attr(config.attrData, i);
        });

        $(config.selector).on('click',function(){
            var self = $(this);
            var cual = self.attr(config.attrData);
            config.self.each(function(i){
                if(i == cual){
                    $(this).trigger('click');
                }
            }).on('change',function(){
                var fileName = $(this).val();
                if(regex.test(fileName)){
                    $(config.selectorMsg).removeClass(config.classIncorrect).addClass(config.classCorrect).html(config.msgCorrect);
                    self.html($(this).val());
                }else{
                    self.html(config.textTemplate);
                    self.val('');
                    $(config.selectorMsg).removeClass(config.classCorrect).addClass(config.classIncorrect).html(config.msgIncorrect);
                }
            });
        })
    }
});