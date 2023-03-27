# Automatisation-serre
## GROUPE1 projet SERRE-AUTOMATISE

Dans ce projet tout les contributeurs doivent cloner le projet et créer leur propre branche:

```command
git clone https://github.com/cheihsall/Automatisation-serre.git
```
Apres creer localement et basculer vers leur propre branche:

```command
git checkout -b [le nom de votre branche]
```

Apres cela il y'a deux dossier dans le projet frontend et backend:

* Au niveau du dossier frontend se trouve l'application angular qui gère le frontend et il faudra naviguer vers le dossier frontend et installer les dépendances:

```command
cd frontend && npm install
```

* Au niveau du dossier Backend se trouve l'application Nestjs qui gère la partie backend de l'application il faudra aussi naviguer vers ce dossier et installer les dépendances:

```command
cd backend && npm install
```

Aprés cela lorsque vous finissez de traivaillez sur votre branche et que vous terminez votre tache suivez ces intructions pour faire un push:

```command
git checkout dev && git pull
```

Apres retourner vers votre branche pour faire le merge localement:

```command
git checkout [nom de votre branche] && git merge dev
```

S'il y'a des conflits résolvez les avant de faire un push.
Si tout est ok vous pouvez faire un push:

```command
git push ou git push -u origin [le nom de votre branche]
```
Aprés cela aller sur github sur le projet et sélectionner votre branche ensuite créer un pull request à partir de votre branche vers la branche dev.

Merci d'observer ces règles pour éviter au maximum les conflits

****
----
***NB: Il est strictement interdit de faire un push vers la branche main ou de creer un pull request vers la branche main oubien de travailler sur la branche d'un autre membre.***

**GROUPE1 2023** with 
