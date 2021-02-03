
import affDispo from './affDispo.html'
//http://localhost:8003/primo-explore/search?query=any,contains,33PUDB_Alma_Unimarc7156806840004671%20OR%2033PUDB_Alma_Unimarc7180719980004671&tab=default_tab&search_scope=catalog_pci&vid=33PUDB_UBM_VU1&lang=en_US&offset=0
//Cf. case Exlib # 00641786
//Remonte la deuxième mention de disponibilté qui est parfois non affichée quand notices imprimés et électroniques ont été fusionnées 
class affDispoController {
  constructor($scope, $http, $element, $templateCache){
    console.log('---->affDispoController');
    //Dans notre contexte consortail une notice supprimée est toujours considérée come disponible dans une autre insr=titution
    //Car elle possède toujours une code "delcategory" pour la zone réseau.
    //Si un résultat n'a qu'un "delcategory" on indique que le document est indisponble pour toutes les institutions 
    if (this.parentCtrl.result.delivery.availability.includes("does_not_exist_in_maininstitution")){
      console.log(this.parentCtrl.result.pnx.delivery.delcategory.length );
      if (this.parentCtrl.result.pnx.delivery.delcategory.length == 1){
        this.parentCtrl.result.delivery.availability = ["unavailable_in_all_institutions"];
      }
    }
    //Lorsqu'undocument électronique local est acccessible en ligne pour une autre institution que celle de la vue
    //Primo indique apr défaut que le documment est disponible. On modifie ceta ffichage pour indiquer
    // qu'il est disponible en ligne pour une autre institution
    if (this.parentCtrl.result.delivery.availability.includes('not_restricted')){
      var institution = this.parentCtrl.configurationUtil.vid.replace(/^(33PUDB_.*?)_.*/, '$1');
      if (! this.parentCtrl.result.pnx.delivery.institution.includes(institution)){
        this.parentCtrl.result.delivery.availability = ["does_not_exist_in_maininstitution_local_eressource_33PUDB"];
      }
      console.log(this.parentCtrl.result.pnx.delivery.institution)
    }

    if (this.parentCtrl.result.pnx.control.recordid[0].startsWith('dedup')){
      // console.log(this.parentCtrl.result.pnx.display.title);
      // console.log(this.parentCtrl.result.delivery);
      if (this.parentCtrl.result.delivery.deliveryCategory.length == 1){
        if (typeof this.parentCtrl.result.delivery.GetIt2 !== 'undefined') {
          console.log('---->affDispoController : recalcule de la disponibilité');
          var availability = getAvailabilityStatus(this.parentCtrl.result.delivery.holding);
          this.locations = [];
          this.locations.push({
            availability: availability,
            deliveryCode: 'delivery.code.'+ availability,
            // toTranslate: productionVID(window.appConfig.vid),
            useLinkIcon: true,
            // outboundLink: illLink(pnx),
          })
      }
      console.log(this.locations);
      }
    }
    function getAvailabilityStatus(holding){
      console.log(holding);
      if (typeof holding == 'undefined' || holding == null) {
        return "unavailable_in_all_institutions";
      }
      var availabilityStatus = [];
      for (var i = 0; i < holding.length; i++) {
        if (holding[i].isValidUser){
          availabilityStatus.push(holding[i].availabilityStatus);  
        }
      }
      if (availabilityStatus.length == 0){
          return "does_not_exist_in_maininstitution";
      }
      else{
        if (availabilityStatus.includes('available')){
          return "available_in_maininstitution";
        }
        else {
          return "check_holdings";
        }
      }
    }
    console.log(this);
  }
}
affDispoController.$inject = ['$scope', '$http', '$element', '$templateCache' ]
export let affDispoConfig = {
  bindings: {parentCtrl:'<'},
  controller: affDispoController,
  template: affDispo
}
