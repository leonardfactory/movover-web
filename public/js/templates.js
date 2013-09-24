angular.module('templates-main', ['feed.tpl.html', 'info.tpl.html', 'login.tpl.html', 'shop.tpl.html']);

angular.module("feed.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("feed.tpl.html",
    "<section ng-controller=\"FeedController\">\n" +
    "	<!-- Post something -->\n" +
    "	<div class=\"col-sm-6 col-sm-offset-3\">\n" +
    "		<div class=\"well\">\n" +
    "			<form class=\"form-horizontal\" role=\"form\">\n" +
    "				<div class=\"form-group\">\n" +
    "					<div class=\"col-xs-12\">\n" +
    "						<label class=\"sr-only\" for=\"actionText\">Testo</label>\n" +
    "						<input type=\"text\" class=\"form-control\" id=\"actionText\" placeholder=\"Scrivi qualcosa...\">\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				<div class=\"form-group latest\">\n" +
    "					<div class=\"col-xs-12\">\n" +
    "						<div class=\"area-info\">\n" +
    "							<span class=\"glyphicon glyphicon-map-marker\"></span> Bar Mario\n" +
    "						</div><!--\n" +
    "						--><div class=\"area-publish\">\n" +
    "							<button type=\"submit\" class=\"btn btn-success pull-right\">Pubblica</button>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</form>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	\n" +
    "	<!-- Feed -->\n" +
    "	<div class=\"col-sm-6 col-sm-offset-3\" ng-repeat=\"action in feed\" ng-switch on=\"action.imagePosted\">\n" +
    "		<div ng-switch on=\"action.imagePosted\">\n" +
    "			<div ng-switch-when=\"true\">\n" +
    "				<div class=\"feed-image img-action\" style=\"background-image: url({{ action._id | imageUrl }});\"></div>\n" +
    "				<div class=\"feed-item half\">\n" +
    "					<div class=\"row\">\n" +
    "						<div class=\"col-xs-2\">\n" +
    "							<div class=\"avatar\" style=\"background-image: url({{ action.avatar }});\"></div>\n" +
    "						</div>\n" +
    "						<div class=\"col-xs-10\">\n" +
    "							<h4 class=\"username\"><strong>@{{action.user}}</strong></h4>\n" +
    "							<p>\n" +
    "								{{ action.text }}\n" +
    "							</p>\n" +
    "							<div class=\"description\">\n" +
    "								<span class=\"glyphicon glyphicon-time\"></span> {{ action.createdOn | human }}\n" +
    "							</div>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		\n" +
    "			<div ng-switch-when=\"false\">\n" +
    "				<div class=\"feed-item complete\">\n" +
    "					<div class=\"row\">\n" +
    "						<div class=\"col-xs-2\">\n" +
    "							<div class=\"avatar\" style=\"background-image: url({{ action.avatar }});\"></div>\n" +
    "						</div>\n" +
    "						<div class=\"col-xs-10\">\n" +
    "							<h4 class=\"username\"><strong>@{{action.user}}</strong></h4>\n" +
    "							<p>\n" +
    "								{{ action.text }}\n" +
    "							</p>\n" +
    "							<div class=\"description\">\n" +
    "								<span class=\"glyphicon glyphicon-time\"></span> {{ action.createdOn | human }}\n" +
    "							</div>\n" +
    "						</div>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</section>");
}]);

