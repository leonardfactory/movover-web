angular.module('templates-main', ['info.tpl.html']);

angular.module("info.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("info.tpl.html",
    "<div class=\"well\" ng-controller=\"InfoController\">\n" +
    "    <form class=\"form-horizontal\">\n" +
    "        <fieldset>\n" +
    "            <legend>Informazioni Generali</legend>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label class=\"col-lg-2 control-label\">Nome</label>\n" +
    "                <div class=\"col-lg-10\">\n" +
    "                    <input type=\"text\" class=\"form-control\" placeholder=\"Shop\" ng-model=\"shop.name\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label class=\"col-lg-2 control-label\">Descrizione</label>\n" +
    "                <div class=\"col-lg-10\">\n" +
    "                    <input type=\"text\" class=\"form-control\" placeholder=\"Scrivi qualcosa sul tuo locale...\" ng-model=\"shop.description\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label class=\"col-lg-2 control-label\">Indirizzo</label>\n" +
    "                <div class=\"col-lg-10\">\n" +
    "                    <input type=\"text\" class=\"form-control\" placeholder=\"Via del Grano, 12\" ng-model=\"shop.address.complete\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <div class=\"col-lg-10 col-lg-offset-2\">\n" +
    "                    <button type=\"submit\" class=\"btn btn-success\">Salva modifiche</button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </fieldset>\n" +
    "    </form>\n" +
    "</div>\n" +
    "");
}]);
