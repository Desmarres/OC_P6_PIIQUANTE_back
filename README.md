# Construisez une API sécurisée pour une application d'avis gastronomiques

Projet 6 de la formation OpenClassroom en Développement Web

## Scénario

Vous avez passé la dernière année en tant que développeur back-end indépendant et vous avez travaillé sur plusieurs projets de tailles et de difficultés variées.  

La semaine dernière, vous avez reçu un message sur votre plateforme de freelance vous demandant de l'aide pour un nouveau projet. Les sauces piquantes sont de plus en plus populaires, en grande partie grâce à la série YouTube « Hot Ones » . C’est pourquoi ce nouveau client, la marque de condiments à base de piment Piiquante, veut développer une application web de critique des sauces piquantes appelée « Hot Takes » .  

Si la responsable produit de Piiquante souhaite à terme transformer l'application d'évaluation en une boutique en ligne, elle souhaite que la première version soit une « galerie de sauces » permettant aux utilisateurs de télécharger leurs sauces piquantes préférées et de liker ou disliker les sauces que d'autres partagent. Le front-end de l'application a été développé à l'aide d'Angular et a été précompilé après des tests internes, mais Piiquante a besoin d'un développeur back-end pour construire l'API.  

Le délai est raisonnable, vous décidez donc d'accepter le projet.  

### Après avoir rencontré Paula, la cheffe de produit de Piiquante, elle vous envoie l’email suivant :

De : Paula Z  
À : Vous  
Objet : Besoins pour l'API 

Bonjour,

Nous sommes ravis que vous contribuiez à cette nouvelle application web ! Nous sommes une petite marque, donc ce projet aura un impact important sur notre croissance.  

Vous trouverez ci-joint les spécifications pour l'API. Vous pouvez également trouver un [lien vers le repo du projet ici](https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6) où vous aurez accès à l'interface.  

Merci de faire particulièrement attention aux exigences en matière de sécurité. Nous avons récemment été victimes d'attaques sur notre site web et nous voulons être sûrs que l'API de cette application est construite selon des pratiques de code sécurisées. Tous les mots de passe des utilisateurs recueillis par l'application doivent être protégés !  

Cordialement,  

Paula Z  
Cheffe de produit  
Piiquante  


Pièce jointe :  

[Requirements](https://s3.eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P6/Requirements_DW_P6.pdf)


## Technologie

* Langage : Javascript
* Framework : Express
* Module : Mongoose, http, path, fs, jsonwebtoken
* Middleware : Express-Validator, multer, bcrypt
* Fonction : Express-Router

## Récupération et mise en route du frontend

Vous trouverez le [lien vers le repo du frontend ici](https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6).  
Exécutez, à partir du dossier front, "npm install", puis "npm run start" dans le terminal.  
Vous aurez accès au frontend à l'adresse : [http://localhost:4200/](http://localhost:4200/).

## Mise en route du backend

### Base de donnée :

Créer un compte MongoDB Atlas  
Construire un cluster  
Créer un utilisateur qui peut lire et écrire dans la base de donnée  
Autoriser l'accès depuis n'importe où  

### Fichier .env :

Renseigner les élément suivant :    

TOKEN=token (chaine secrète aléatoire)  
TOKEN_EXPIRATION=1h  
DB_USERNAME=user (nom de l'utilisateur MongoDB)  
DB_PASSWORD=pwd (mot de passe de l'utilisateur MongoDB)  
DB_SERVER_NAME=127.0.0.1:27017 (nom du cluster)  
DATABASE=db_name (nom de la base de donnée)  

### Sauvegarde des images :

Créer le dossier et sous-dossier "resources/images" dans le dossier backend.

### Démarrage du serveur :

A partir du dossier "backend", éxecuter "npm install" puis "node server" dans le terminal. Vous devriez voir le message « Connection to MongoDB successful ! »  