angular.module("info.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("info.tpl.html",
    "<section ng-controller=\"InfoController\">\n" +
    "	<!-- Alert -->\n" +
    "	<div class=\"alert alert-dismissable alert-success\" ng-show=\"status == 'success'\">\n" +
    "		<button type=\"button\" class=\"close\" data-dismiss=\"alert\">×</button>\n" +
    "		<strong>Salvato!</strong> Hai aggiornato con successo le tue informazioni generali.\n" +
    "	</div>\n" +
    "	<div class=\"alert alert-dismissable alert-danger\" ng-show=\"status == 'error'\">\n" +
    "		<button type=\"button\" class=\"close\" data-dismiss=\"alert\">×</button>\n" +
    "		<strong>Oops!</strong> Alcuni campi non sono stati compilati correttamente, modificali e riprova.\n" +
    "	</div>\n" +
    "	\n" +
    "	<div class=\"well\">\n" +
    "	    <form class=\"form-horizontal\">\n" +
    "	        <fieldset>\n" +
    "	            <legend>Informazioni Generali</legend>\n" +
    "	            <div class=\"form-group\" ng-class=\"{ 'has-error' : isInvalid('name') }\">\n" +
    "	                <label class=\"col-md-2 control-label\">Nome</label>\n" +
    "	                <div class=\"col-md-10\">\n" +
    "	                    <input type=\"text\" class=\"form-control\" placeholder=\"Shop\" ng-model=\"shop.name\">\n" +
    "	                </div>\n" +
    "	            </div>\n" +
    "	            <div class=\"form-group\" ng-class=\"{ 'has-error' : isInvalid('description') }\">\n" +
    "	                <label class=\"col-md-2 control-label\">Descrizione</label>\n" +
    "	                <div class=\"col-md-10\">\n" +
    "						<textarea class=\"form-control\" rows=\"3\" placeholder=\"Scrivi qualcosa sul tuo locale...\" ng-model=\"shop.description\"></textarea>\n" +
    "	                </div>\n" +
    "	            </div>\n" +
    "				<!-- Via e numero -->\n" +
    "	            <div class=\"form-group\">\n" +
    "					<div ng-class=\"{ 'has-error' : isInvalid('address.streetName') }\">\n" +
    "		                <label class=\"col-md-2 control-label\">Indirizzo</label>\n" +
    "		                <div class=\"col-md-7\">\n" +
    "		                    <input type=\"text\" class=\"form-control\" placeholder=\"Via...\" ng-model=\"shop.address.streetName\">\n" +
    "		                </div>\n" +
    "					</div>\n" +
    "					<div ng-class=\"{ 'has-error' : isInvalid('address.streetNumber') }\">\n" +
    "		                <label class=\"col-md-1 control-label\">Numero</label>\n" +
    "		                <div class=\"col-md-2\">\n" +
    "		                    <input type=\"text\" class=\"form-control\" placeholder=\"#\" ng-model=\"shop.address.streetNumber\">\n" +
    "		                </div>\n" +
    "					</div>\n" +
    "	            </div>\n" +
    "				<!-- Interno -->\n" +
    "	            <div class=\"form-group\">\n" +
    "					<div ng-class=\"{ 'has-error' : isInvalid('address.addressTypeIdentifier') }\">\n" +
    "		                <label class=\"col-md-2 control-label\">Altro</label>\n" +
    "		                <div class=\"col-md-10\">\n" +
    "		                    <input type=\"text\" class=\"form-control\" placeholder=\"Interno...\" ng-model=\"shop.address.addressTypeIdentifier\">\n" +
    "		                </div>\n" +
    "					</div>\n" +
    "	            </div>\n" +
    "				<!-- Comune, Provincia e CAP -->\n" +
    "	            <div class=\"form-group\">\n" +
    "					<div ng-class=\"{ 'has-error' : isInvalid('address.municipality') }\">\n" +
    "		                <label class=\"col-md-2 control-label\">Comune</label>\n" +
    "		                <div class=\"col-md-4\">\n" +
    "		                    <input type=\"text\" class=\"form-control\" placeholder=\"Comune...\" ng-model=\"shop.address.municipality\">\n" +
    "		                </div>\n" +
    "					</div>\n" +
    "					<div ng-class=\"{ 'has-error' : isInvalid('address.province') }\">\n" +
    "		                <label class=\"col-md-1 control-label\">Provincia</label>\n" +
    "		                <div class=\"col-md-2\">\n" +
    "		                    <input type=\"text\" class=\"form-control\" placeholder=\"RM..\" ng-model=\"shop.address.province\">\n" +
    "		                </div>\n" +
    "					</div>\n" +
    "					<div ng-class=\"{ 'has-error' : isInvalid('address.postalCode') }\">\n" +
    "		                <label class=\"col-md-1 control-label\">CAP</label>\n" +
    "		                <div class=\"col-md-2\">\n" +
    "		                    <input type=\"text\" class=\"form-control\" placeholder=\"00000\" ng-model=\"shop.address.postalCode\">\n" +
    "		                </div>\n" +
    "					</div>\n" +
    "	            </div>\n" +
    "				<!-- Azioni -->\n" +
    "	            <div class=\"form-group\">\n" +
    "	                <div class=\"col-md-10 col-md-offset-2\">\n" +
    "						<button type=\"submit\" class=\"btn btn-default\" ng-click=\"reset()\">Annulla</button>\n" +
    "	                    <button type=\"submit\" class=\"btn btn-success\" ng-click=\"update()\">Salva modifiche</button>\n" +
    "	                </div>\n" +
    "	            </div>\n" +
    "	        </fieldset>\n" +
    "	    </form>\n" +
    "	</div>\n" +
    "</section>");
}]);

angular.module("login.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("login.tpl.html",
    "<section ng-controller=\"LoginController\">\n" +
    "	<div class=\"alert alert-dismissable alert-danger\" ng-show=\"status == 'error'\">\n" +
    "		<button type=\"button\" class=\"close\" data-dismiss=\"alert\">×</button>\n" +
    "		<strong>Oops!</strong> Alcuni campi non sono stati compilati correttamente, modificali e riprova.\n" +
    "	</div>\n" +
    "	<div class=\"alert alert-dismissable alert-info\" ng-show=\"checkUser\">\n" +
    "		<button type=\"button\" class=\"close\" data-dismiss=\"alert\">×</button>\n" +
    "		<strong>Loading...</strong>\n" +
    "	</div>\n" +
    "	<!-- Login Form -->\n" +
    "	<div class=\"well col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2\">\n" +
    "		<div class=\"form-horizontal\">\n" +
    "	        <fieldset>\n" +
    "	            <legend>Login</legend>\n" +
    "	            <div class=\"form-group\" ng-class=\"{ 'has-error' : isInvalid('username') }\">\n" +
    "	                <div class=\"col-md-12\">\n" +
    "	                    <input type=\"text\" class=\"form-control\" placeholder=\"Username\" ng-model=\"user.username\">\n" +
    "	                </div>\n" +
    "	            </div>\n" +
    "	            <div class=\"form-group\" ng-class=\"{ 'has-error' : isInvalid('password') }\">\n" +
    "	                <div class=\"col-md-12\">\n" +
    "						 <input type=\"text\" class=\"form-control\" placeholder=\"Password\" ng-model=\"user.password\">\n" +
    "	                </div>\n" +
    "	            </div>\n" +
    "				<div class=\"form-group\">\n" +
    "					<div class=\"col-md-12\">\n" +
    "						<button type=\"submit\" class=\"btn btn-success\" ng-click=\"login()\">Accedi</button>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</fieldset>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</section>\n" +
    "");
}]);

angular.module("shop.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("shop.tpl.html",
    "<section ng-controller=\"ShopController\">\n" +
    "	<h2>Vetrina</h2>\n" +
    "	<div class=\"products\">\n" +
    "		<div class=\"shop-item\" ng-repeat=\"item in showcase\">\n" +
    "			\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</section>");
}]);
