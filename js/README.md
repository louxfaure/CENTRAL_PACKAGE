# Liste des modules développées

## customTLevelFacette : Personnalisation de la top level facette
Supprime les entrées 'peer_reviewed','open_access'et'available'  

[:link: prmFacetExactAfter/README.md](prmFacetExactAfter/README.md)

## authentificationAutresInst : Personnalisation de l'écran d'authentification.
Problématique consortiale. 
Permet de générer des liens d'authentification permettant de rediriger l'utilisateur vers la vue de son institution.

![Écran d'authentification](prmLoginAfter/auth.png)  

[:link: prmLoginAfter/README.md](prmLoginAfter/README.md) 
 
## customBriefDisplay : Personnalisation de l'affichage des notices dans la liste des résultats

### Brief Display pour les ressources CDI
Nous utilisons des champs locaux pour alimenter les 2ème & 3ème lignes du brief display (cf. [lds02](https://rebub-sgbm.frama.wiki/primo:personnalisations_reseau#displaylds02) et [lds01](https://rebub-sgbm.frama.wiki/primo:personnalisations_reseau#displaylds02)). Ces champs permettent de personnaliser l'affichage en fonction des types de résultat. Ainsi les champs Auteurs & publisher initialement utilisés pour cet affichage ne remontent plus pour CDI. Ce correctif permet de récupérer les champs Pnx et les afficher dans l'affichage abrégé.

### Doublement des champs locaux pour les notices fusionnées
Lorsqu'une notice est fusionnée Primo conserve tous les champs locaux. Ainsi le champ lds01 que nous utilisons pour afficher l'adresse bibliographique de la publication est doublé. Ce module ne conserve que le champ construit à partir de la notice Unimarc.

[:link: prmBriefResultAfter/README.md](prmBriefResultAfter/README.md)

## customGalleryDisplay : personnalisation de l'affichage des documents dans le collection discovery.
  
Par défaut seuls les titres sont affichés sous les vignettes dans le collection discovery. Ajoute une ligne avec les auteurs et contributeurs (200$f) (cf. [lds02](https://rebub-sgbm.frama.wiki/primo:personnalisations_reseau#displaylds02)) et l'éditeur et la date d'édition (cf [lds01](https://rebub-sgbm.frama.wiki/primo:personnalisations_reseau#displaylds02)).

[:link: prmGalleryItemAfter/README.md](prmGalleryItemAfter/README.md)

## affDispo : corrige un bug d'affichage des notices fusionnées
Remonte la deuxième mention de disponibilté qui est parfois non affichée quand pour un même document les notices de la version imprimée et électronique ont été fusionnées. 
Case # 00641786 chez Exlib

[:link: /prmSearchResultAvailabilityLineAfter/README.md](prmSearchResultAvailabilityLineAfter/README.md)

## dispoElecAutresInst : affichage de la disponibilité des documents électroniques dans les autres institutions du réseau

Problématique consortiale. 

[:link: prmFullViewServiceContainerAfter/README.md](prmFullViewServiceContainerAfter/README.md)

## itemInLOan : Personnalisation de la liste des documents empruntés dans le compte lecteur

### Empêche la réservation si l'emprunt date d'il y a moins de 7 jours (durée maximale de prolongation dans le réseau)
Si le document est prolongeable et que le prêt est un prêt de plus de 7 jours (variable à adapter selon les besoins), le script regarde si le prêt à eu lieu il y a plus de 7 jours. Si ce n'est pas le cas, il indique quand le document pourra être prolongé.

![Liste des prêts : compte lecteur](prmLoanAfter/readme_img1.png)

## Supprime des informations inutiles dans la liste des exemplaires empruntés
Ne sont conservées que la date d'emprunt et la date de retour à l'issue de la prolongation.

[:link: prmLoanAfter/README.md](prmLoanAfter/README.md)

## forceAuth : force l'authentification à partir d'un lien externe  
Permet d'ajouter un paramètre à une url pointant vers Primo pour rediriger l'utilisateur vers une session authentifiée.
Paramètre à ajouter : **forcelogin=true **
[:link: prmAuthenticationAfter/forceAuth.js](prmAuthenticationAfter/forceAuth.js)

## logosInst : personnalisation du pied de page
Ajoute un pied de page avec les logos des autres institutions membres du réseau et le lien vers leurs catalogues

[prmExploreFooterAfter/README.md](prmExploreFooterAfter/README.md)

## Mise en oeuvre du clique et collecte bordelais : lien vers la prise de rdv

### panier
Contexte du clique et collecte bordelais.
Ajoute un bouton panier dans le menu de l'utilisateur lorsque celui-ci est authentifié. Ce bouton permet de rediriger l'usager vers la page de prise de rdv de l'application de gestion du clique et collecte.

![Bouton panier](prmUserAreaExpandableAfter/Panier-Babord_Page-accueil-Babord.png) 

### panierCompteLecteur
Ajoute un  lien vers l'application de prise de rdv dans l'onglet réservation du compte lecteur

[:movie_camera: Lien vers démo loom](https://www.loom.com/share/9a466ce8887846d4aa1b606c1d2cccc9)

[:link: prmUserAreaExpandableAfter/README.md](prmUserAreaExpandableAfter/README.md)

## changeLinkToCollectionDiscovery : personnalisation des liens vers la collection dans l'affichage détaillé

Problématique consortiale.  
Dans l'affichage détaillé d'une notice lorsque, Primo présente le lien vers une collection qui n'appartient pas à l'institution de la vue en cours de consultation, il ne redirige pas vers la vue de l'institution propriétaire de la collection.
Ce module : 
  - Modifie le lien de redirection pour afficher la sélection dans la vue de l'institution propriétaire
  - Ajoute le nom de l'institution propriétaire de la sélection au titre du lien de premier niveau. Pour modifier le titre du lien modifier la traduction de ui.colldiscovery.lobby.linktitle. + 'code l'institution'.


[:link: prmCollectionNavigationBreadcrumbsAfter/README.md](prmCollectionNavigationBreadcrumbsAfter/README.md)

