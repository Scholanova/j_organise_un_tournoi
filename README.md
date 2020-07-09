# j_organise_un_tournoi
Projet 2020 - J’organise un tournoi

1. Le projet

Ce projet à pour but de gérer des tounois de taille multiples : 
* tournoi à simple élimination
* nombre de participant multiples de 2
* gérer l'avancement dans le tournoi
* consulter des tournois en cours ou terminés

2. Les technologies

Nous avons utlilisés les technologies suivantes :
* Front-end/back-end : [Express](http://expressjs.com/)
* ORM : [Sequelize](https://sequelize.org/)
* base de données : [postgresql](https://www.postgresql.org/)
* Intégration continue : [circle ci](https://circleci.com/)

Le projet est hébergé sur [Scalingo](https://scalingo.com/fr) juste [ici](https://j-organise-un-tournoi.osc-fr1.scalingo.io/)

3. Le choix de l'architecture

Nous avons choisi une architecture MVC car la technologie express s'y prête et facilite la gestion des routes, l'ORM sequelize s'intègre bien avec express pour la connexion avec la base de données.
De plus, ce style d'architecture applicative est devenu un standard web de ces dernières année et est appréciée des développeurs.

Cette technologie est aussi connu de Circle Ci et Scalingo, ce qui a permis une intégration et une livraison continue à chacun de nos commits sur github : Un déploiement automatique se fait sur scalingo dès qu'une modification est faite sur la branche master, les tests sont automatiquement démarrés dès qu'une merge request est ouverte.

4. Les conventions de nommages

Nous avons nommé les variables de la manière suivante : 
* Un modèle voit sa première lettre en majuscule, le reste en minuscule
* un id contient forcément le mot-clé 'id' dans son nom

5. Les difficultés rencontrées

Nous avons rencontré les difficultés suivantes :

* calcul de l'id du prochain match en fonction du match en cours et des matchs des autres competitions antérieures
* l'écriture des tests
* la génération du bracket
* la résolution des conflits lors de merges

