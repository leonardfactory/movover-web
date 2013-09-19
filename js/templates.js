angular.module('templates-main', ['info.tpl.html']);

angular.module("info.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("info.tpl.html",
    "<!-- Something! -->\n" +
    "<h2>Info</h2>\n" +
    "<p>Per la precisione: {{ title }}</p>");
}]);
