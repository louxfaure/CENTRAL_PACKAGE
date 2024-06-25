/**
 * Annoncement service.
 * Displays a md-toast on top of the view, containing an announcement retrieved from the code tables.
 */
export class MessageService {
  constructor($translate, $mdToast, $rootScope, $cookies) {
    this.$translate = $translate;
    this.$mdToast = $mdToast;
    this.$rootScope = $rootScope;
    this.$cookies = $cookies;

    this._dismissed = false;

    // Forget the dismissal if the language is changed.
    this.$rootScope.$on('$translateChangeSuccess', () => {
      this._dismissed = false;
    });
    console.log("--> MESSAGE !!!");
    console.log(this);
    var url = new URL(document.location.href);
    console.log(url);
  };

  // The announcement has been dismissed.
  _dismiss() {
    this._dismissed = true;
    this._toastPromise = null;
  };

  /**
   *  Displays the announcement if it has not been dismissed.
   *  @param {function} [hideCallback] - A function to be called
   *    when the announcement is hidden.
   *  @return {Promise} A Promise to be fulfilled
   *    if the announcement is displayed, and to be
   *    rejected when the announcement cannot be displayed.
   */
  display(hideCallback) {
    let ctrl = this;
    console.log(ctrl);

    return new Promise((resolve, reject) => {

      if (ctrl._dismissed === true) {
        reject('The announcement has been dismissed.');
        return;
      }

      ctrl.$translate('default.nui.message.annoucement').then((translation) => {
        console.log('YOplà !!!');
        // Check if there is a cookie with this message
        let cookie = ctrl.$cookies.get('announcement');
        if (cookie === translation) {
          reject('The announcement has been dismissed before.');
          return;
        }
        // If there is no announcement to be displayed.
        if ((!translation) || ['announcement', '&nbsp;', ''].includes(translation)) {
          // translation is assigned 'announcement' in the absence of a matching entry.

          // If there is already a toast, and no 
          // announcement, hide the toast.
          // This happens when the language is changed.
          if (ctrl._toastPromise && !ctrl._dismissed) {
            ctrl.$mdToast.hide();
          }
          reject('Pas de message trouvé .');
          return;
        }

        // If there is already a toast promise,
        // avoid creating a new one.
        ctrl._toastPromise = ctrl._toastPromise || ctrl.$mdToast.show({
          // Timeout duration in msecs. false implies no timeout.
          hideDelay: false,
          position: 'top',
          controller: () => {
            return {
              close: () => {
                ctrl.$mdToast.hide();
                // Save as cookie
                ctrl.$translate('default.nui.message.annoucement').then((response) => {
                  return ctrl.$cookies.put('announcement', response);
                });
              }
            }
          },
          controllerAs: '$ctrl',
          // template:'<h1>TRUC</h1>'
          template: `
  <md-toast class="page-notification" style="top: 0px; position: sticky !important;">
      <div class="md-toast-content" style="box-shadow:none; width: 100%;">
          <span class='md-toast-text' flex translate='nui.message.announcement'>
    </span>
      </div>
      <a class="close" ng-click='$ctrl.close()' aria-label="{{'nui.message.dismiss' | translate}}"
         style="position: absolute; right: 1.5rem; top: 1.5rem;">
          <prm-icon icon-type="svg" svg-icon-set="primo-ui" icon-definition="close">
          </prm-icon>
      </a>
  </md-toast>
            `,
        });

        ctrl._toastPromise.then(hideCallback).catch(hideCallback).then(() => ctrl._dismiss());

        resolve();

      });

    });
  };

};

MessageService.$inject = ['$translate', '$mdToast', '$rootScope', '$cookies'];