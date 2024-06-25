class PrmTopbarAfterController {
    constructor($scope, $element, $translate) {
      this.$scope = $scope;
      this.$element = $element;
      this.$translate = $translate;
     console.log(this.parentCtrl.storageUtil.localStorage);
    }

    
  
  }
  
  PrmTopbarAfterController.$inject = ['messageService', '$scope', '$element', '$translate'];
  
  export let PrmTopbarAfterConfig = {
    name: 'prmTopbarAfter',
    config: {
      controller: PrmTopbarAfterController,
      // require: {
      //   primoExploreCtrl: '^primoExplore'
      // }
    },
    bindings: {parentCtrl:'<'},

  };