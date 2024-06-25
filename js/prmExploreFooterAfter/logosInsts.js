
import logosInstsTemplate from './logosInsts.html'

class logosInstsController {
    constructor(){
      this.$onInit = function () {
        var url = new URL(document.location.href);
        var lang = url.searchParams.get('lang');
        var pathname = url.pathname;
        var displayFooter = url.searchParams.get('displayFooter');
        var view = url.searchParams.get('vid');
        var openUrl = url.searchParams.get('url_ver');
        var re = /_VU./g;
        var myInstitution = view.replace(re,""); 
        this.institutionsList = [];
        this.institutionsUrl = {};
        this.displayFooter = true;
        if (displayFooter == 'false'){
          this.displayFooter = false;
        }
        this.parentCtrl.mappingTablesCache.MAPPING_TABLES_CACHE['Alma Institution Codes'].forEach((institutionObjet)=>{
          var institution = institutionObjet.source1;
          console.log(institution);
          if (institution != "33PUDB_NETWORK") {
            var regex = new RegExp(myInstitution, "g");
            this.institutionsList.push(institution);
            this.institutionsUrl[institution] = 'https://'+ url.hostname + '/primo-explore/search?vid=' + institution + '_VU1';
          
          }
        
        });
        
        this.message = "Réseau des bibliothèques universitaires bordelaises";    
        
        this.institutionsList.sort();
    };


  }
};
// logosInstsController.$inject = ['$http','$element','$sce'];
export let logosInstsConfig = {
    bindings: {parentCtrl:'<'},
    controller: logosInstsController,
    template:logosInstsTemplate
  }
  