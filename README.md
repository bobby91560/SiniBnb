# Sinistar : Test technique

Application permettant de faire de la recherche de location à l'aide d'une carte interactive et d'un champ de recherche d'autocomplétion de lieu fournit par Google Maps.

La stack technique :

Vite + React + Typescript + Material UI + Zustand (state manager)

J'ai également utiliser le composant react de la librairie `@react-google-maps/api` qui fournissait la map intéractive, l'autocomplétion des adresses et toutes les fonctions utiles à la librairie de Google.

## Installation

Pour commencer, installer les dépendances :

```
yarn install
```

Puis créer un fichier .env à la racine avec la clé API google fournit dans le document du test technique (cf le fichier .env.example) :

`VITE_GOOGLE_MAP_API_KEY=GOOGLE_MAP_API_KEY`

## Start

Pour lancer l'application :

```
yarn dev
```

Rendez-vous sur : `localhost:3000` pour commencer à utiliser l'application

## Algorithme de tri de recherche par pondération

Le test technique avait également pour but de créer un algorithme de recherche par pondération. Celui-ci se trouve dans le dossier `lib/search.ts`

Explication :

L'idée du tri de recherche par pondération est d'indiquer un 'poids' sur les critères que l'on souhaite récupérer en priorité.

Exemple : Je souhaite récupérer les lieux les plus proches avec la note la plus élevée possible. Pour cela, dans nos critères de filtres, on va indiquer un poids pour la distance, par exemple 4, et un poids de 2 sur les notes, ce qui permettra de récupérer les lieux en priorité satisfaisant ces deux critères.

Techniquement, comment ça se passe ?

Tout d'abord, l'idée est de fournir une fonction permettant de prendre en entrée un tableau de lieux et une liste de critère en fonction des champs qu'on veut ou non en priorité.

Cela m'a amené à cette signature de fonction :

```
const sortPlaces = (
  places: Place[],
  sortCriterion: SortCriterion[],
)
```

et un objet de type SortCriterion, qui va répertorier les champs à rechercher par poids:

```
export type SortCriterion = {
  key: FilterKeys;
  weight: number;
  max?: number;
};
```

Puis on va itérer sur chacun des critères, mutiplier la valeur avec le poids et additionner au fur à mesure de manière à obtenir un score globale pour chaque lieu.

```
scoreA += a[key] * weight;
scoreB += b[key] * weight;
```

Petite particularité pour la distance du lieu par rapport à un point donné :
On soustrait car on souhaite récupérer la distance la plus proche du point.

```
if (key === "distance") {
  scoreA -= a.distance * weight;
  scoreB -= b.distance * weight;
}
```

Enfin, les critères n'étant pas sur la même unité mesure, il fallait trouver un moyen de normaliser chacun des critères.
Pour cela, j'ai choisi de diviser la valeur du champ par la valeur max.
Ce qui nous donne cet algo final :

```
const sortPlaces = (
  places: Place[],
  sortCriterion: SortCriterion[],
  maxDistance?: number,
) => {
  return places.sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;

    sortCriterion?.forEach(({ key, weight, max }) => {
      if (key === 'distance' && maxDistance) {
        scoreA -= (a.distance / maxDistance) * weight;
        scoreB -= (b.distance / maxDistance) * weight;
      } else if (key !== 'distance' && max) {
        scoreA += (a[key] / max) * weight;
        scoreB += (b[key] / max) * weight;
      }
    });

    return scoreB - scoreA;
  });
};
```
